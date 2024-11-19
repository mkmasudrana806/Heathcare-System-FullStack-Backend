import express from "express";
import { AdminController } from "./admin.controller";
const router = express.Router();
import validateRequestData from "../../middlewares/validateRequestData";
import { AdminValidations } from "./admin.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

// get all admins
router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminController.getAllAdmin
);

// get single admin by id
router.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminController.getAdminById
);

// update admin
router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequestData(AdminValidations.updateAdminSchema),
  AdminController.updateAdmin
);

// delete admin
router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminController.deleteAdmin
);

// export all admin routes
export const AdminRoutes = router;
