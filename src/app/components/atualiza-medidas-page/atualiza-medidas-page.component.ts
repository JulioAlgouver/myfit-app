import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MedidaService } from '../../services/medida.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-atualiza-medidas-page',
  templateUrl: './atualiza-medidas-page.component.html',
  styleUrl: './atualiza-medidas-page.component.scss'
})
export class AtualizaMedidasPageComponent {
  formMedidas!:FormGroup;
  erro: string = '';
  successful: string = '';

  constructor(
    public fb:FormBuilder,
    private userService:UserService,
    private medidasService:MedidaService,
    private router:Router
  ){
    this.formMedidas = this.fb.group({
      quadril:['', Validators.required],
      umbigo:['',Validators.required],
      cintura:['',Validators.required],
      braco:['',Validators.required],
      coxa:['',Validators.required],
      altura:['',Validators.required]
    })
  }

  registrarMedidas():void{
    if(this.formMedidas.invalid){
      return
    }

    const quadril =  Number(this.formMedidas.value.quadril);
    const umbigo =  Number(this.formMedidas.value.umbigo);
    const cintura =  Number(this.formMedidas.value.cintura);
    const braco =  Number(this.formMedidas.value.braco);
    const coxa =  Number(this.formMedidas.value.coxa);
    const altura =  Number(this.formMedidas.value.altura);
    const idUser = localStorage.getItem('userId');

    if(!idUser){
      this.erro = ('Usuario não encontrado');
      return
    }

    this.medidasService.registraMedida(quadril,umbigo,cintura,braco,coxa,altura,idUser).subscribe({
      next: () => {
        this.successful = 'Medidas registradas com sucesso!';
        setTimeout(() => {
          this.router.navigate(['/meu-peso']);
        }, 1500);
      },
      error: () => {
        this.erro = 'Erro ao registrar medidas';

        console.log('Payload enviado:',{
          quadril,
          umbigo,
          cintura,
          braco,
          coxa,
          altura,
          idUser
        });
      }
    });

    this.userService.atualizarMedida(quadril,umbigo,cintura,braco,coxa,altura,idUser).subscribe({
      next: () => {
        this.successful = 'Medidas atualizadas '
      }
    })
  }
}
