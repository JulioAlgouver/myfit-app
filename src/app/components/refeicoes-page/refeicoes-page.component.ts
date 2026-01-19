import { Component, OnInit } from '@angular/core';
import { IAlimento } from '../../interface/alimento.interface';
import { AlimentoService } from '../../services/alimento.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-refeicoes-page',
  templateUrl: './refeicoes-page.component.html',
  styleUrl: './refeicoes-page.component.scss'
})
export class RefeicoesPageComponent implements OnInit {
  alimentos:IAlimento[] = [];
  filteredAlimentos!:Observable<IAlimento[]>;

  form!:FormGroup;

  constructor(
    private alimentoService: AlimentoService,
    private fb:FormBuilder
  ){}

  ngOnInit():void {
    this.form=this.fb.group({
      alimento:[''],
      quantidade:['']
    });

    this.alimentoService.listarAlimentos().subscribe({
      next: dados => {
        this.alimentos = dados;
      
        this.filteredAlimentos = this.form.get('alimento')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || ''))
        );
      },
      
      error: err => console.error(err)   
    });
  }

  private _filter(value:string): IAlimento[]{
    const filterValue = value.toLowerCase();
    return this.alimentos.filter(alimento => alimento.descricao.toLowerCase().includes(filterValue));
  }


  public onSelectFood(alimento:IAlimento){
      const id = alimento.id_alimento;
      const descricao = alimento.descricao;

      console.log('Selecionado:',{
        id,
        descricao
      });

      this.alimentoService.buscarAlimentoPorId(id).subscribe( res => {
        console.log('Detalhes:', res);
      });
  }
}
