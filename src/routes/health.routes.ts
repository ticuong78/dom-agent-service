import express from "express";
import type { Request, Response } from "express";

const healthRouter = express.Router();

healthRouter.get("/alive", (req: Request, res: Response) => {
  res.status(200).send("Alive");
});

export default healthRouter;
