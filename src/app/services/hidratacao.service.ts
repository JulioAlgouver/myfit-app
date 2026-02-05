import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators"; // IMPORTANTE

export interface ValorDiarioResponse {
    valor_diario: number;
}

@Injectable({
  providedIn: 'root'
})
export class HidratacaoService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  registrarHidratacao(quantidade: number): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/hidratacao`, 
      { quantidade }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  // Aqui garantimos que sempre retornamos um objeto
  pegarValorTotalDiario(): Observable<ValorDiarioResponse> {
    const token = localStorage.getItem('token');
    return this.http.get<ValorDiarioResponse>(`${this.apiUrl}/hidratacao/valorDiario`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}
