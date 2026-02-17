import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler } from 'chart.js';
import { map } from 'rxjs';
import { IPesagemResponse } from '../../interface/pesagem-response.interface';
import { PesagemService } from '../../services/pesagem.service';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler);

@Component({
  selector: 'app-chart-peso',
  standalone: true,
  templateUrl: './chart-peso.component.html',
  styleUrls: ['./chart-peso.component.scss']
})
export class ChartPesoComponent implements AfterViewInit {
  private apiurl = 'http://localhost/3000';

  constructor(
    private http: HttpClient,
    private pesagemService: PesagemService
  ){}

  @ViewChild('chartPeso') elemento!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    this.buscarPesagens();
  }

  //BUSCA OS DADOS NA API
    buscarPesagens(){
      const usuario = localStorage.getItem('usuario')
      const id_usuario = usuario ? JSON.parse(usuario).id : null;

      this.pesagemService.consultarPesagemPorUsuario(id_usuario).subscribe({
        next:(res:IPesagemResponse[]) => {
          const labels = res.map(item => item.data_hora_pesagem);
          const dados = res.map(item => item.peso);

          this.criarGrafico(labels,dados);
        },
        error:(err) => {
          console.error('Erro ao consultar registros');
          return err;
        }
      })
    }

    //MONTA O GRAFICO
    criarGrafico(labels: string[], dados: Number[]){
    const ctx = this.elemento.nativeElement.getContext('2d');
      if (!ctx) {
        console.error('Contexto 2D não disponível');
        return;
      }
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['','','','','','','','','',''],
          datasets: [{
            data: dados,
            label: 'Peso em Kg ',
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