import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss'
})
export class SignUpPageComponent {
  signUpForm!: FormGroup;
  erro: string = '';
  successful: string = '';

    constructor(
      private fb: FormBuilder,
      private userService: UserService,
      private router: Router
    ){
      this.signUpForm = this.fb.group({
        nome:['Julio', Validators.required],
        email:['julioalgouver@gmail.com', Validators.required],
        cpf: ['08180912906', Validators.required],
        telefone:['41999315480', Validators.required],
        dataNascimento: ['11/07/1992', Validators.required],
        senha:['123456', Validators.required],
        sexo:['1', Validators.required],
        termAccepted:[true, Validators.requiredTrue],
      })
    }

  backLoginScreen() {

    this.router.navigate(['/'])
  }

  signUpUser() {
    if(this.signUpForm.invalid){
      return
    }

    const {
        nome,
        email,
        senha,
        cpf,
        sexo,
        telefone,
        dataNascimento      
    } = this.signUpForm.value;

    this.userService.cadastrarUsuario(nome,email,senha,cpf,sexo,telefone,dataNascimento).subscribe({
      next: (response) =>{
        console.log('Cadastro realizado', response);
        this.successful = 'Usuário cadastrado com sucesso!'

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);

      },
      error: (err)=>{
        if(err.status === 409||500){
          console.log('Erro ao cadastrar usuário. Usuário já foi cadastrado anteriormente!', err);
          this.erro = 'Erro ao cadastrar usuário. Usuário já foi cadastrado anteriormente!'
        }else{
          console.log('Erro ao cadastrar usuário', err);
          this.erro = err.error?.message || 'Erro ao cadastrar usuário'
        }
      }
    })
  }
}
