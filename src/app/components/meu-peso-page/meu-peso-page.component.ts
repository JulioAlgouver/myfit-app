import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PesagemService } from '../../services/pesagem.service';
import { IUser } from '../../interface/user.interface';

@Component({
  selector: 'app-meu-peso-page',
  templateUrl: './meu-peso-page.component.html',
  styleUrls: ['./meu-peso-page.component.scss']
})
export class MeuPesoPageComponent implements OnInit {

  usuario!: IUser;
  pesagem: any;

  constructor(
    private userService: UserService,
    private pesagemService: PesagemService
  ) {}

  ngOnInit(): void {
    const usuarioStorage = localStorage.getItem('usuario');
    if (!usuarioStorage) {
      console.error('Usuário não encontrado no storage');
      return;
    }

    const usuarioLocal = JSON.parse(usuarioStorage);
    const idUsuario = usuarioLocal.id;

    // 1️⃣ Buscar usuário atualizado do backend
    this.userService.filtrarPorId(idUsuario).subscribe({
      next: res => {
        // Mapear snake_case para camelCase
        this.usuario = {
          ...res,
          pesoAtual: res.peso_atual | 0,
          quadrilAtual: res.quadril_atual | 0,
          umbigoAtual: res.umbigo_atual | 0,
          cinturaAtual: res.cintura_atual | 0,
          bracoAtual: res.braco_atual | 0,
          coxaAtual: res.coxa_atual | 0,
          alturaAtual: res.altura_atual | 0,
          agua: res.agua | 0
        };
      },
      error: err => console.error('Erro ao buscar usuário', err)
    });

    // 2️⃣ Buscar última pesagem do usuário
    this.pesagemService.pegarDataHoraUltimaPesagem(idUsuario).subscribe({
      next: res => {
        // O backend retorna { data_hora_pesagem: '...' }
        this.pesagem = res;
      },
      error: err => console.error('Erro ao buscar última pesagem', err)
    });
  }
}
