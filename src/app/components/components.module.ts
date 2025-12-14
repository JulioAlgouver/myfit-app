import { NgModule } from "@angular/core";
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { AppRoutingModule } from "../app-routing.module";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { HomePageComponent } from './home-page/home-page.component';


@NgModule({
    imports: [
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
],
    declarations:[
        LoginPageComponent,
        SignUpPageComponent,
        HomePageComponent,
  ],
    exports:[
        LoginPageComponent,
        SignUpPageComponent
    ],
})
export class ComponentsModule{

}