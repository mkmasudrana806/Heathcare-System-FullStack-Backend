import { Request, Response } from "express";
import { AdminServices } from "./admin.service";
import pickQuerydata from "../../utils/pickQuerydata";
import {
  ADMIN_ALLOWED_QUERY_PARAMS,
  ADMIN_FILTERABLE_FIELDS,
} from "./admin.constant";
import getAllowedQueryParams from "../../utils/getAllowedQueryParams";

// ----------------- get all admins ----------------
const getAllAdmin = async (req: Request, res: Response) => {
  try {
    // get only allowed query params object
    const allowedQueryParams = getAllowedQueryParams(
      ADMIN_ALLOWED_QUERY_PARAMS,
      req.query
    );

    const result = await AdminServices.getAllAdminFromDB(allowedQueryParams);
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

export const AdminController = {
  getAllAdmin,
};
