import { countries } from "@/instances/countries.instance.js";
import express from "express";
import type { Request, Response } from "express";

const healthRouter = express.Router();

healthRouter.get("/alive", (req: Request, res: Response) => {
  if (countries.length !== 0) console.log("Countries still persists.");
  res.status(200).send("Alive");
});

export default healthRouter;
