import { Component, OnInit } from '@angular/core';
import { CountriesService } from './services/countries.service';
import { StatesService } from './services/states.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'projeto-reactive-forms';

  constructor(
    private readonly _countriesService: CountriesService,
    private readonly _statesService: StatesService
  ){}

  ngOnInit() {
    this._countriesService.getCountries().subscribe({
      next: (CountriesResponse) => {
        console.log(CountriesResponse);
      }
    })

    this._statesService.getStates('Brazil').subscribe({
      next: (statesResponse) => {
        console.log(' statesResponse => ',statesResponse);
      }
    })   
  }

  
}
