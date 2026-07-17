import "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    envs: Env;
    instances: {
      countriesModel: {
        setCountryList: (countries: Country[]) => void;
        getCountryList: () => Country[];
      };
    };
  }
}

export {};
