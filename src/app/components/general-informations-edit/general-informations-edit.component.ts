import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CountriesList } from '../../types/countries-list';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { StateList } from '../../types/states-list';
import { maritalStatusArray } from '../../utils/marital-status-description-map';

@Component({
  selector: 'app-general-informations-edit',
  standalone: false,
  templateUrl: './general-informations-edit.component.html',
  styleUrl: './general-informations-edit.component.scss'
})
export class GeneralInformationsEditComponent implements OnChanges, OnInit {
  countryListFiltered: CountriesList = [];
  statesListFiltered: StateList = [];

  @Input({ required: true }) userForm!: FormGroup;
  @Input({ required: true }) countriesList: CountriesList = [];
  @Input({ required: true }) statesList: StateList = [];

  @Output('onCountrySelected') onCoutrySelectedEmitt = new EventEmitter<string>();

  ngOnInit() {

    this.watchCountryFormChangesAndFilter();
    this.watchStateFormChangesAndFilter();
  }

  ngOnChanges(changes: SimpleChanges) {
      this.countryListFiltered = this.countriesList;
      this.statesListFiltered = this.statesList;
  }

  get maritalStatusArray(){
    return maritalStatusArray;
  }

  get emailControl(): FormControl {
    return this.userForm.get('generalInformations.email') as FormControl;
  }

  get countryControl(): FormControl {
    return this.userForm.get('generalInformations.country') as FormControl;
  }

  get stateControl(): FormControl {
    return this.userForm.get('generalInformations.state') as FormControl;
  }

  onCountrySelected(event: MatAutocompleteSelectedEvent) {
    this.onCoutrySelectedEmitt.emit(event.option.value);
    console.log()
  }

  private watchStateFormChangesAndFilter() {
    this.stateControl.valueChanges.subscribe(this.filterStateList.bind(this));
  }

  private watchCountryFormChangesAndFilter() {
    this.countryControl.valueChanges.subscribe(this.filterCountriesList.bind(this));
  }

  private filterCountriesList(searchTerm: string) {
    if (!searchTerm) {
      this.countryListFiltered = [...this.countriesList];
      return;
    }

    this.countryListFiltered = this.countriesList.filter(
      (country) => country.country.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
  }

  private filterStateList(searchTerm: any) {
    if(!searchTerm) return;
    this.statesListFiltered = this.statesList.filter((state) => state.name.toLowerCase().includes(searchTerm.toLowerCase().trim()));
  }
}
