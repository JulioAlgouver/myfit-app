import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler);

@Component({
  selector: 'app-chart-peso',
  standalone: true,
  templateUrl: './chart-peso.component.html',
  styleUrls: ['./chart-peso.component.scss']
})
export class ChartPesoComponent implements AfterViewInit {
  @ViewChild('chartPeso') elemento!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    const ctx = this.elemento.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Contexto 2D não disponível');
      return;
    }
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{
          label: 'Peso',
          data: [90, 60, 55, 40, 60, 98],
          borderColor: 'blue',
          backgroundColor: 'rgba(173, 216, 230, 0.5)',
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins:{
          legend:{
            display: false
          }
        }
      }
    });
  }
}