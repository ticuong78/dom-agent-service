import { env } from "@/config/env.config.js";
import type { Request, Response, NextFunction } from "express";

export function injectEnvs(req: Request, res: Response, next: NextFunction) {
  req.envs = env;

  if (req.envs.NODE_ENV === "development")
    console.log("[middleware-injectEnvs] ", req.envs);

  next();
}
