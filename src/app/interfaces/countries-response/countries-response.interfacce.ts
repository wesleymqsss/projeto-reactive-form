import { CountriesList } from "../../types/countries-list";
import { IBaseCountriesResponse } from "../base-countries-response.interface";

export interface IContriesResponse extends IBaseCountriesResponse{
    data: CountriesList;
};