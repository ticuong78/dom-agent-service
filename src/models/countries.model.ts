import type { CountryList } from "@/schemas/countries.schemas.js";

export class CountriesModel {
  private _countryList: CountryList;

  constructor(countryList: CountryList = []) {
    // chi duoc mot constructor
    this._countryList = countryList;
  }

  getCountryList() {
    return this._countryList;
  }

  setCountryList(countryList: CountryList) {
    this._countryList = countryList;
  }

  extendCountryList(countryList: CountryList) {
    this._countryList.push(...countryList);
  }
}
