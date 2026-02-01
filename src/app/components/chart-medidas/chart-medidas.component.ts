import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CategoryScale, Chart, Filler, LinearScale, LineController, LineElement, PointElement, Title } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler);

@Component({
  selector: 'app-chart-medidas',
  standalone: true,
  templateUrl: './chart-medidas.component.html',
  styleUrl: './chart-medidas.component.scss'
})
export class ChartMedidasComponent implements AfterViewInit{
  @ViewChild('chartMedidas') elemento!: ElementRef<HTMLCanvasElement>;
  
  ngAfterViewInit(): void {
    const ctx = this.elemento.nativeElement.getContext('2d');

    if(!ctx){
      console.error('Contexto 2D não disponível');
      return;
    }
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar'],
        datasets: [{
          label: 'Medidas',
          data: [30, 45, 26],
          borderColor: 'white',
          backgroundColor: 'green',
          fill:true
        },
        {
          label: 'Medidas',
          data: [12, 63, 55],
          borderColor: 'white',
          backgroundColor: 'lightblue',
          fill:true
        },
        {
          label: 'Medidas',
          data: [55, 23, 44],
          borderColor: 'white',
          backgroundColor: 'red',
          fill:true
        },
        {
          label: 'Medidas',
          data: [46, 35, 21],
          borderColor: 'white',
          backgroundColor: 'orange',
          fill:true
        },
        {
          label: 'Medidas',
          data: [37, 44, 62],
          borderColor: 'white',
          backgroundColor: 'yellow',
          fill:true
        },
      ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }
}