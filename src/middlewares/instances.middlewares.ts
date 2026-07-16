import { CountriesModel } from "@/models/countries.model.js";
import type { Request, Response, NextFunction } from "express";

export function injectInstances(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const countries = new CountriesModel();

  if (!req.instances) req.instances = {};

  req.instances.countriesModel = countries;
}
