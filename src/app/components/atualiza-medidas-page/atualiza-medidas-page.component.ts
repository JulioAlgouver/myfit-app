import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-atualiza-medidas-page',
  templateUrl: './atualiza-medidas-page.component.html',
  styleUrl: './atualiza-medidas-page.component.scss'
})
export class AtualizaMedidasPageComponent {
  formMedidas!:FormGroup;

  constructor(public fb:FormBuilder){
    this.formMedidas = this.fb.group({
      quadril:['', Validators.required],
      umbigo:['',Validators.required],
      cintura:['',Validators.required],
      braco:['',Validators.required],
      coxa:['',Validators.required],
      altura:['',Validators.required]
    })
  }
}
