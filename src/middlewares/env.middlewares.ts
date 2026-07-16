import { env } from "@/config/env.config.js";
import type { Request, Response, NextFunction } from "express";

export function injectEnvs(req: Request, res: Response, next: NextFunction) {
  req.env = env;

  if (req.env.NODE_ENV === "development")
    console.log("[middleware-injectEnvs] ", req.env);

  next();
}
