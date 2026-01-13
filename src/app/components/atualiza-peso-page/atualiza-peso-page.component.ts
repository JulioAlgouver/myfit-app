import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PesagemService } from '../../services/pesagem.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-atualiza-peso-page',
  templateUrl: './atualiza-peso-page.component.html',
  styleUrl: './atualiza-peso-page.component.scss'
})
export class AtualizaPesoPageComponent {

  atualizarPesoForm!:FormGroup;
  erro: string = '';
  successful: string = '';

  constructor(
    public fb: FormBuilder,
    private pesagemService:PesagemService,
    private userService:UserService,
    private router: Router
  ){
    this.atualizarPesoForm = this.fb.group({
      pesoAtual:['', Validators.required]
    })
  }

  registraPesagem():void{
    if(this.atualizarPesoForm.invalid){
      return
    }

    const pesoAtual = Number(this.atualizarPesoForm.value.pesoAtual);
    const idUser = (localStorage.getItem('userId'));

    if (!idUser) {
      this.erro = 'Usuário não encontrado';
      return
    }

    this.userService.atualizarPeso(pesoAtual,idUser).subscribe({
      next: () => {
        this.successful = 'Peso atualizado no cadastro';
      },
      error: () =>{
        this.erro = 'Erro ao atualizar o peso no cadastro';

        console.log('Payload enviado:',{
          pesoAtual
        })
      }
    })

    this.pesagemService.registrarPesagem(pesoAtual,idUser).subscribe({
      next: () => {
        this.successful = 'Peso registrado com sucesso!';
        setTimeout(() => {
          this.router.navigate(['/meu-peso']);
        },1500);
      },
      error: () => {
        this.erro = 'Erro ao registrar pesagem';

        console.log('Payload enviado:', {
          pesoAtual,
          idUser
        });
      }
    });
  }
}
