import express, { NextFunction, Request, Response } from "express";
import { jwtHelper } from "../utils/jwtHelper";
import config from "../config";
import AppError from "../errors/AppError";
import { constants as httpStatus } from "http2";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new AppError(
          httpStatus.HTTP_STATUS_UNAUTHORIZED,
          "Unauthorized access!"
        );
      }

      const verifiedUser = jwtHelper.verifyToken(
        token,
        config.jwt_access_secret as string
      );

      const { role } = verifiedUser;

      if (roles.length && !roles.includes(role)) {
        throw new AppError(
          httpStatus.HTTP_STATUS_UNAUTHORIZED,
          "Unauthorized access!"
        );
      }

      req.user = verifiedUser;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
