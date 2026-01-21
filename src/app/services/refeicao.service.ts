import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})
export class RefeicaoService{

    public apiUrl = 'http://localhost:3000'

    constructor(
        private http:HttpClient,
    ){}

    public registrarRefeicao(
        id_usuario:string,
        id_alimento:number,
        descricao:string,
        tipo_refeicao:string,
        categoria:string,
        quantidade:number,
        total_calorias:number,
        total_proteinas:number,
        total_sodio:number,
        total_fibras:number,
        total_gorduras:number,
        total_carboidratos:number
    ){
        return this.http.post(`${this.apiUrl}/refeicoes`, {
            id_usuario,
            id_alimento,
            descricao,
            tipo_refeicao,
            categoria,
            quantidade,
            total_calorias,
            total_proteinas,
            total_sodio,
            total_fibras,
            total_gorduras,
            total_carboidratos
        })
    }
}