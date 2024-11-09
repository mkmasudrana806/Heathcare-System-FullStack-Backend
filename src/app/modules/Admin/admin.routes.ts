import express from "express";
import { AdminController } from "./admin.controller";
const router = express.Router();

// get all admins
router.get("/", AdminController.getAllAdmin);

// export all admin routes
export const AdminRoutes = router;
