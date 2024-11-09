import express from "express";
import { UserRoutes } from "./modules/User/user.routes";
import { AdminRoutes } from "./modules/Admin/admin.routes";
const router = express.Router();

// users routes
router.use("/users", UserRoutes);

// admin route
router.use("/admin", AdminRoutes);
export const Routes = router;
