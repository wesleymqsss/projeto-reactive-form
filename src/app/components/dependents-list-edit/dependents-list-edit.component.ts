import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dependents-list-edit',
  standalone: false,
  templateUrl: './dependents-list-edit.component.html',
  styleUrl: './dependents-list-edit.component.scss'
})
export class DependentsListEditComponent {

  @Input({ required: true }) userForm!: FormGroup;
  @Output('onRemoveDependent') onRemoveDependeEmitt = new EventEmitter<number>();
  @Output('onAddDependent') onAddDependeEmitt = new EventEmitter<void>();

  get dependentsList(): FormArray {
    return this.userForm.get('dependentsList') as FormArray;
  }


  removeDependent(index: number) {
    this.onRemoveDependeEmitt.emit(index);
  }

  addDependent() {
    this.onAddDependeEmitt.emit();
  }
}
