import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class MedidaService {
    private apiUrl = 'http://localhost:3000'
    
    constructor(private http:HttpClient){}
    
    registraMedida(
        quadril:number,
        umbigo:number,
        cintura:number,
        braco:number,
        coxa:number,
        altura:number,
        idUsuario:string
    ){
        return this.http.post(`${this.apiUrl}/medidas`,{
            quadril,
            umbigo,
            cintura,
            braco,
            coxa,
            altura,
            idUsuario,
        });
    }
}