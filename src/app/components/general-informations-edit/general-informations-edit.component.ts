import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CountriesList } from '../../types/countries-list';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-general-informations-edit',
  standalone: false,
  templateUrl: './general-informations-edit.component.html',
  styleUrl: './general-informations-edit.component.scss'
})
export class GeneralInformationsEditComponent implements OnChanges, OnInit {
  @Input({ required: true }) userForm!: FormGroup;
  @Input({ required: true }) countriesList: CountriesList = [];
  countryListFiltered: CountriesList = [];

  ngOnInit() {

    this.watchCountryFormChangesAndFilter();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['countriesList'].currentValue);
    this.countryListFiltered = this.countriesList;
  }

  get emailControl(): FormControl {
    return this.userForm.get('generalInformations.email') as FormControl;
  }

  get countryControl(): FormControl {
    return this.userForm.get('generalInformations.country') as FormControl;
  }

  onCountrySelected(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);
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

}
