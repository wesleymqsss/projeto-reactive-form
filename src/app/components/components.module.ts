import { NgModule } from "@angular/core";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { PipesModule } from "../pipes/pipes.module";
import { UserListComponent } from './user-list/user-list.component';
import { CommonModule } from "@angular/common";
import { GeneralInformationsComponent } from './general-informations/general-informations.component';
import { UserInfoItemComponent } from './user-info-item/user-info-item.component';

@NgModule({
    declarations: [
    UserListComponent,
    GeneralInformationsComponent,
    UserInfoItemComponent
  ],
    imports: [
        AngularMaterialModule,
        PipesModule,
        CommonModule
    ],
    exports: [
      UserListComponent,
      GeneralInformationsComponent,
       UserInfoItemComponent
    ]
})

export class ComponentsModule{}