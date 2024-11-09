import { NextFunction, Request, RequestHandler, Response } from "express";
import { AdminServices } from "./admin.service";
import { ADMIN_ALLOWED_QUERY_PARAMS } from "./admin.constant";
import getAllowedQueryParams from "../../utils/getAllowedQueryParams";
import sendResponse from "../../utils/sendResponse";
import { constants as httpStatus } from "http2";
import catchAsync from "../../utils/catchAsync";
import { IQueryParams } from "./admin.interface";

// ----------------- get all admins ----------------
const getAllAdmin = catchAsync(async (req, res) => {
  // get only allowed query params object
  const allowedQueryParams = getAllowedQueryParams(
    ADMIN_ALLOWED_QUERY_PARAMS,
    req.query
  );
  const result = await AdminServices.getAllAdminFromDB(
    allowedQueryParams as IQueryParams
  );

  sendResponse(res, {
    statusCode: httpStatus.HTTP_STATUS_OK,
    success: true,
    message: "All admin retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

// ----------------- get admin by Id ----------------
const getAdminById = catchAsync(async (req, res) => {
  const result = await AdminServices.getAdminByIdFromDB(req.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.HTTP_STATUS_OK,
    success: true,
    message: "Admin retrieved successfully",
    data: result,
  });
});

// ----------------- update admin ----------------
const updateAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.updateAdminIntoDB(
    req.params?.id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.HTTP_STATUS_OK,
    success: true,
    message: "Admin updated successfully",
    data: result,
  });
});

// ----------------- update admin ----------------
const deleteAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.deleteAdminFromDB(req.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.HTTP_STATUS_OK,
    success: true,
    message: "Admin deleted successfully",
    data: result,
  });
});

// ----------------- update admin ----------------
const softDeleteAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.softDeleteAdminFromDB(req.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.HTTP_STATUS_OK,
    success: true,
    message: "Admin deleted successfully",
    data: result,
  });
});

export const AdminController = {
  getAllAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
};
