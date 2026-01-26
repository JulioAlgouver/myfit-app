import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HidratacaoService, ValorDiarioResponse } from '../../services/hidratacao.service';
import { RefeicaoService, ValorRefeicaoDiariResponse } from '../../services/refeicao.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{
  public aguaConsumida: Number = 0;
  public caloriaConsumuda: Number = 0;
  public proteinaConsumida: Number = 0;
  public carboidratoConsumido: Number = 0;
  public gorduraConsumida: Number = 0;
  public fibraConsumida: Number = 0;
  
  erro: string = 'Erro ao carregar valor diario';
  successful: string = '';

  constructor(
    private userService:UserService,
    private hidratacaoService:HidratacaoService,
    private refeicaoService:RefeicaoService
  ){}

  ngOnInit(){
    this.carregarValorDiario();
  }

  carregarValorDiario(){
    const idUsuario = localStorage.getItem('userId');

    if(!idUsuario){
      this.erro = 'Usuario não encontrado';
      return;
    }

    this.refeicaoService.pegarValorTotalDiario(idUsuario).subscribe({
      next: (res:ValorRefeicaoDiariResponse) => {
          this.caloriaConsumuda = Number(res.total_calorias_diario.toFixed(0));
          this.proteinaConsumida = Number(res.total_proteinas_diario.toFixed(2));
          this.carboidratoConsumido = Number(res.total_carboidratos_diario.toFixed(2));
          this.gorduraConsumida = Number(res.total_gorduras_diario.toFixed(2));
          this.fibraConsumida = Number(res.total_fibras_diario.toFixed(2));
      },
      error: (err) => {
        this.erro;
        console.error(err);
      }
    })

    this.hidratacaoService.pegarValorTotalDiario(idUsuario).subscribe({
      next:(res:ValorDiarioResponse) => {
        this.aguaConsumida = Number(res.valor_diario)/1000;
      },
      error:(err) => {
        this.erro;
        console.error(err);
      }
    })
  }
}
