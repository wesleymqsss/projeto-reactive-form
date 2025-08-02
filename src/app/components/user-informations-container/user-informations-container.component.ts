import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';
import { UserFormController } from './user-form-controller';
import { CountriesService } from '../../services/countries.service';
import { CountriesList } from '../../types/countries-list';
import { distinctUntilChanged, take } from 'rxjs';
import { StatesService } from '../../services/states.service';
import { StateList } from '../../types/states-list';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-informations-container',
  standalone: false,
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.scss'
})
export class UserInformationsContainerComponent extends UserFormController implements OnChanges, OnInit {
  currentTabIndex: number = 0;
  countriesList: CountriesList = [];
  statesList: StateList = [];
  private readonly _countriesService = inject(CountriesService);
  private readonly _statesService = inject(StatesService);

  @Input({ required: true }) userSelected: IUser = {} as IUser;
  @Input({ required: true }) isInEditMode: boolean = false;
  @Output('onFormStatusChanges') onFormStatusChangeEmitt = new EventEmitter<boolean>()
  @Output('onUserFormFirstChange') onUserFormFirstChangeEmitt = new EventEmitter<void>()

  ngOnInit() { 
    this.onUserFormStatusChange();
    this.getCountriesList();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.currentTabIndex = 0;

    const HAS_USER_SELECTED = changes['userSelected'].currentValue && Object.keys(changes['userSelected'].currentValue).length > 0;

    if (HAS_USER_SELECTED) {
      this.fulfillUserForm(this.userSelected);
      this.OnUserFormFirstChange();
      this.getStateList(this.userSelected.country);
    }
  }
  
  private OnUserFormFirstChange() {
    this.userForm.valueChanges.pipe(take(1)).subscribe(()=> this.onUserFormFirstChangeEmitt.emit())
  }

  private onUserFormStatusChange() {
    this.userForm.statusChanges.pipe(distinctUntilChanged()).subscribe(()=> this.onFormStatusChangeEmitt.emit(this.userForm.valid));
  }

  onCountrySelected(countryName: string) {
    this.getStateList(countryName);
  }

  private getCountriesList() {
    this._countriesService.getCountries().pipe(take(1)).subscribe({
      next: (countriesList: CountriesList) => {
        this.countriesList = countriesList;

      }
    });
  }

  private getStateList(country: string) {
    console.log('===> pais ', country)
    this._statesService.getStates(country).pipe(take(1)).subscribe({
      next: (responseStateList: StateList) => {
        this.statesList = responseStateList;
        console.log(this.statesList)
      }, error: (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    })
  }

  mostrarUserForm() {
    console.log('form =>', this.userForm)
  }
}
