import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';

@Component({
  selector: 'app-user-informations-container',
  standalone: false,
  templateUrl: './user-informations-container.component.html',
  styleUrl: './user-informations-container.component.scss'
})
export class UserInformationsContainerComponent implements OnChanges{
    currentTabIndex: number = 1;
    @Input({required: true}) userSelected: IUser = {} as IUser;
    @Input({ required : true}) isInEditMode: boolean = false;

    ngOnChanges(_: SimpleChanges) {
      this.currentTabIndex = 1;
    }


}
