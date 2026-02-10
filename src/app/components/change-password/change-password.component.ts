import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit{
  
  form!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private userService: UserService 
  ){
    this.form = this.fb.group({
      senhaAtual: ['',Validators.required],
      novaSenha: ['',Validators.required]
    })
  }

  ngOnInit() {

  }  

  atualizaSenhaUsuario(){
    this.userService.atualizarSenha(this.form.value.senhaAtual,this.form.value.novaSenha).subscribe({
      next: () => {
        console.log('Senha atualizada com sucesso')
      },
      error: (err) => {
        console.error('Erro ao atualizar senha')
      }
    })

    const usuario = localStorage.getItem('usuario');
    const idUsuario = usuario ? JSON.parse(usuario).id : null;
  }
}