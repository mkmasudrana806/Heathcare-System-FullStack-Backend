import { NextFunction, Request, Response } from "express";
import { constants } from "http2";

// ----------------- global error handler middleware ----------------
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || "Something went wrong",
    error: err,
  });
};

export default globalErrorHandler;
