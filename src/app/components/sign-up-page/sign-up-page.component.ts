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

  }
}
