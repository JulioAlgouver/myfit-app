import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interface/user.interface';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
usuario: IUser | null = null;
isBrowser = false;

constructor( 
  @Inject(PLATFORM_ID) private platformId: Object,
  private userService:UserService
){
  this.isBrowser = isPlatformBrowser(this.platformId);
}

  ngOnInit(){
    if(this.isBrowser){
      this.userService.getUsuarioLogado().subscribe({
        next: (res:IUser | null) =>{
          this.usuario = res;
        },
        error:(err)=>{
          console.error('Erro ao carregar usuário',err);
        }
      });;
    }
  }
}
