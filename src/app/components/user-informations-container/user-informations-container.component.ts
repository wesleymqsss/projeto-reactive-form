import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';
import { UserFormController } from './user-form-controller';
import { CountriesService } from '../../services/countries.service';
import { CountriesList } from '../../types/countries-list';
import { take } from 'rxjs';

@Component({
  selector: 'app-user-informations-container',
  standalone: false,
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.scss'
})
export class UserInformationsContainerComponent extends UserFormController implements OnChanges, OnInit {
  currentTabIndex: number = 0;
  countriesList: CountriesList = [];

  private readonly _countriesService = inject(CountriesService);

  @Input({ required: true }) userSelected: IUser = {} as IUser;
  @Input({ required: true }) isInEditMode: boolean = false;

  ngOnInit() {
    this.getCountriesList();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.currentTabIndex = 1;

    const HAS_USER_SELECTED = changes['userSelected'].currentValue && Object.keys(changes['userSelected'].currentValue).length > 0;

    if (HAS_USER_SELECTED) {
      this.fulfillUserForm(this.userSelected);
    }
  }

  private getCountriesList() {
    this._countriesService.getCountries().pipe(take(1)).subscribe({
      next: (countriesList: CountriesList) => {
        this.countriesList = countriesList;
      }
    });
  }




}
