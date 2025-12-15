import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
usuario: any;

constructor( private userService:UserService){}

  ngOnInit(): void {
      this.userService.getUsuarioLogado().subscribe({
        next: (res) =>{
          this.usuario = res;
        },
        error:(err)=>{
          console.error('Erro ao carregar usuário',err);
        }
      });
  }
}
