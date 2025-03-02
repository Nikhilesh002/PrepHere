import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import router from "./routes/index";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./configs/db";
import { configs } from "./configs";

dotenv.config();

connectDb();

const app: Express = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Middleware for CORS
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("PrepHere API");
});

app.use("/api", router);

const port = configs.port;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
