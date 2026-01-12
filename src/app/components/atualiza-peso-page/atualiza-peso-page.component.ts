import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PesagemService } from '../../services/pesagem.service';

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

    this.pesagemService.registrarPesagem(pesoAtual,idUser).subscribe({
      next: () => {
        this.successful = 'Peso registrado com sucesso!';
        setTimeout(() => {
          this.router.navigate(['/meu-peso']);
        },2000);
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
