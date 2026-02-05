import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Sexo } from '../enum/sexo.enum';
import { IUser } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    @Inject(PLATFORM_ID) private platformId:Object,
    private http: HttpClient
  ) {}

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

  atualizarAgua(
    quantidade: Number,
    id:string
  ){
    return this.http.put(`${this.apiUrl}/usuarios/${id}/agua`,{
      quantidade
    });
  }

  atualizarPeso(
    pesoAtual: Number,
    id:string
  ){
    return this.http.put(`${this.apiUrl}/usuarios/${id}/peso`,{
      pesoAtual
    });
  }

  atualizarMedida(
    quadrilAtual:Number,
    umbigoAtual:Number,
    cinturaAtual:Number,
    bracoAtual:Number,
    coxaAtual:Number,
    alturaAtual:Number,
    id:string
  ){
    return this.http.put(`${this.apiUrl}/usuarios/${id}/medidas`,{
      quadrilAtual,
      umbigoAtual,
      cinturaAtual,
      bracoAtual,
      coxaAtual,
      alturaAtual,
    });
  }

  loginUsuario(cpf: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { cpf, senha });
  }

  getAlturaPeso(idUsuario:number){
    return this.http.get(`${this.apiUrl}/usuarios/${idUsuario}/imcdata`)
  }

  // 🔐 Usuário logado (usa o ID salvo no login)
  getUsuarioLogado() {
    const token = localStorage.getItem('token');
    return this.http.get<IUser>(`${this.apiUrl}/usuario-logado`, {
      headers: { Authorization: `Bearer ${token}` }
    });
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