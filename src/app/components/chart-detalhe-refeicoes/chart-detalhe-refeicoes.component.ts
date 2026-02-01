import { AfterViewInit, Component } from '@angular/core';
import { ArcElement, Chart, DoughnutController, Legend, Tooltip } from 'chart.js';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-chart-detalhe-refeicoes',
  templateUrl: './chart-detalhe-refeicoes.component.html',
  styleUrl: './chart-detalhe-refeicoes.component.scss'
})
export class ChartDetalheRefeicoesComponent implements AfterViewInit{

  ngAfterViewInit(): void {
    this.criarGraficoDonut()  
  }

  criarGraficoDonut(){
    new Chart('chartRefeicoes', {
      type: 'doughnut',
      data: {
        labels: [ 'Proteinas', 'Carboidratos', 'Gordura', 'Fibra', 'Sódio' ],
        datasets: [{
          label: 'Minha Refeição',
          data: [ 300, 50, 128, 200, 400 ],
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
        cutout: '60%',
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })
  }
}