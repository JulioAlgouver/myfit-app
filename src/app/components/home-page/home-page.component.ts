import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HidratacaoService, ValorDiarioResponse } from '../../services/hidratacao.service';
import { RefeicaoService, ValorRefeicaoDiariResponse } from '../../services/refeicao.service';
import { number } from 'echarts';
import { AtualizaMetaDialogComponent } from '../atualiza-meta-dialog/atualiza-meta-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{
  public aguaConsumida: Number = 0;
  public caloriaConsumida: Number = 0;
  public proteinaConsumida: Number = 0;
  public carboidratoConsumido: Number = 0;
  public gorduraConsumida: Number = 0;
  public fibraConsumida: Number = 0;
  public pesoAtual: number = 0;
  public pesoMeta:number = 0;
  public progresso: number = 0;
  
  erro: string = 'Erro ao carregar valor diario';
  successful: string = '';

  constructor(
    private dialog: MatDialog,
    private userService:UserService,
    private hidratacaoService:HidratacaoService,
    private refeicaoService:RefeicaoService
  ){}

  ngOnInit(){
    this.updateMeta();
    this.carregarPesoAtual();
    this.carregarValorDiario();
  }

  updateMeta(){
    const usuario = localStorage.getItem('usuario');
    const idUsuario = usuario ? JSON.parse(usuario).id : null;

    this.userService.getAlturaPeso(idUsuario).subscribe({
      next:(response)=>{
        this.pesoAtual = response.peso_atual
      },
      error:(err)=>{
        console.error('Erro ao buscar registros')
        return err
      }
    })

    this.userService.consultaMetaPeso(idUsuario).subscribe({
      next:(response)=>{
        this.pesoMeta = Number(response.peso_meta || 0);
        
        this.calcularQuantoFalta();
      },
      error:(err)=>{
        console.log('Erro ao consultar registros');
      }
    })
  }

  calcularQuantoFalta(){
     this.progresso = this.pesoAtual - this.pesoMeta;
  }

  mostrarTelaAtualizaMeta(): void {
      const dialogRef = this.dialog.open(AtualizaMetaDialogComponent, {
        panelClass: 'change-password-dialog',
        width: '80vw',
        maxWidth: '400px',
        disableClose: false,
        autoFocus: true,
        restoreFocus: true
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog result:', result);
      });
    }

  carregarPesoAtual(){
    const usuario = localStorage.getItem('usuario');
    const idUsuario = usuario ? JSON.parse(usuario).id : null;

    if(!usuario){
      this.erro = 'Usuario não encontrado'
    }

    this.userService.getAlturaPeso(idUsuario).subscribe({
      next: (response) => {
          this.pesoAtual = Number(response.peso_atual || 0)
        console.log(response);
      },
      error:(erro) => {
        return this.erro = 'Erro ao consultar registro';
      }
    })
  }

  carregarValorDiario() {
    const usuario = localStorage.getItem('usuario');
    const idUsuario = usuario ? JSON.parse(usuario).id : null;

    if (!idUsuario) {
      this.erro = 'Usuário não encontrado';
      return;
    }

    // Refeição
    this.refeicaoService.pegarValorTotalDiario(idUsuario).subscribe({
      next: (res: ValorRefeicaoDiariResponse) => {
        this.caloriaConsumida = Number((res.total_calorias_diario || 0).toFixed(0));
        this.proteinaConsumida = Number((res.total_proteinas_diario || 0).toFixed(2));
        this.carboidratoConsumido = Number((res.total_carboidratos_diario || 0).toFixed(2));
        this.gorduraConsumida = Number((res.total_gorduras_diario || 0).toFixed(2));
        this.fibraConsumida = Number((res.total_fibras_diario || 0).toFixed(2));
      },
      error: (err) => {
        this.erro = 'Erro ao carregar valores de refeição';
        console.error(err);
      }
    });

    // Hidratação
    this.hidratacaoService.pegarValorTotalDiario().subscribe({
      next: (res: ValorDiarioResponse) => {
        this.aguaConsumida = Number(res.valor_diario || 0) / 1000; // ml -> L
      },
      error: (err) => {
        this.erro = 'Erro ao carregar valores de hidratação';
        console.error(err);
      }
    });
  }
}
