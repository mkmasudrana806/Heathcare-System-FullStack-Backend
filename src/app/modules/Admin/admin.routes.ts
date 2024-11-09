import express from "express";
import { AdminController } from "./admin.controller";
const router = express.Router();
import validateRequestData from "../../middlewares/validateRequestData";
import { AdminValidations } from "./admin.validation";

// get all admins
router.get(
  "/",

  AdminController.getAllAdmin
);

// get single admin by id
router.get("/:id", AdminController.getAdminById);

// update admin
router.patch(
  "/:id",
  validateRequestData(AdminValidations.updateAdminSchema),
  AdminController.updateAdmin
);

// delete admin
router.delete("/:id", AdminController.deleteAdmin);

// export all admin routes
export const AdminRoutes = router;
