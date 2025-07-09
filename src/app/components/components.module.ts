import { NgModule } from "@angular/core";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { PipesModule } from "../pipes/pipes.module";
import { UserListComponent } from './user-list/user-list.component';
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
    UserListComponent
  ],
    imports: [
        AngularMaterialModule,
        PipesModule,
        CommonModule
    ],
    exports: [
      UserListComponent
    ]
})

export class ComponentsModule{}