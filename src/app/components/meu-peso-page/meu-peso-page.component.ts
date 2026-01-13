import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-meu-peso-page',
  templateUrl: './meu-peso-page.component.html',
  styleUrl: './meu-peso-page.component.scss'
})
export class MeuPesoPageComponent implements OnInit{
  usuario: any;

  constructor(
    private userService: UserService
  ){}

  ngOnInit():void{
    this.userService.getUsuarioLogado().subscribe({
      next: res => this.usuario = res,
      error: err => console.error('Erro ao carregar informações do usuário', err)
    });
  }
}
