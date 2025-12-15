import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { MeuPesoPageComponent } from './components/meu-peso-page/meu-peso-page.component';
import { RefeicoesPageComponent } from './components/refeicoes-page/refeicoes-page.component';
import { AguaPageComponent } from './components/agua-page/agua-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'sign-up', component: SignUpPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'agua', component: AguaPageComponent },
  { path: 'refeicoes', component: RefeicoesPageComponent },
  { path: 'meu-peso', component: MeuPesoPageComponent },
  { path: 'perfil', component: ProfilePageComponent },
];

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports:[
    RouterModule
  ],
})
export class AppRoutingModule { }
