import { Request, Response } from "express";

// ------------------ not found routes --------------------------------
const notFoundRoute = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "API NOT Found",
    error: {
      path: req.originalUrl,
      message: `Your requested path: ${req.url} not found!`,
    },
  });
};

export default notFoundRoute;
