import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TabelaImcComponent } from '../tabela-imc/tabela-imc.component';

@Component({
  selector: 'app-detalhes-peso-page',
  templateUrl: './detalhes-peso-page.component.html',
  styleUrls: ['./detalhes-peso-page.component.scss']
})
export class DetalhesPesoPageComponent {

  constructor(
    private dialog: MatDialog
  ){}

  showTableIMCScreen():void {
    const dialogRef = this.dialog.open(TabelaImcComponent, {
      panelClass: 'table-imc-dialog',
      width: '90vw',
      maxWidth: '100vw',
      height: '60vh',
      disableClose: false,
      autoFocus: true,
      restoreFocus: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog Result', result);
    });
  }
}
