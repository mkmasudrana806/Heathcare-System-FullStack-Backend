import { PrismaClient, UserStatus } from "@prisma/client";
import { ILoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtHelper } from "../../utils/jwtHelper";
import config from "../../config";
import AppError from "../../errors/AppError";
import { constants as httpStatus } from "http2";
import nodemailer from "nodemailer";
import sendEmail from "../../utils/sendEmail";

const prisma = new PrismaClient();

// ------------------ user login ----------------------
const loginUser = async (payload: ILoginUser) => {
  // check if the email is correct
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  // check if the password is matching
  const isPasswordMatch: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isPasswordMatch) {
    throw new Error("Password incorrect");
  }
  // generate access token
  const jwtData = {
    userId: userData.id,
    email: userData.email,
    role: userData.role,
  };

  const accessToken = jwtHelper.generateToken(
    jwtData,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  // generate refresh
  const refreshToken = jwtHelper.generateToken(
    jwtData,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

// ------------------ generate access token based on refresh token ----------------------
const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelper.verifyToken(
      token,
      config.jwt_refresh_secret as string
    );
  } catch (error) {
    throw new Error("You are not authorized");
  }

  // check if decoded user exist in database
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData?.email,
      status: UserStatus.ACTIVE,
    },
  });

  // generate access token
  const jwtPayload = {
    userId: userData.id,
    email: userData.email,
    role: userData.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    algorithm: "HS256",
    expiresIn: config.jwt_access_expires_in,
  });

  return accessToken;
};

// ------------------- change password --------------------
const changePassword = async (
  user: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: "ACTIVE",
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new AppError(httpStatus.HTTP_STATUS_FORBIDDEN, "Incorrect password");
  }

  // hash the password
  const hashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await prisma.user.update({
    where: {
      email: userData?.email,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });

  return "Password changed successfully";
};

// ------------------- forgot password --------------------
const forgotPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload?.email,
      status: UserStatus.ACTIVE,
    },
  });

  // generate access token
  const jwtData = {
    userId: userData.id,
    email: userData.email,
    role: userData.role,
  };

  const resetPassToken = jwtHelper.generateToken(
    jwtData,
    config.jwt_reset_password_secret as string,
    config.jwt_reset_password_expires_in as string
  );

  const resetLink = `${config.reset_password_ui_link}?email=${payload?.email}&token=${resetPassToken}`;

  await sendEmail(
    userData?.email,
    `
    <div>
        <p>Dear user,</p>
        <p>Your password reset link 
        <a href=${resetLink}>
        <button>Reset Password</button
        </a>
    </div>
    `
  );

  return "An reset password email has been sent to your email address";
};

// ------------------- reset password --------------------
const resetPassword = async (
  token: string,
  payload: { email: string; password: string }
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isValidToken = jwtHelper.verifyToken(
    token,
    config.jwt_reset_password_secret as string
  );

  if (!isValidToken) {
    throw new AppError(httpStatus.HTTP_STATUS_FORBIDDEN, "Invalid token");
  }

  const hashedPassword = await bcrypt.hash(
    payload?.password,
    Number(config.bcrypt_salt_rounds)
  );

  await prisma.user.update({
    where: {
      email: userData?.email,
    },
    data: {
      password: hashedPassword,
    },
  });
};

export const AuthServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
