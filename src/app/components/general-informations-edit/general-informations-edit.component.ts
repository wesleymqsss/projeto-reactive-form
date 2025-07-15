import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-general-informations-edit',
  standalone: false,
  templateUrl: './general-informations-edit.component.html',
  styleUrl: './general-informations-edit.component.scss'
})
export class GeneralInformationsEditComponent {
  @Input({required: true}) userForm!: FormGroup;
  
}
