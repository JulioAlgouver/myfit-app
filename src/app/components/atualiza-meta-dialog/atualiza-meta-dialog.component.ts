import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { number } from 'echarts';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atualiza-meta-dialog',
  templateUrl: './atualiza-meta-dialog.component.html',
  styleUrl: './atualiza-meta-dialog.component.scss'
})
export class AtualizaMetaDialogComponent {

  form!: FormGroup;

  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private router:Router
  ){
    this.form = this.fb.group({
     meta : ['',Validators.required]
    })
  }

  atualizaMeta(){ 
    const usuario = localStorage.getItem('usuario');
    const idUsuario = usuario ? JSON.parse(usuario).id : null;
    const meta:number = this.form.value.meta;

    this.userService.atualizaMetaPeso(meta, idUsuario).subscribe({
      next:()=>{
        console.log('Registro atualizado');
        this.router.navigate(['/home']);
      },
      error:(err)=>{
        console.log('Erro:',err);
        return err;
      }
    });
  }
}
