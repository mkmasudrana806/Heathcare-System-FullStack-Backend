import { PrismaClient, UserStatus } from "@prisma/client";
import { ILoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtHelper } from "../../utils/jwtHelper";

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
  const accessToken = jwtHelper.generateToken(jwtData, "abc", "1d");

  // generate refresh
  const refreshToken = jwtHelper.generateToken(jwtData, "def", "365d");

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
    decodedData = jwtHelper.verifyToken(token, "def");
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

  const accessToken = jwt.sign(jwtPayload, "abc", {
    algorithm: "HS256",
    expiresIn: "1d",
  });

  return accessToken;
};

export const AuthServices = {
  loginUser,
  refreshToken,
};
