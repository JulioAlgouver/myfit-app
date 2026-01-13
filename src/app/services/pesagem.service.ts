import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class PesagemService{
    private apiUrl = 'http://localhost:3000'

    constructor(private http: HttpClient){}


    // Atualizar peso do usuario
    registrarPesagem(
        pesoAtual:number,
        idUsuario:string
    ){
        return this.http.post(`${this.apiUrl}/pesagem`,{
            pesoAtual,
            idUsuario,
        });
    }    

    pegarDataHoraUltimaPesagem(): Observable<any>{
        const userId = localStorage.getItem('userId')
        return this.http.get(`${this.apiUrl}/pesagem/ultima/${userId}`)
    }

      getUsuarioLogado(): Observable<any> {
        const userId = localStorage.getItem('userId');
        return this.http.get(`${this.apiUrl}/usuarios/${userId}`);
      }
}