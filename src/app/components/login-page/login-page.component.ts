import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginForm: FormGroup;
  erro: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      senha: ['', [Validators.required]]
    });
  }

  authUser() {
    if (this.loginForm.invalid) {
      return;
    }

    const { cpf, senha } = this.loginForm.value;

    this.userService.loginUsuario(cpf, senha).subscribe({
      next: (res) => {
        console.log('Login bem-sucedido:', res);
        // Redireciona para home
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log('Erro no login:', err);
        this.erro = err.error?.message || 'CPF ou senha inválidos';
      }
    });
  }
}
