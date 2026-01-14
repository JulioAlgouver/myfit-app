import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { HidratacaoService } from '../../services/hidratacao.service';

@Component({
  selector: 'app-agua-page',
  templateUrl: './agua-page.component.html',
  styleUrl: './agua-page.component.scss'
})
export class AguaPageComponent {
  public meta: number = 3000;
  public aguaConsumida: number = 1200;
  public percentualAtingido: number = 0;


  form!:FormGroup;
  erro: string = '';
  successful: string = '';

  constructor(
    private fb: FormBuilder,
    private userService:UserService,
    private hidratacaoService:HidratacaoService
    
  ){
    this.form = this.fb.group({
      quantidade:['',Validators.required]
    })

    this.calcularPercentualAtingido();
  }

  public calcularPercentualAtingido(){
    this.percentualAtingido = (this.aguaConsumida/this.meta)*100;
  }

  beberAgua(){
    const valorSelecionado = this.form.value.quantidade;
    this.aguaConsumida += Number(valorSelecionado);
    this.calcularPercentualAtingido();

    this.registrarHidratacao();
  }

  registrarHidratacao(){
    const idUsuario = localStorage.getItem('userId');
    const quantidade = Number(this.form.value.quantidade);

    if(this.form.invalid){
      return
    }

    if(!idUsuario){
      this.erro = ('Usuario não encontrado');
      return
    }

    this.hidratacaoService.registrarHidratacao(quantidade,idUsuario).subscribe({
      next: () => {
        this.successful = 'Registro realizado com sucesso!'
      },
      error: () => {
        this.erro = 'Erro ao registrar';

        console.log('Payload Enviado:' ,{
          quantidade,
          idUsuario
        })
      }
    })

    this.userService.atualizarAgua(quantidade,idUsuario).subscribe({
      next: () => {
        this.successful = 'Agua atualizada'
      }
    })
  }
}
