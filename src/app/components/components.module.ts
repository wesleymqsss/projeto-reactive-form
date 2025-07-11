import { NgModule } from "@angular/core";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { PipesModule } from "../pipes/pipes.module";
import { UserListComponent } from './user-list/user-list.component';
import { CommonModule } from "@angular/common";
import { GeneralInformationsComponent } from './general-informations/general-informations.component';
import { UserInfoItemComponent } from './user-info-item/user-info-item.component';
import { ContactInformationsComponent } from './contact-informations/contact-informations.component';
import { PhoneListComponent } from './contact-informations/components/phone-list/phone-list.component';

@NgModule({
    declarations: [
    UserListComponent,
    GeneralInformationsComponent,
    UserInfoItemComponent,
    ContactInformationsComponent,
    PhoneListComponent
  ],
    imports: [
        AngularMaterialModule,
        PipesModule,
        CommonModule
    ],
    exports: [
      UserListComponent,
      GeneralInformationsComponent,
       UserInfoItemComponent,
       ContactInformationsComponent
    ]
})

export class ComponentsModule{}