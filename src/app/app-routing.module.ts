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
import { AtualizaPesoPageComponent } from './components/atualiza-peso-page/atualiza-peso-page.component';
import { AtualizaMedidasPageComponent } from './components/atualiza-medidas-page/atualiza-medidas-page.component';
import { MapaRefeicoesPageComponent } from './components/mapa-refeicoes-page/mapa-refeicoes-page.component';
import { DetalhesPesoPageComponent } from './components/detalhes-peso-page/detalhes-peso-page.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'sign-up', component: SignUpPageComponent },
  { path: 'home', component: HomePageComponent, canActivate: [authGuard] },
  { path: 'agua', component: AguaPageComponent, canActivate: [authGuard] },
  { path: 'refeicoes', component: RefeicoesPageComponent, canActivate: [authGuard] },
  { path: 'meu-peso', component: MeuPesoPageComponent, canActivate: [authGuard] },
  { path: 'perfil', component: ProfilePageComponent, canActivate: [authGuard] },
  { path: 'atualiza-peso', component: AtualizaPesoPageComponent, canActivate: [authGuard] },
  { path: 'atualiza-medidas', component: AtualizaMedidasPageComponent, canActivate: [authGuard] },
  { path: 'mapa-refeicoes', component: MapaRefeicoesPageComponent, canActivate: [authGuard] },
  { path: 'detalhes', component: DetalhesPesoPageComponent, canActivate: [authGuard] },
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
