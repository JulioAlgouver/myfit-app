import { NgModule } from "@angular/core";
import { LoginPageComponent } from './login-page/login-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { AppRoutingModule } from "../app-routing.module";
import { AngularMaterialModule } from "../angular-material/angular-material.module";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


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
        HeaderComponent,
        FooterComponent,
  ],
    exports:[
        LoginPageComponent,
        SignUpPageComponent,
        HeaderComponent,
        FooterComponent,
    ],
})
export class ComponentsModule{

}