import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-imc-bar-progress',
  templateUrl: './imc-bar-progress.component.html',
  styleUrl: './imc-bar-progress.component.scss'
})
export class ImcBarProgressComponent implements OnInit{
  
  value = 30;
  progress = 50;
  color = 'black';
  legenda = '';

  ngOnInit(){
    this.progressBar();
  }

  public progressBar(){
    if(this.value <= 18.5){
      this.color = 'rgb(127, 209, 232)'
      this.progress = 16;
      this.legenda = 'Cuidado! Você está abaixo do peso.';
    }else if(this.value >= 18.5 && this.value <= 24.9){
      this.color = 'rgb(127, 232, 155)'
      this.progress = 32;
      this.legenda = 'Parabéns! Você está na faixa de peso ideal.';
    }else if(this.value >= 25 && this.value <= 29.9){
      this.color = 'rgb(255, 224, 110)'
      this.progress = 48;
      this.legenda = 'Cuidado! Você está com sobrepeso.';
    }else if(this.value >= 30 && this.value <= 34.9){
      this.color = 'rgb(255, 123, 52)'
      this.progress = 64;
      this.legenda = 'Cuidado! Você entrou em Obesidade Grau I.';
    }else if(this.value >= 35 && this.value <= 39.9){
      this.color = 'rgb(255, 106, 106)'
      this.progress = 80;
      this.legenda = 'Cuidado! Você entrou em Obesidade Grau II';
    }else if(this.value >= 40){
      this.color = 'rgb(192, 64, 64)'
      this.progress = 100;
      this.legenda = 'Cuidado! Você entrou em Obesidade Grau III';
    }
  }
}