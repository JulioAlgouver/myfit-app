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
import { AguaPageComponent } from './agua-page/agua-page.component';
import { RefeicoesPageComponent } from './refeicoes-page/refeicoes-page.component';
import { MeuPesoPageComponent } from './meu-peso-page/meu-peso-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';


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
        AguaPageComponent,
        RefeicoesPageComponent,
        MeuPesoPageComponent,
        ProfilePageComponent,
  ],
    exports:[
        LoginPageComponent,
        SignUpPageComponent,
        HeaderComponent,
        FooterComponent,
        AguaPageComponent,
        RefeicoesPageComponent,
        MeuPesoPageComponent,
        ProfilePageComponent,
    ],
})
export class ComponentsModule{

}