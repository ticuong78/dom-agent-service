import type { StateList } from "@/schemas/states.schemas.js";

export const states: StateList = [];

export function setStatesInstance(stateList: StateList) {
  states.push(...stateList);
}
