import express, { Request, Response } from "express";
import { UserController } from "./user.controller";
const router = express.Router();

// create admin
router.post("/create-admin", UserController.createAdmin);

export const UserRoutes = router;
