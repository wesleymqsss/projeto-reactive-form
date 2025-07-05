import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { IContriesResponse } from "../interfaces/countries-response/countries-response.interfacce";
import { CountriesList } from "../types/countries-list";

@Injectable({
    providedIn: 'root',
})
export class CountriesService{
    constructor(
        private readonly _httpClient: HttpClient
    ){}

    getCountries(): Observable<CountriesList>{
        return this._httpClient.get<IContriesResponse>('https://countriesnow.space/api/v0.1/countries').pipe(
            map((countriesResponse)=> {
                return countriesResponse.data;
            })
        );
    }
}