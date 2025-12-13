import { NgModule } from "@angular/core";
import { LoginPageComponent } from './login-page/login-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { AppRoutingModule } from "../app-routing.module";
import { AngularMaterialModule } from "../angular-material/angular-material.module";

@NgModule({
    imports: [
    AppRoutingModule,
    AngularMaterialModule
],
    declarations:[
        LoginPageComponent,
        SignInPageComponent,
  ],
    exports:[
        LoginPageComponent,
        SignInPageComponent
    ],
})
export class ComponentsModule{

}