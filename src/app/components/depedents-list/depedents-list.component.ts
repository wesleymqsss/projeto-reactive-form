import { Component, Input } from '@angular/core';
import { DependentsList } from '../../types/dependents-list';

@Component({
  selector: 'app-depedents-list',
  standalone: false,
  templateUrl: './depedents-list.component.html',
  styleUrl: './depedents-list.component.scss'
})
export class DepedentsListComponent {
  @Input({required: true}) dependentsList: DependentsList | undefined = [];
}
