import { CountriesModel } from "@/models/countries.model.js";
import type { Request, Response, NextFunction } from "express";

const countries = new CountriesModel();

export function injectInstances(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  req.instances.countriesModel = {
    getCountryList: countries.getCountryList,
    setCountryList: countries.setCountryList,
  };

  next();
}
