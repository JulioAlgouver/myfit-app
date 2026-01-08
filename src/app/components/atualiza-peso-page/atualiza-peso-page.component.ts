import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-atualiza-peso-page',
  templateUrl: './atualiza-peso-page.component.html',
  styleUrl: './atualiza-peso-page.component.scss'
})
export class AtualizaPesoPageComponent implements OnInit {

  atualizarPesoForm!:FormGroup;

  constructor(public fb: FormBuilder){
    
  }

  ngOnInit(){
    this.atualizarPesoForm = this.fb.group({
      peso:['',Validators.required]
    });
  }
}
