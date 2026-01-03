import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  usuario: any;

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.getUsuarioLogado().subscribe({
      next: res => this.usuario = res,
      error: err => console.error('Erro ao carregar usuário', err)
    });
  }

  showPasswordScreen(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      panelClass: 'change-password-dialog',
      width: '80vw',
      maxWidth: '400px',
      disableClose: false,
      autoFocus: true,
      restoreFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
    });
  }
}
