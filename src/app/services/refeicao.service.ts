import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

export interface ValorRefeicaoDiariResponse{
    total_calorias_diario:number;
    total_proteinas_diario:number;
    total_sodio_diario:number;
    total_fibras_diario:number;
    total_gorduras_diario:number;
    total_carboidratos_diario:number;
}

@Injectable({
    providedIn:'root'
})
export class RefeicaoService{

    public apiUrl = 'http://localhost:3000'

    constructor(
        private http:HttpClient,
    ){}

    public registrarRefeicao(
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
        const token = localStorage.getItem('token') || '';

        return this.http.post(
        `${this.apiUrl}/refeicoes`,
        {
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
        },
        {
            headers: {
            Authorization: `Bearer ${token}`
            }
        }
        );
    }

    pegarValorTotalDiario(idUsuario: string):Observable<ValorRefeicaoDiariResponse>{
        return this.http
        .get<ValorRefeicaoDiariResponse>(`${this.apiUrl}/refeicoes/${idUsuario}/valorDiario`)
    }
}