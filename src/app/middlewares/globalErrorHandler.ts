import { NextFunction, Request, Response } from "express";

// ----------------- global error handler middleware ----------------
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({
    success: false,
    message: err.name || "Something went wrong",
    error: err,
  });
};

export default globalErrorHandler;
