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

export const AuthController = {
  loginUser,
  refreshToken,
};
