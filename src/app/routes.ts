import express from "express";
import { UserRoutes } from "./modules/User/user.routes";
import { AdminRoutes } from "./modules/Admin/admin.routes";
import { AuthRoutes } from "./modules/auth/auth.routes";
const router = express.Router();

// users routes
router.use("/users", UserRoutes);

// admin route
router.use("/admin", AdminRoutes);

// auth routes
router.use("/auth", AuthRoutes);

export const Routes = router;
