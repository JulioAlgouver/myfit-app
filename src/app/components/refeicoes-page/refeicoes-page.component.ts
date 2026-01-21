import { Component, OnInit } from '@angular/core';
import { IAlimento } from '../../interface/alimento.interface';
import { AlimentoService } from '../../services/alimento.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  successful: string = 'Registrado com sucesso!';
  error: string = 'Erro ao registrar refeição!';

  constructor(
    private fb:FormBuilder,
    private alimentoService: AlimentoService,
    private userService:UserService,
    private refeicaoService:RefeicaoService
  ){}

  ngOnInit():void {
    this.form=this.fb.group({
      alimento:['', Validators.required],
      quantidade:['',Validators.required],
      tipo_refeicao:['', Validators.required]
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

  private toNumber(valor:any) : number {
    if(typeof valor === 'string'){
      return Number(valor.replace(',','.'));
    }
    return Number(valor);
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
      id_usuario : String(localStorage.getItem('userId')),
      id_alimento : this.alimentoSelecionado.id_alimento,
      descricao : String(this.alimentoSelecionado.descricao),
      tipo_refeicao : String(this.form.value.tipo_refeicao),
      categoria : String(this.alimentoSelecionado.categoria),
      quantidade : this.toNumber(this.form.value.quantidade),
      total_calorias : this.toNumber(this.alimentoSelecionado.caloria)/100*this.form.value.quantidade,
      total_proteinas : this.toNumber(this.alimentoSelecionado.proteina)/100*this.form.value.quantidade,
      total_sodio : this.toNumber(this.alimentoSelecionado.sodio)/100*this.form.value.quantidade,
      total_fibras : this.toNumber(this.alimentoSelecionado.fibra)/100*this.form.value.quantidade,
      total_gorduras : this.toNumber(this.alimentoSelecionado.lipideo)/100*this.form.value.quantidade,
      total_carboidratos : this.toNumber(this.alimentoSelecionado.carboidrato)/100*this.form.value.quantidade,    
    }

    this.refeicaoService.registrarRefeicao(
      dados.id_usuario, 
      dados.id_alimento,
      dados.descricao,
      dados.tipo_refeicao,
      dados.categoria,
      dados.quantidade,
      dados.total_calorias,
      dados.total_proteinas,
      dados.total_sodio,
      dados.total_fibras,
      dados.total_gorduras,
      dados.total_carboidratos,
    ).subscribe({
      next: () =>{
        console.log(this.successful);
      },
      error: () =>{
        console.log(this.error);

        console.log('Dados:', dados);
      }
    })

    this.form.reset();
  }
}
