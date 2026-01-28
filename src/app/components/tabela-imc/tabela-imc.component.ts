import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tabela-imc',
  templateUrl: './tabela-imc.component.html',
  styleUrls: ['./tabela-imc.component.scss']
})
export class TabelaImcComponent {

  constructor(
    private dialogRef:MatDialogRef<TabelaImcComponent>
  ){}
  
  fechar():void{
    this.dialogRef.close();
  }
}
