import { Request, Response } from "express";
import { UserServices } from "./user.service";

// ------------------ create admin ------------------
const createAdmin = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.createAdminIntoDB(req.body);
    res.status(200).json({
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something went wrong",
      error: error,
    });
  }
};

export const UserController = {
  createAdmin,
};
