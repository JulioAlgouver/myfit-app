import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CategoryScale, Chart, Filler, LinearScale, LineController, LineElement, PointElement, Title } from 'chart.js';
import { MedidaService } from '../../services/medida.service';
import { IMedidasResponse } from '../../interface/medidas-response.interface';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler);

@Component({
  selector: 'app-chart-medidas',
  standalone: true,
  templateUrl: './chart-medidas.component.html',
  styleUrl: './chart-medidas.component.scss'
})
export class ChartMedidasComponent implements AfterViewInit{
  @ViewChild('chartMedidas') elemento!: ElementRef<HTMLCanvasElement>;
  
  constructor(
    private medidasService:MedidaService
  ){}

  ngAfterViewInit(): void {
    this.buscarDados();
  }

  //BUSCAR OS DADOS
  buscarDados(){
    const usuario = localStorage.getItem('usuario')
    const idUsuario = usuario ? JSON.parse(usuario).id : null;

    this.medidasService.consultaMedidaPorUsuario(idUsuario).subscribe({
      next:(res:IMedidasResponse[])=>{
        const dados_coxa = res.map(item => item.coxa);
        const dados_braco = res.map(item => item.braco);
        const dados_cintura = res.map(item => item.cintura);
        const dados_umbigo = res.map(item => item.umbigo);
        const dados_quadril = res.map(item => item.quadril);

        this.criarGrafico(dados_coxa,dados_braco,dados_cintura,dados_umbigo,dados_quadril);
      },
      error:(err)=>{
        console.error('Erro ao consultar registro');
        return err;
      }
    })
  }

  //CRIAR GRAFICO
    criarGrafico(dados_coxa:Number[],dados_braco:Number[],dados_cintura:Number[],dados_umbigo:Number[],dados_quadril:Number[],){
      const ctx = this.elemento.nativeElement.getContext('2d');

      if(!ctx){
        console.error('Contexto 2D não disponível');
        return;
      }
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['','','','','','','','','','',],
          datasets: [{
            label: 'Quadril',
            data: dados_quadril,
            borderColor: 'green',
            backgroundColor: '#9ed2b085',
            fill:true
          },
          {
            label: 'Umbigo',
            data: dados_umbigo,
            borderColor: 'lightblue',
            backgroundColor: '#96faff85',
            fill:true
          },
          {
            label: 'Cintura',
            data: dados_cintura,
            borderColor: 'red',
            backgroundColor: '#ff515185',
            fill:true
          },
          {
            label: 'Braço',
            data: dados_braco,
            borderColor: 'orange',
            backgroundColor: '#ff400085',
            fill:true
          },
          {
            label: 'Coxa',
            data: dados_coxa,
            borderColor: 'yellow',
            backgroundColor: '#ffe10085',
            fill:true
          },
        ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins:{
            legend:{
              display: false
            }
          }
        },
      });
    }
}