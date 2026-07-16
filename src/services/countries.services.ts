import {
  countries,
  setCountriesInstance,
} from "@/instances/countries.instance.js";
import {
  countryListSchema,
  type CountryList,
} from "@/schemas/countries.schemas.js";
import axios from "axios";

export async function getAllCountries(vendor: {
  url: string;
  token: string;
}): Promise<CountryList | null> {
  if (!vendor.url || !vendor.token) {
    throw new Error(
      "Provided Country State City credentials are invalid. Please check again.",
    );
  }

  if (countries.length !== 0) {
    console.info(
      "[services-getCountries] Found countries in cache. Returning ...",
    );
    return countries;
  }

  try {
    console.info(
      `[services-getCountries] Fetching ${vendor.url}/countries with token of length ${vendor.token.length} ...`,
    );
    const response = await axios.get(`${vendor.url}/countries`, {
      headers: {
        "X-CSCAPI-KEY": vendor.token,
      },
    });

    setCountriesInstance(countryListSchema.parse(await response.data));

    return countries;
  } catch (err) {
    console.error(`[services-getCountries] ${err}`);
    throw err;
  }
}
