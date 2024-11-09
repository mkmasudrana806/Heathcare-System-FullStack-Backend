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

// middlewares parser
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

// api routes middlewares
app.use("/api/v1", Routes);

// base api route
app.get("/", (req: Request, res: Response) => {
  res.send("heathcare server is running");
});

// not found route
app.use(notFoundRoute);

// global error handler
app.use(globalErrorHandler);

export default app;
