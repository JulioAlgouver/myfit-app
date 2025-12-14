import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sexo } from '../enum/sexo.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000'; // URL do seu backend

  constructor(private http: HttpClient) {}

  cadastrarUsuario(
        nome: string,
        email: string,
        senha: string,
        cpf: string,
        sexo: Sexo,
        telefone: string,
        dataNascimento: Date,
  ){
    return this.http.post(`${this.apiUrl}/usuarios`,{
        nome,
        email,
        senha,
        cpf,
        sexo,
        telefone,
        dataNascimento,
    })
  }

  loginUsuario(cpf: string, senha: string): Observable<any> {
    // Retorna o objeto JSON do backend
    return this.http.post(`${this.apiUrl}/login`, { cpf, senha });
  }
}
