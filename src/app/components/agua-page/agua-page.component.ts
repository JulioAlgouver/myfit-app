import { Component } from '@angular/core';

@Component({
  selector: 'app-agua-page',
  templateUrl: './agua-page.component.html',
  styleUrl: './agua-page.component.scss'
})
export class AguaPageComponent {
  public meta: number = 3000;
  public aguaConsumida: number = 1200;
  public percentualAtingido: number = 0;

  constructor(){
    this.calcularPercentualAtingido();
  }

  public calcularPercentualAtingido(){
    this.percentualAtingido = (this.aguaConsumida/this.meta)*100;
  }

  acrescenta200ml(){
    this.aguaConsumida += 200;
    this.calcularPercentualAtingido();
  }

  acrescenta350ml(){
    this.aguaConsumida += 350;
    this.calcularPercentualAtingido();
  }

  acrescenta600ml(){
    this.aguaConsumida += 600;
    this.calcularPercentualAtingido()
  }

  acrescenta1000ml(){
    this.aguaConsumida += 1000;
    this.calcularPercentualAtingido();
  }

  acrescenta1500ml(){
    this.aguaConsumida += 1500;
    this.calcularPercentualAtingido();
  }

  acrescenta2000ml(){
    this.aguaConsumida += 2000;
    this.calcularPercentualAtingido();
  }
}
