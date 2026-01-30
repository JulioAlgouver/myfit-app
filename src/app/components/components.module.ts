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
import { ChangePasswordComponent } from './change-password/change-password.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AtualizaPesoPageComponent } from './atualiza-peso-page/atualiza-peso-page.component';
import { CleanFooterComponent } from './clean-footer/clean-footer.component';
import { AtualizaMedidasPageComponent } from './atualiza-medidas-page/atualiza-medidas-page.component';
import { MapaRefeicoesPageComponent } from './mapa-refeicoes-page/mapa-refeicoes-page.component';
import { DetalhesPesoPageComponent } from './detalhes-peso-page/detalhes-peso-page.component';
import { ImcBarProgressComponent } from './imc-bar-progress/imc-bar-progress.component';
import { TabelaImcComponent } from './tabela-imc/tabela-imc.component';
import { ChartPesoComponent } from './chart-peso/chart-peso.component';
import { ChartMedidasComponent } from './chart-medidas/chart-medidas.component';
import { ChartDetalheRefeicoesComponent } from './chart-detalhe-refeicoes/chart-detalhe-refeicoes.component';


@NgModule({
    imports: [
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
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
        ChangePasswordComponent,
        AtualizaPesoPageComponent,
        CleanFooterComponent,
        AtualizaMedidasPageComponent,
        MapaRefeicoesPageComponent,
        DetalhesPesoPageComponent,
        ImcBarProgressComponent,
        TabelaImcComponent,
        ChartPesoComponent,
        ChartMedidasComponent,
        ChartDetalheRefeicoesComponent,
  ],
    exports:[
        BrowserAnimationsModule,
        LoginPageComponent,
        SignUpPageComponent,
        HeaderComponent,
        FooterComponent,
        AguaPageComponent,
        RefeicoesPageComponent,
        MeuPesoPageComponent,
        ProfilePageComponent,
        ChangePasswordComponent,
        AtualizaPesoPageComponent,
        CleanFooterComponent,
        AtualizaMedidasPageComponent,
        MapaRefeicoesPageComponent,
        DetalhesPesoPageComponent,
        ImcBarProgressComponent,
        TabelaImcComponent,
    ],
})
export class ComponentsModule{

}