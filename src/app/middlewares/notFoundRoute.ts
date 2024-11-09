import { Request, Response } from "express";
import { constants } from "http2";

// ------------------ not found routes --------------------------------
const notFoundRoute = (req: Request, res: Response) => {
  res.status(constants.HTTP_STATUS_NOT_FOUND).json({
    success: false,
    message: "API NOT Found",
    error: {
      path: req.originalUrl,
      message: `Your requested path: ${req.url} not found!`,
    },
  });
};

export default notFoundRoute;
