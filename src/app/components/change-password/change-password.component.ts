import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {

  form!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private userService: UserService
  ) {
    this.form = this.fb.group(
      {
        senhaAtual: ['', Validators.required],
        novaSenha: ['', Validators.required],
      },
      {
        validators: this.confirmaSenhaNova
      }
    );
  }

  ngOnInit() {}

  confirmaSenhaNova(group: AbstractControl): ValidationErrors | null {
    const senhaNova = group.get('novaSenha')?.value;
    const confirmaNovaSenha = group.get('confirmaNovaSenha')?.value;

    if (!senhaNova || !confirmaNovaSenha) {
      return null;
    }

    return senhaNova === confirmaNovaSenha
      ? null
      : { textosDiferentes: true };
  }

  atualizaSenhaUsuario() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.userService
      .atualizarSenha(this.form.value.senhaAtual, this.form.value.novaSenha)
      .subscribe({
        next: () => console.log('Senha atualizada com sucesso'),
        error: () => console.error('Erro ao atualizar senha')
      });
  }
}
