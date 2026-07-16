import z from "zod";

export const timezoneSchema = z.object({
  zoneName: z.string(),
  gmtOffset: z.number(),
  gmtOffsetName: z.string(),
  abbreviation: z.string(),
  tzName: z.string(),
});

const timezonesSchema = z
  .union([z.string(), z.array(timezoneSchema)])
  .transform((value, context) => {
    if (Array.isArray(value)) {
      return value;
    }

    try {
      const parsed: unknown = JSON.parse(value);

      return z.array(timezoneSchema).parse(parsed);
    } catch {
      context.addIssue({
        code: "custom",
        message: "timezones must be a valid JSON array",
      });

      return z.NEVER;
    }
  });

export const countrySchema = z.object({
  id: z.coerce.number().int(),
  name: z.string().min(1),

  iso2: z.string().length(2),
  iso3: z.string().length(3),

  phonecode: z.string().min(1),

  capital: z.string(),
  currency: z.string().length(3),
  native: z.string(),

  region: z.string(),
  region_id: z.coerce.number().int(),

  subregion: z.string(),
  subregion_id: z.coerce.number().int(),

  timezones: timezonesSchema,

  latitude: z.coerce.number(),
  longitude: z.coerce.number(),

  emoji: z.string(),
});

export const countryListSchema = z.array(countrySchema);

export type Country = z.infer<typeof countrySchema>;
export type CountryList = z.infer<typeof countryListSchema>;
export type Timezone = z.infer<typeof timezoneSchema>;
