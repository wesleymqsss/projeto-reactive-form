import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersListResponse } from '../../types/users-list-response';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  userSelectedIndex: number | undefined;
  @Input({ required: true }) usersList: UsersListResponse = [];
  @Input({ required: true }) isInEditMode: boolean = false;
  @Output('onUserSelected') userSelectedEmitt =  new EventEmitter<number>();

  onUserSelected(i: number) {
    if(this.isInEditMode) return;
    
    this.userSelectedIndex = i;
    this.userSelectedEmitt.emit(i);
  }
}
