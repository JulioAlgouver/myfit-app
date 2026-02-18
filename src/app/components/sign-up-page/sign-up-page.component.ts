import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TermoComponent } from '../termo/termo.component';
import { MatDialog } from '@angular/material/dialog';

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
      private router: Router,
      private dialog: MatDialog
    ){
      this.signUpForm = this.fb.group({
        nome:['', Validators.required],
        email:['', Validators.required],
        cpf: ['', Validators.required],
        telefone:['', Validators.required],
        dataNascimento: ['', Validators.required],
        senha:['', Validators.required],
        sexo:['', Validators.required],
        termAccepted:[false, Validators.requiredTrue],
        pesoAtual:['']
      })
    }

  backLoginScreen() {

    this.router.navigate(['/'])
  }

  showTermoScreen(): void {
      const dialogRef = this.dialog.open(TermoComponent, {
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
        dataNascimento,
        pesoAtual     
    } = this.signUpForm.value;

    this.userService.cadastrarUsuario(nome,email,senha,cpf,sexo,telefone,dataNascimento,pesoAtual).subscribe({
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
