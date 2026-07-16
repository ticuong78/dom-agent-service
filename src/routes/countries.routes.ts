import { getAllCountries } from "@/services/countries.services.js";
import express from "express";
import type { Request, Response } from "express";

const countriesRouter = express.Router();

countriesRouter.get("/countries", async (req: Request, res: Response) => {
  const contryStateCityUrl = req.envs.COUNTRY_STATE_CITY_URL;
  const contryStateCityToken = req.envs.COUNTRY_STATE_CITY_TOKEN;

  try {
    const countries = await getAllCountries({
      url: contryStateCityUrl,
      token: contryStateCityToken,
    });

    res.json(countries);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

export default countriesRouter;
