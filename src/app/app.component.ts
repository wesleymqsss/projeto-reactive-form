import { Component, OnInit } from '@angular/core';
import { CountriesService } from './services/countries.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'projeto-reactive-forms';

  constructor(
    private readonly _countriesService: CountriesService
  ){}

  ngOnInit() {
    this._countriesService.getCountries().subscribe({
      next: (CountriesResponse) => {
        console.log(CountriesResponse);
      }
    })   
  }

  
}
