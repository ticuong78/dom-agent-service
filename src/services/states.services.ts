import axios from "axios";

import { countries } from "@/instances/countries.instance.js";
import { setStatesInstance, states } from "@/instances/states.instance.js";
import {
  stateListSchema,
  stateSchema,
  type StateList,
} from "@/schemas/states.schemas.js";

export async function getAllStates(vendor: {
  url: string;
  token: string;
}): Promise<StateList | null> {
  if (!vendor.url || !vendor.token) {
    throw new Error(
      "Provided Country State City credentials are invalid. Please check again.",
    );
  }

  if (states.length !== 0) {
    console.info("[services-getStates] Found states in cache. Returning ...");
    return states;
  }

  try {
    console.info(
      `[services-getStates] Fetching ${vendor.url}/states with token of length ${vendor.token} ...`,
    );
    const newStateList: StateList = await Promise.all(
      countries.map(async (ct) => {
        const response = await axios.get(
          `${vendor.url}/countries/${ct.iso2}/states`,
          {
            headers: {
              "X-CSCAPI-KEY": vendor.token,
            },
          },
        );

        return stateSchema.parse(response.data);
      }),
    );

    setStatesInstance(stateListSchema.parse(newStateList));

    return states;
  } catch (err) {
    console.error(`[services-getStates] ${err}`);
    throw err;
  }
}
