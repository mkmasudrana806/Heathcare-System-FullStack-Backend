import express, {
  Application,
  NextFunction,
  request,
  Request,
  response,
  Response,
  urlencoded,
} from "express";
const app: Application = express();
import cors from "cors";
import { Routes } from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundRoute from "./app/middlewares/notFoundRoute";
import cookieParser from "cookie-parser";
import config from "./app/config";

// middlewares parser
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// api routes middlewares
app.use("/api/v1", Routes);

// base api route
app.get("/", (req: Request, res: Response) => {
  console.log(config.node_env);
  res.send("heathcare server is running");
});

// not found route
app.use(notFoundRoute);

// global error handler
app.use(globalErrorHandler);

export default app;
