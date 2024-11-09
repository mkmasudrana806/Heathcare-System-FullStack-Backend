import express from "express";
import { AuthController } from "./auth.controller";
const router = express.Router();

// login usr
router.post("/login", AuthController.loginUser);

// refresh token
router.post("/refresh-token", AuthController.refreshToken);

export const AuthRoutes = router;
