import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interface/user.interface';

@Component({
  selector: 'app-imc-bar-progress',
  templateUrl: './imc-bar-progress.component.html',
  styleUrl: './imc-bar-progress.component.scss'
})
export class ImcBarProgressComponent implements OnInit{
  
  usuario!: any;

  value = 0;
  progress = 50;
  fontColor = 'white'
  color = 'black';
  legenda = '';

  constructor(
    private userService:UserService,
  ){}

  ngOnInit(){
    this.getAlturaPeso();
  }

  public getAlturaPeso(){
    const usuario = localStorage.getItem('usuario');
    const idUsuario = usuario ? JSON.parse(usuario).id : null;

    this.userService.getAlturaPeso(idUsuario).subscribe({
      next: res => {
        this.usuario = res;
        this.calculaIMC();
      },
      error: err => console.error('Erro ao carregar', err)
      })
    }

  public calculaIMC(): number {
    const peso = this.usuario.peso_atual;
    const alturaMetros = this.usuario.altura_atual / 100;

    const valorIMC: number = +(peso / (alturaMetros * alturaMetros)).toFixed(2);
    this.value = valorIMC;

    console.log(this.usuario);
    console.log('IMC: ', valorIMC);

    this.progressBar(valorIMC);

    return valorIMC;
  } 


  public progressBar(valorIMC:number){
    if(valorIMC <= 18.5){
      this.color = 'rgb(112, 175, 193)'
      this.progress = 16;
      this.legenda = 'Cuidado! Você está abaixo do peso.';
    }else if(valorIMC > 18.5 && valorIMC < 25){
      this.color = 'rgb(49, 136, 72)'
      this.progress = 32;
      this.legenda = 'Parabéns! Você está na faixa de peso ideal.';
    }else if(valorIMC >= 25 && valorIMC < 30){
      this.color = 'rgb(168, 134, 0)'
      this.progress = 48;
      this.legenda = 'Atenção! Você está com sobrepeso.';
    }else if(valorIMC >= 30 && valorIMC < 35){
      this.color = 'rgb(255, 123, 52)'
      this.progress = 64;
      this.legenda = 'Cuidado! Você entrou em Obesidade Grau I.';
    }else if(valorIMC >= 35 && valorIMC < 40){
      this.color = 'rgb(255, 106, 106)'
      this.progress = 80;
      this.legenda = 'Cuidado! Você entrou em Obesidade Grau II';
    }else if(valorIMC >= 40){
      this.color = 'rgb(192, 64, 64)'
      this.progress = 100;
      this.legenda = 'Cuidado! Você entrou em Obesidade Grau III';
    }
    this.fontColor = this.color;
  }
}