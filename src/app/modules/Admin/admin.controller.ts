import { NextFunction, Request, Response } from "express";
import { AdminServices } from "./admin.service";
import { ADMIN_ALLOWED_QUERY_PARAMS } from "./admin.constant";
import getAllowedQueryParams from "../../utils/getAllowedQueryParams";
import sendResponse from "../../utils/sendResponse";

// ----------------- get all admins ----------------
const getAllAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get only allowed query params object
    const allowedQueryParams = getAllowedQueryParams(
      ADMIN_ALLOWED_QUERY_PARAMS,
      req.query
    );

    const result = await AdminServices.getAllAdminFromDB(allowedQueryParams);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All admin retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

// ----------------- get admin by Id ----------------
const getAdminById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AdminServices.getAdminByIdFromDB(req.params?.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// ----------------- update admin ----------------
const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AdminServices.updateAdminIntoDB(
      req.params?.id,
      req.body
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// ----------------- update admin ----------------
const deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AdminServices.deleteAdminFromDB(req.params?.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// ----------------- update admin ----------------
const softDeleteAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AdminServices.softDeleteAdminFromDB(req.params?.id);
    res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AdminController = {
  getAllAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
};
