import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IPesagemResponse } from "../interface/pesagem-response.interface";

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
    
    consultarPesagemPorUsuario(id_usuario: number) : Observable<IPesagemResponse[]>{
        return this.http.get<IPesagemResponse[]>(`${this.apiUrl}/pesagem/${id_usuario}`)
    }

    pegarDataHoraUltimaPesagem(idUsuario: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/pesagem/ultima/${idUsuario}`);
    }
}