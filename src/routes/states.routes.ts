import { getAllStates } from "@/services/states.services.js";
import express from "express";
import type { Request, Response } from "express";

const statesRouter = express.Router();

statesRouter.get("/states", async (req: Request, res: Response) => {
  const contryStateCityUrl = req.env.COUNTRY_STATE_CITY_URL;
  const contryStateCityToken = req.env.COUNTRY_STATE_CITY_TOKEN;

  try {
    const states = await getAllStates({
      url: contryStateCityUrl,
      token: contryStateCityToken,
    });

    res.json(states);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

export default statesRouter;
