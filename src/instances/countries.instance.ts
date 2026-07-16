import type { CountryList } from "@/schemas/countries.schemas.js";

export const countries: CountryList = [];

export function setCountriesInstance(countriesList: CountryList) {
  countries.push(...countriesList);
}
