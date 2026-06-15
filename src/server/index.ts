import express from "express";
import type { Application, Request, Response } from "express";
import { diffingService } from "./service/diffing";

const app: Application = express();
const PORT = process.env.APP_PORT || 3000;

app.use(express.json()); // middleware to parse JSON

app.post("/api/diff", (req: Request, res: Response) => {
  const body = req.body;

  const compositeReport = diffingService(body.first, body.second);

  res.json({
    success: true,
    message: compositeReport.serialize(),
  });
});

const server = app.listen(PORT, () => {
  console.log(`App started listenning on port: ${PORT}`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
});

server.on("close", () => {
  console.log("Server closed");
});

process.on("exit", (code) => {
  console.log(`Process exiting with code: ${code}`);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
});
