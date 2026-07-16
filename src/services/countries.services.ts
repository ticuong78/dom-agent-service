import {
  countryListSchema,
  type CountryList,
} from "@/schemas/countries.schemas.js";
import axios from "axios";

export async function getAllCountries(vendor: {
  url: string;
  token: string;
}): Promise<CountryList | null> {
  let countries: CountryList = [];

  if (!vendor.url || !vendor.token) {
    throw new Error(
      "Provided Country State City credentials are invalid. Please check again.",
    );
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

    countries = countryListSchema.parse(await response.data);

    return countries;
  } catch (err) {
    console.error(`[services-getCountries] ${err}`);
    throw err;
  }
}
