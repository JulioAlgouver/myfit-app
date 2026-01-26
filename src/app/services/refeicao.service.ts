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

    pegarValorTotalDiario(idUsuario: string):Observable<ValorRefeicaoDiariResponse>{
        return this.http
        .get<ValorRefeicaoDiariResponse[]>(`${this.apiUrl}/refeicoes/${idUsuario}/valorDiario`)
        .pipe(
            map(array => {
                if(array && array.length > 0){
                    return array[0];
                }else{
                    return {
                        total_calorias_diario: 0,
                        total_proteinas_diario: 0,
                        total_sodio_diario: 0,
                        total_fibras_diario: 0,
                        total_gorduras_diario: 0,
                        total_carboidratos_diario: 0
                    }
                }
            })
        )
    }
}