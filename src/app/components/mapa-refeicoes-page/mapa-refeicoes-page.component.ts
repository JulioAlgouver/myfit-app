import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RefeicaoService, ValorRefeicaoDiariResponse } from '../../services/refeicao.service';

@Component({
  selector: 'app-mapa-refeicoes-page',
  templateUrl: './mapa-refeicoes-page.component.html',
  styleUrl: './mapa-refeicoes-page.component.scss'
})
export class MapaRefeicoesPageComponent implements OnInit{

  public aguaConsumida: Number = 0;
  public caloriaConsumuda: Number = 0;
  public proteinaConsumida: Number = 0;
  public carboidratoConsumido: Number = 0;
  public gorduraConsumida: Number = 0;
  public fibraConsumida: Number = 0;
  public sodioConsumido: Number = 0;

  public total: Number = 0;

  public proteinaEmPercent: Number = 0;
  public carboidratoEmPercent: Number = 0;
  public gorduraEmPercent: Number = 0;
  public fibraEmPercent: Number = 0;
  public sodioEmPercent: Number = 0;

  erro: string = 'Erro ao carregar valor diario';
  successful: string = '';

  constructor(
    private userService:UserService,
    private refeicaoService:RefeicaoService
  ){}
  
  ngOnInit(){
    this.carregarValorDiario()
    this.carregarValoremPercent()
  }

  carregarValorDiario(){
    const usuario = localStorage.getItem('usuario');
    const idUsuario = usuario ? JSON.parse(usuario).id : null;

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
        this.sodioConsumido = Number(res.total_sodio_diario.toFixed(2));
        this.total = Number(( 
          res.total_proteinas_diario +
          res.total_carboidratos_diario +
          res.total_gorduras_diario +
          res.total_fibras_diario +
          res.total_sodio_diario
        ).toFixed(2))
      },
      error: (err) => {
        this.erro;
        console.error(err);
      }
    });
  }

  carregarValoremPercent(){
    const usuario = localStorage.getItem('usuario');
    const idUsuario = usuario ? JSON.parse(usuario).id : null;

    if(!idUsuario){
      this.erro = 'Usuario não encontrado'
      return;
    }

    this.refeicaoService.pegarValorTotalDiario(idUsuario).subscribe({
      next: (res:ValorRefeicaoDiariResponse) => {
        this.total = Number(( 
          res.total_proteinas_diario +
          res.total_carboidratos_diario +
          res.total_gorduras_diario +
          res.total_fibras_diario +
          res.total_sodio_diario
        ).toFixed(2));
        this.proteinaEmPercent = Number(((res.total_proteinas_diario)/Number(this.total)*100).toFixed(2)) | 0;
        this.carboidratoEmPercent = Number(((res.total_carboidratos_diario)/Number(this.total)*100).toFixed(2)) | 0;
        this.gorduraEmPercent = Number((Number(res.total_gorduras_diario)/Number(this.total)*100).toFixed(2)) | 0;
        this.fibraEmPercent = Number((Number(res.total_fibras_diario)/Number(this.total)*100).toFixed(2)) | 0;
        this.sodioEmPercent = Number((Number(res.total_sodio_diario)/Number(this.total)*100).toFixed(2)) | 0;
      },
      error: (err) => {
        this.erro;
        console.error(err);
      }
    })
  }
}
