import type { CountryModel } from "@/models/countries.model.ts";

declare module "express" {
  interface Request {
    envs?: Env;
    instances?: {
      countriesModel?: CountryModel
    } = {};
  }
}

export {};
