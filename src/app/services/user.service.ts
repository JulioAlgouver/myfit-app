import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sexo } from '../enum/sexo.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  cadastrarUsuario(
    nome: string,
    email: string,
    senha: string,
    cpf: string,
    sexo: Sexo,
    telefone: string,
    dataNascimento: Date,
    pesoAtual:number,
  ) {
    return this.http.post(`${this.apiUrl}/usuarios`, {
      nome,
      email,
      senha,
      cpf,
      sexo,
      telefone,
      dataNascimento,
      pesoAtual,
    });
  }

  atualizarPeso(
    pesoAtual: Number,
    id:string
  ){
    return this.http.put(`${this.apiUrl}/usuarios/${id}`,{
      pesoAtual
    });
  }

  atualizarMedida(
    alturaAtual:Number,
    bracoAtual:Number,
    quadrilAtual:Number,
    cinturaAtual:Number,
    coxaAtual:Number,
    umbigoAtual:Number,
    id:string
  ){
    return this.http.put(`${this.apiUrl}/usuarios/${id}`,{
      alturaAtual,
      bracoAtual,
      quadrilAtual,
      cinturaAtual,
      coxaAtual,
      umbigoAtual,
    });
  }

  loginUsuario(cpf: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { cpf, senha });
  }

  // 🔐 Usuário logado (usa o ID salvo no login)
  getUsuarioLogado(): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.get(`${this.apiUrl}/usuarios/${userId}`);
  }

  // 🔎 Caso precise buscar outro usuário por ID
  filtrarPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuarios/${id}`);
  }



  // Mostrar tela de alteração de Senha do usuario

  private showChangePassword = new BehaviorSubject<boolean>(false);
  showChangePassword$ = this.showChangePassword.asObservable();

  showChangePasswordScreen(){
    this.showChangePassword.next(true);
  }

  closeChangePasswordScreen(){
    this.showChangePassword.next(false);
  }
}