import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HidratacaoService, ValorDiarioResponse } from '../../services/hidratacao.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-agua-page',
  templateUrl: './agua-page.component.html',
  styleUrls: ['./agua-page.component.scss']
})
export class AguaPageComponent implements OnInit {
  public meta: number = 3000;             // Meta diária em ml
  public aguaConsumida: number = 0;       // Quantidade já consumida
  public percentualAtingido: number = 0;  // Percentual para a barra de progresso

  form!: FormGroup;
  erro: string = '';
  successful: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private hidratacaoService: HidratacaoService
  ) {
    this.form = this.fb.group({
      quantidade: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarValorDiario(); // Carrega o valor diário ao abrir a página
  }

  // Calcula o percentual da barra de progresso
  private calcularPercentualAtingido(): void {
    this.percentualAtingido = (this.aguaConsumida / this.meta) * 100;
  }

  // Carrega a quantidade diária consumida
  private carregarValorDiario(): void {
    this.hidratacaoService.pegarValorTotalDiario().subscribe({
      next: (res: ValorDiarioResponse) => {
        this.aguaConsumida = Number(res.valor_diario) || 0; // garante que seja número
        this.calcularPercentualAtingido();
      },
      error: (err) => {
        this.erro = 'Erro ao carregar valor diário';
        console.error(err);
      }
    });
  }

  // Executa ao clicar em "Beber Água"
  beberAgua(): void {
    const quantidade = Number(this.form.value.quantidade);

    if (isNaN(quantidade) || quantidade <= 0) {
      this.erro = 'Informe uma quantidade válida';
      return;
    }

    // Registra a ingestão no backend
    this.hidratacaoService.registrarHidratacao(quantidade).subscribe({
      next: () => {
        this.successful = 'Registro realizado com sucesso!';
        this.form.reset();
        this.carregarValorDiario(); // Atualiza o valor consumido
        // Atualiza a água no usuário
        this.userService.atualizarAgua(quantidade, 'meu-id-ou-token').subscribe({
          next: () => console.log('Água do usuário atualizada')
        });
      },
      error: (err) => {
        this.erro = 'Erro ao registrar hidratação';
        console.error('Erro registrarHidratacao:', err);
      }
    });
  }
}
