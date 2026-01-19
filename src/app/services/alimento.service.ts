import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IAlimento } from "../interface/alimento.interface";

@Injectable({
    providedIn:'root'
})
export class AlimentoService{
    private apiUrl = 'http://localhost:3000/alimentos';

    constructor(private http: HttpClient){}

    listarAlimentos():Observable<IAlimento[]>{
        return this.http.get<IAlimento[]>(this.apiUrl);
    }

    buscarAlimentoPorId(id:number){
        return this.http.get(`${this.apiUrl}/${id}`);
    }
}