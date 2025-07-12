import { Component, OnInit } from '@angular/core';
import { CountriesService } from './services/countries.service';
import { StatesService } from './services/states.service';
import { CitiesService } from './services/cities.service';
import { UserService } from './services/user.service';
import { UsersListResponse } from './types/users-list-response';
import { take } from 'rxjs';
import { IUser } from './interfaces/user/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  userSelectedIndex: number | undefined;
  userSelected: IUser = {} as IUser;
  title = 'projeto-reactive-forms';
  usersList: UsersListResponse = [];
  currentTabIndex: number = 2;

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

  onUserSelected(userIndex: number) {
    const userFound = this.usersList[userIndex];

    if(userFound){
      this.userSelectedIndex = userIndex;
      this.userSelected = structuredClone(userFound);
      console.log('=>'  ,this.userSelected)
      console.log(userIndex);
    }

  }

}
