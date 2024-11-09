import express, { Application, Request, Response, urlencoded } from "express";
const app: Application = express();
import cors from "cors";
import { Routes } from "./app/routes";

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

// global error handler

export default app;
