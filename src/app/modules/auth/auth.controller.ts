import { constants as httpStatus } from "http2";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

// ------------------ user login --------------------
const loginUser = catchAsync(async (req, res) => {
  const { accessToken, refreshToken, needPasswordChange } =
    await AuthServices.loginUser(req.body);

  // set refresh token to cookie
  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.HTTP_STATUS_OK,
    success: true,
    message: "User logged in successfully",
    data: { accessToken, needPasswordChange },
  });
});

// ------------------ refresh token --------------------
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.HTTP_STATUS_OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

// ------------------ change password --------------------
const changePassword = catchAsync(async (req, res) => {
  console.log(req.user);
  const result = await AuthServices.changePassword(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.HTTP_STATUS_OK,
    success: true,
    message: "Password is changed successfully",
    data: result,
  });
});

// ------------------ forgot password --------------------
const forgotPassword = catchAsync(async (req, res) => {
  const result = await AuthServices.forgotPassword(req.body);

  sendResponse(res, {
    statusCode: httpStatus.HTTP_STATUS_OK,
    success: true,
    message: "Password is forgot successfully",
    data: result,
  });
});

// ------------------ reset password --------------------
const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization || "";
  const result = await AuthServices.resetPassword(token, req.body);

  sendResponse(res, {
    statusCode: httpStatus.HTTP_STATUS_OK,
    success: true,
    message: "Password is reset successfully",
    data: result,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
