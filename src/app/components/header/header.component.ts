import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interface/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
usuario!: IUser;

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
