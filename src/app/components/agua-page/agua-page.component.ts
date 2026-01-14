import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { HidratacaoService, ValorDiarioResponse } from '../../services/hidratacao.service';

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
    // Inicializa o formulário
    this.form = this.fb.group({
      quantidade: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarValorDiario(); // Carrega o valor diário ao abrir a página
  }

  // Calcula o percentual da barra de progresso
  calcularPercentualAtingido(): void {
    this.percentualAtingido = (this.aguaConsumida / this.meta) * 100;
  }

  // Busca o valor diário atual do usuário
  carregarValorDiario(): void {
    const idUsuario = localStorage.getItem('userId');
    if (!idUsuario) {
      this.erro = 'Usuário não encontrado';
      return;
    }

    this.hidratacaoService.pegarValorTotalDiario(idUsuario).subscribe({
      next: (res: ValorDiarioResponse) => {
        this.aguaConsumida = Number(res.valor_diario);
        this.calcularPercentualAtingido();
      },
      error: (err) => {
        this.erro = 'Erro ao carregar valor diário';
        console.error(err);
      }
    });
  }

  // Executa quando o usuário clica em "Beber Água"
  beberAgua(): void {
    const valorSelecionado = Number(this.form.value.quantidade);

    if (isNaN(valorSelecionado) || valorSelecionado <= 0) {
      this.erro = 'Informe uma quantidade válida';
      return;
    }

    const idUsuario = localStorage.getItem('userId');
    if (!idUsuario) {
      this.erro = 'Usuário não encontrado';
      return;
    }

    // Pega o valor diário atual e soma a quantidade escolhida
    this.hidratacaoService.pegarValorTotalDiario(idUsuario).subscribe({
      next: (res: ValorDiarioResponse) => {
        this.aguaConsumida = Number(res.valor_diario) + valorSelecionado;
        this.calcularPercentualAtingido();

        this.registrarHidratacao();
        this.form.reset();
      },
      error: (err) => {
        this.erro = 'Erro ao buscar valor diário';
        console.error(err);
      }
    });
  }

  // Registra a ingestão no backend e atualiza o usuário
  registrarHidratacao(): void {
    const quantidade = Number(this.form.value.quantidade);
    const idUsuario = localStorage.getItem('userId');
    if (!idUsuario) {
      this.erro = 'Usuário não encontrado';
      return;
    }

    // Registro na tabela de hidratação
    this.hidratacaoService.registrarHidratacao(quantidade, idUsuario).subscribe({
      next: () => {
        this.successful = 'Registro realizado com sucesso!';
      },
      error: () => {
        this.erro = 'Erro ao registrar';
        console.log('Payload enviado:', { quantidade, idUsuario });
      }
    });

    // Atualiza a água no usuário
    this.userService.atualizarAgua(quantidade, idUsuario).subscribe({
      next: () => {
        this.successful = 'Água atualizada';
      }
    });
  }
}
