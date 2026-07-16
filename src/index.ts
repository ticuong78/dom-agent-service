// hosts
import express from "express";
import type { Application, Request, Response } from "express";

// presentation
import * as SwaggerUI from "swagger-ui-express";

// built-in modules
import swaggerSpec from "@/config/swagger.config.js";

import { injectEnvs } from "./middlewares/env.middlewares.js";
import countriesRouter from "./routes/countries.routes.js";
import statesRouter from "./routes/states.routes.js";

const app: Application = express();
const PORT = process.env.APP_PORT || 3715;

app.use(injectEnvs); // injtecEnvs
app.use(express.json()); // middleware to parse JSON
app.use(express.static("public"));
app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

app.use("/api/location", countriesRouter);
app.use("/api/location", statesRouter); // not enough credit to use it the moment

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
