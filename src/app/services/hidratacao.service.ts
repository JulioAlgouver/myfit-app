import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class HidratacaoService{
    private apiUrl = 'http://localhost:3000'

    constructor(private http:HttpClient){}

    registrarHidratacao(
        quantidade:number,
        idUsuario:string
    ){
        return this.http.post(`${this.apiUrl}/hidratacao`,{
            quantidade,
            idUsuario,
        });
    }
}