import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PasswordService } from '../../services/password.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  usuario: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsuarioLogado().subscribe({
      next: (res) => {
        this.usuario = res;
      },
      error: (err) => {
        console.error('Erro ao carregar usuário', err);
      }
    });
  }

  showPasswordScreen(){
    this.userService.showChangePasswordScreen();
  }
}
