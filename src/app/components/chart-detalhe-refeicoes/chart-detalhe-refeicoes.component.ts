import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ArcElement, Chart, DoughnutController, Legend, Tooltip } from 'chart.js';
import { RefeicaoService, ValorRefeicaoDiariResponse } from '../../services/refeicao.service';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-chart-detalhe-refeicoes',
  templateUrl: './chart-detalhe-refeicoes.component.html',
  styleUrl: './chart-detalhe-refeicoes.component.scss'
})
export class ChartDetalheRefeicoesComponent implements OnInit{

  public total: Number = 0;

  public proteinaEmPercent: Number = 0;
  public carboidratoEmPercent: Number = 0;
  public gorduraEmPercent: Number = 0;
  public fibraEmPercent: Number = 0;
  public sodioEmPercent: Number = 0;

  erro: string = 'Erro ao carregar valor diario';
  successful: string = '';

  constructor(
    private refeicaoService:RefeicaoService
  ){}

  ngOnInit(): void {
    this.pegarValorEmPercent()  
  }

  criarGraficoDonut(){
    new Chart('chartRefeicoes', {
      type: 'doughnut',
      data: {
        labels: [ 'Proteinas', 'Carboidratos', 'Gordura', 'Fibra', 'Sódio' ],
        datasets: [{
          label: 'Minha Refeição',
          data: [ 
            Number(this.proteinaEmPercent), 
            Number(this.carboidratoEmPercent), 
            Number(this.gorduraEmPercent), 
            Number(this.fibraEmPercent), 
            Number(this.sodioEmPercent) 
          ],
          backgroundColor: [
            '#30f0f7',
            '#035b43',
            '#6cbeee',
            '#d4e1e2',
            '#99a9af'
          ],
          borderWidth: 0,
          hoverOffset: 10,
          borderColor: 'whitesmoke',
        }]
      },
      options: {
        responsive: true,
        cutout: '70%',
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })
  }

  pegarValorEmPercent(){
    const usuario = localStorage.getItem('usuario');
    const idUsuario = usuario ? JSON.parse(usuario).id : null;

    if(!idUsuario){
      this.erro = 'Usuario não encontrado';
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
        this.proteinaEmPercent = Number(((res.total_proteinas_diario)/Number(this.total)).toFixed(2));
        this.carboidratoEmPercent = Number(((res.total_carboidratos_diario)/Number(this.total)).toFixed(2));
        this.gorduraEmPercent = Number((Number(res.total_gorduras_diario)/Number(this.total)).toFixed(2));
        this.fibraEmPercent = Number((Number(res.total_fibras_diario)/Number(this.total)).toFixed(2));
        this.sodioEmPercent = Number((Number(res.total_sodio_diario)/Number(this.total)).toFixed(2));
      
        this.criarGraficoDonut();
      },
      error: (err) => {
        this.erro;
        console.log(err);
      }
    })
  }
}