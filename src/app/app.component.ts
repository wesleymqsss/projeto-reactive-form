import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { UsersListResponse } from './types/users-list-response';
import { take } from 'rxjs';
import { IUser } from './interfaces/user/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { IDialogConfirmationData } from './interfaces/dialog-confirmation-data.interface';
import { UpadteUserService } from './services/update-user.service';
import { UserFormRawValueService } from './services/user-form-raw-value.service';
import { convertUserFormToUser } from './utils/convert-user-form-to-user';

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
    private readonly _matDialog: MatDialog,
    private readonly _updateUserService: UpadteUserService,
    private readonly _userFormRawValueService: UserFormRawValueService
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
      this.openConfirmationDialog({
        title: 'O Formulário foi alterado',
        message: 'Deseja de fato cancelar as alterações feitas no formulário?'
      },
        (value: boolean) => {
          if (!value) return;

          this.isInEditMode = false;
          this.userFormUpdated = false;
        }
      )
    } else {
      this.isInEditMode = false;
    }
  }

  onSaveButton() {
    this.openConfirmationDialog(
      {
        title: 'Confirmar alteracao de dados',
        message: 'Deseja de fato salvar os valores alterados?'
      },
      (value: boolean) => {
        if(!value) return;

        this.saveUserInfos()
        this.isInEditMode = true;
        this.userFormUpdated =  false;
      }
    );
  }

  onEditButton() {
    this.isInEditMode = true;
  }

  private openConfirmationDialog(data: IDialogConfirmationData, callback: (value: boolean) => void) {
    const dialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe(callback);
  }

  private saveUserInfos(){
    const newUser: IUser =  this.convertUserFormToUser();

    this._updateUserService.updateUser(newUser).subscribe((newUserResponse: IUser) => {
      if(this.userSelectedIndex === undefined) return;

      this.usersList[this.userSelectedIndex] = newUserResponse;
    });
  }

  private convertUserFormToUser(): IUser {
    console.log('======> form populado para formatacao', this._userFormRawValueService.userFormRawValue);
    
    console.log('problemao ====> -.-', convertUserFormToUser(this._userFormRawValueService.userFormRawValue))
    
    return {} as IUser;
  }
}
