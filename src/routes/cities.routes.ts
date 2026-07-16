import z from "zod";
import express from "express";
import type { Request, Response } from "express";

const citiesRouter = express.Router();

const getCitiesParamSchema = z.object({
  inCountry: z.string().optional(),
  withCountry: z.boolean().optional().default(false),
});

citiesRouter.get("/cities", (req: Request, res: Response) => {
  const citiesRequestData = getCitiesParamSchema.parse(req.params);
});

// not implement
