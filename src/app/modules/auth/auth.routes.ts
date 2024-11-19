import express from "express";
import { AuthController } from "./auth.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
const router = express.Router();

// login usr
router.post("/login", AuthController.loginUser);

// refresh token
router.post("/refresh-token", AuthController.refreshToken);

// change password
router.post(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  AuthController.changePassword
);

// change password
router.post("/forgot-password", AuthController.forgotPassword);

// reset password
router.post("/reset-password", AuthController.resetPassword);

export const AuthRoutes = router;
