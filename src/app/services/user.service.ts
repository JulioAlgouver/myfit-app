import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000'; // URL do seu backend

  constructor(private http: HttpClient) {}

  loginUsuario(cpf: string, senha: string): Observable<any> {
    // Retorna o objeto JSON do backend
    return this.http.post(`${this.apiUrl}/login`, { cpf, senha });
  }
}
