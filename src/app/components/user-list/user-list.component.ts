import { Component, Input } from '@angular/core';
import { UsersListResponse } from '../../types/users-list-response';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  @Input({required: true}) usersList: UsersListResponse = [];
}
