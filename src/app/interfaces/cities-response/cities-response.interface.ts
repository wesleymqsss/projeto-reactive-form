import { CitiesList } from "../../types/cities-list";
import { IBaseCountriesResponse } from "../base-countries-response.interface";

export interface ICitiesResponse extends IBaseCountriesResponse{
    data: CitiesList;
};