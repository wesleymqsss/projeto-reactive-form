import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { UsersListResponse } from './types/users-list-response';
import { take } from 'rxjs';
import { IUser } from './interfaces/user/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isInEditMode: boolean = false;
  enableSaveButton: boolean = false;
  userFormUpdated: boolean = false;

  userSelectedIndex: number | undefined;
  userSelected: IUser = {} as IUser;

  usersList: UsersListResponse = [];


  constructor(
    private readonly _userService: UserService,
    private readonly _matDialog: MatDialog
  ) { }

  ngOnInit() {
    this._userService.getUsers().pipe(take(1)).subscribe({
      next: (responseUser) => {
        this.usersList = responseUser;
      }
    });

  }

  onUserFormFirstChange() {
    this.userFormUpdated = true;
  }

  onFormStatusChanges(formStatus: boolean) {
    setTimeout(() => this.enableSaveButton = formStatus, 0);
  }

  onUserSelected(userIndex: number) {
    const userFound = this.usersList[userIndex];

    if (userFound) {
      this.userSelectedIndex = userIndex;
      this.userSelected = structuredClone(userFound);

    }

  }

  onCancelButton() {
    if (this.userFormUpdated) {
     const dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
        data: {
          title: 'O Formulário foi alterado',
          message: 'Deseja de fato cancelar as alterações feitas no formulário?'
        }
      });

      dialogRef.afterClosed().subscribe((value: boolean) => {
        if(!value) return;

        this.isInEditMode = false;
        this.userFormUpdated = false;
      });
      
    } else {
      this.isInEditMode = false;
    }
  }

  onEditButton() {
    this.isInEditMode = true;
  }
}
