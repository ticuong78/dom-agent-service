import { getAllCountries } from "@/services/countries.services.js";
import express from "express";
import type { Request, Response } from "express";

const countriesRouter = express.Router();
type Country = {
  name: string;
  iso2: string;
  iso3: string;
};

const FALLBACK_COUNTRY_LIST: Country[] = [
  { name: "Vietnam", iso2: "VN", iso3: "VNM" },

  // Southeast Asia
  { name: "Singapore", iso2: "SG", iso3: "SGP" },
  { name: "Thailand", iso2: "TH", iso3: "THA" },
  { name: "Malaysia", iso2: "MY", iso3: "MYS" },
  { name: "Indonesia", iso2: "ID", iso3: "IDN" },
  { name: "Philippines", iso2: "PH", iso3: "PHL" },
  { name: "Cambodia", iso2: "KH", iso3: "KHM" },
  { name: "Laos", iso2: "LA", iso3: "LAO" },
  { name: "Myanmar", iso2: "MM", iso3: "MMR" },
  { name: "Brunei", iso2: "BN", iso3: "BRN" },

  // East Asia
  { name: "China", iso2: "CN", iso3: "CHN" },
  { name: "Japan", iso2: "JP", iso3: "JPN" },
  { name: "South Korea", iso2: "KR", iso3: "KOR" },
  { name: "Mongolia", iso2: "MN", iso3: "MNG" },

  // South Asia
  { name: "India", iso2: "IN", iso3: "IND" },
  { name: "Pakistan", iso2: "PK", iso3: "PAK" },
  { name: "Bangladesh", iso2: "BD", iso3: "BGD" },
  { name: "Sri Lanka", iso2: "LK", iso3: "LKA" },
  { name: "Nepal", iso2: "NP", iso3: "NPL" },

  // North America
  { name: "United States", iso2: "US", iso3: "USA" },
  { name: "Canada", iso2: "CA", iso3: "CAN" },
  { name: "Mexico", iso2: "MX", iso3: "MEX" },

  // South America
  { name: "Brazil", iso2: "BR", iso3: "BRA" },
  { name: "Argentina", iso2: "AR", iso3: "ARG" },
  { name: "Chile", iso2: "CL", iso3: "CHL" },
  { name: "Colombia", iso2: "CO", iso3: "COL" },
  { name: "Peru", iso2: "PE", iso3: "PER" },

  // Europe
  { name: "United Kingdom", iso2: "GB", iso3: "GBR" },
  { name: "France", iso2: "FR", iso3: "FRA" },
  { name: "Germany", iso2: "DE", iso3: "DEU" },
  { name: "Italy", iso2: "IT", iso3: "ITA" },
  { name: "Spain", iso2: "ES", iso3: "ESP" },
  { name: "Netherlands", iso2: "NL", iso3: "NLD" },
  { name: "Belgium", iso2: "BE", iso3: "BEL" },
  { name: "Switzerland", iso2: "CH", iso3: "CHE" },
  { name: "Austria", iso2: "AT", iso3: "AUT" },
  { name: "Portugal", iso2: "PT", iso3: "PRT" },
  { name: "Ireland", iso2: "IE", iso3: "IRL" },
  { name: "Poland", iso2: "PL", iso3: "POL" },
  { name: "Sweden", iso2: "SE", iso3: "SWE" },
  { name: "Norway", iso2: "NO", iso3: "NOR" },
  { name: "Denmark", iso2: "DK", iso3: "DNK" },
  { name: "Finland", iso2: "FI", iso3: "FIN" },
  { name: "Ukraine", iso2: "UA", iso3: "UKR" },
  { name: "Russia", iso2: "RU", iso3: "RUS" },
  { name: "Turkey", iso2: "TR", iso3: "TUR" },

  // Middle East
  { name: "United Arab Emirates", iso2: "AE", iso3: "ARE" },
  { name: "Saudi Arabia", iso2: "SA", iso3: "SAU" },
  { name: "Israel", iso2: "IL", iso3: "ISR" },
  { name: "Qatar", iso2: "QA", iso3: "QAT" },

  // Oceania
  { name: "Australia", iso2: "AU", iso3: "AUS" },
  { name: "New Zealand", iso2: "NZ", iso3: "NZL" },

  // Africa
  { name: "South Africa", iso2: "ZA", iso3: "ZAF" },
  { name: "Egypt", iso2: "EG", iso3: "EGY" },
  { name: "Nigeria", iso2: "NG", iso3: "NGA" },
  { name: "Kenya", iso2: "KE", iso3: "KEN" },
  { name: "Morocco", iso2: "MA", iso3: "MAR" },
];

countriesRouter.get("/countries", async (req: Request, res: Response) => {
  const countriesModel = {
    getCountryList: req.instances.countriesModel.getCountryList,
    setCountryList: req.instances.countriesModel.setCountryList,
  };
  const contryStateCityUrl = req.envs.COUNTRY_STATE_CITY_URL;
  const contryStateCityToken = req.envs.COUNTRY_STATE_CITY_TOKEN;

  try {
    let countries = countriesModel.getCountryList();

    if (countries.length === 0) {
      countries =
        (await getAllCountries({
          url: contryStateCityUrl,
          token: contryStateCityToken,
        })) || [];

      countriesModel.setCountryList(countries);
    }

    const response =
      countries.map((con) => {
        return {
          ios2: con.iso2,
          iso3: con.iso3,
          name: con.name,
        };
      }) || FALLBACK_COUNTRY_LIST;

    res.json(response);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

export default countriesRouter;
