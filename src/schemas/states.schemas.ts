import { z } from "zod";

export const stateSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1),
  iso2: z.string().min(1),

  country_id: z.number().int(),
  country_code: z.string().length(2),

  latitude: z.coerce.number(),
  longitude: z.coerce.number(),

  timezone: z.string().min(1),

  fips_code: z.string(),
  iso3166_2: z.string(),

  type: z.string(),
  level: z.number().int(),
  parent_id: z.number().int(),

  native: z.string(),
  population: z.number().int().nonnegative(),

  translations: z.string(),
  wikiDataId: z.string(),
});

export const stateListSchema = z.array(stateSchema);

export type State = z.infer<typeof stateSchema>;
export type StateList = z.infer<typeof stateListSchema>;
