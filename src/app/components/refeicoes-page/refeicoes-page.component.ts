import { Component, OnInit } from '@angular/core';
import { IAlimento } from '../../interface/alimento.interface';
import { AlimentoService } from '../../services/alimento.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { UserService } from '../../services/user.service';
import { RefeicaoService } from '../../services/refeicao.service';

@Component({
  selector: 'app-refeicoes-page',
  templateUrl: './refeicoes-page.component.html',
  styleUrl: './refeicoes-page.component.scss'
})
export class RefeicoesPageComponent implements OnInit {
  alimentos:IAlimento[] = [];
  filteredAlimentos!:Observable<IAlimento[]>;

  form!:FormGroup;
  alimentoSelecionado!:IAlimento;

  constructor(
    private fb:FormBuilder,
    private alimentoService: AlimentoService,
    private userService:UserService,
    private refeicaoService:RefeicaoService
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

      this.alimentoSelecionado = alimento;
      console.log('Alimento selecionado:', alimento);
  }
  
  public registrarRefeicao():void{
    if(this.form.invalid || !this.alimentoSelecionado){
          console.error('Form inválido ou alimento não selecionado');
      return;
    }
    
    const dados = {
      id_alimento : this.alimentoSelecionado.id_alimento,
      descricao : this.form.value.descricao,
      tipo_refeicao : this.form.value.tipo_refeicao,
      categoria : this.alimentoSelecionado.categoria,
      quantidade : this.form.value.quantidade,
      total_calorias : '',
      total_proteinas : [''],
      total_sodio : [''],
      total_fibras : [''],
      total_gorduras : [''],
      total_carboidratos : [''],    
      id_usuario : localStorage.getItem('userId'),
    }

    console.log('Dados:', dados);
  }
}
