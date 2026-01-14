import { HttpClient } from "@angular/common/http";
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

  registrarHidratacao(quantidade: number, idUsuario: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/hidratacao`, {
      quantidade,
      id_usuario: idUsuario
    });
  }

  // Aqui garantimos que sempre retornamos um objeto
  pegarValorTotalDiario(idUsuario: string): Observable<ValorDiarioResponse> {
    return this.http
      .get<ValorDiarioResponse[]>(`${this.apiUrl}/hidratacao/${idUsuario}/valorDiario`)
      .pipe(
        map(array => {
          // Se o backend retornar vazio, usamos 0
          if (array && array.length > 0) {
            return array[0];
          } else {
            return { valor_diario: 0 };
          }
        })
      );
  }
}
