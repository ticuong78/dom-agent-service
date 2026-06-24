// hosts
import express from "express";
import type { Application, Request, Response } from "express";

import * as fs from "fs";

// presentation
import * as SwaggerUI from "swagger-ui-express";

// built-in modules
import { diffingService } from "@/service/diffing";
import swaggerSpec from "@/routes/swagger";
import path from "path";
import { fileURLToPath } from "url";

const app: Application = express();
const PORT = process.env.APP_PORT || 3715;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); // middleware to parse JSON
app.use(express.static("public"));
app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

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
