// import { countries } from "@/instances/countries.instance.js";

// mot ti nua instances se duoc truyen xuong
import express from "express";
import type { Request, Response } from "express";

const healthRouter = express.Router();

healthRouter.get("/alive", (req: Request, res: Response) => {
  // if (countries.length !== 0) console.log("[health] Countries still persists.");
  // else console.log("[health] Countries data needs fetch.");
  res.status(200).send("Alive");
});

export default healthRouter;
