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


    constructor(
      private fb: FormBuilder,
      private userService: UserService,
      private router: Router
    ){
      this.signUpForm = this.fb.group({
        nome:['', Validators.required],
        email:['', Validators.required],
        cpf: ['', Validators.required],
        telefone:['', Validators.required],
        dataNascimento: ['', Validators.required],
        senha:['', Validators.required],
        sexo:[null, Validators.required],
        termAccepted:[false, Validators.requiredTrue],
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
        this.router.navigate(['/']);
      },
      error: (err)=>{
        console.log('Erro ao cadastrar usuário', err);
        this.erro = err.error?.message || 'Erro ao cadastrar usuário'
      }
    })
  }
}
