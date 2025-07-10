import { Component, OnInit } from '@angular/core';
import { CountriesService } from './services/countries.service';
import { StatesService } from './services/states.service';
import { CitiesService } from './services/cities.service';
import { UserService } from './services/user.service';
import { UsersListResponse } from './types/users-list-response';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'projeto-reactive-forms';
  usersList: UsersListResponse = [];
  currentTabIndex: number = 1;

  constructor(
    private readonly _countriesService: CountriesService,
    private readonly _statesService: StatesService,
    private readonly _citiesService: CitiesService,
    private readonly _userService: UserService,
  ) { }

  ngOnInit() {
    // this._countriesService.getCountries().subscribe({
    //   next: (CountriesResponse) => {
    //     console.log(CountriesResponse);
    //   }
    // });

    // this._statesService.getStates('Brazil').subscribe({
    //   next: (statesResponse) => {
    //     console.log(' statesResponse => ',statesResponse);
    //   }
    // });

    // this._citiesService.getCities('Brazil', 'Rio de Janeiro').subscribe({
    //   next: (responseCities) => {
    //     console.log('Cities =>', responseCities)
    //   }
    // });

    this._userService.getUsers().pipe(take(1)).subscribe({
      next: (responseUser) => {
        this.usersList = responseUser;
      }
    });

  }


}
