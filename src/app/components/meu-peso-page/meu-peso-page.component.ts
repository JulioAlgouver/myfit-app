import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PesagemService } from '../../services/pesagem.service';

@Component({
  selector: 'app-meu-peso-page',
  templateUrl: './meu-peso-page.component.html',
  styleUrl: './meu-peso-page.component.scss'
})
export class MeuPesoPageComponent implements OnInit{
  usuario: any;
  pesagem: any;

  constructor(
    private userService: UserService,
    private pesagemService: PesagemService
  ){}

  ngOnInit():void{
    this.userService.getUsuarioLogado().subscribe({
      next: res => this.usuario = res,
      error: err => console.error('Erro ao carregar informações do usuário', err)
    });

    this.pesagemService.pegarDataHoraUltimaPesagem().subscribe({
      next: res => this.pesagem = res,
      error: err => console.error('Erro ao consultar a pesagem do usuario')
    })
  }
}
