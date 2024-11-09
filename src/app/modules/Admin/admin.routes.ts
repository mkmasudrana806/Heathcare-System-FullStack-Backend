import express from "express";
import { AdminController } from "./admin.controller";
const router = express.Router();

// get all admins
router.get("/", AdminController.getAllAdmin);

// get single admin by id
router.get("/:id", AdminController.getAdminById);

// update admin
router.patch("/:id", AdminController.updateAdmin);

// delete admin
router.delete("/:id", AdminController.deleteAdmin);

// export all admin routes
export const AdminRoutes = router;
