export interface IRefeicao{
    id_refeicao:number,
    id_alimento:number,
    descricao:string,
    tipo_refeicao:string,
    categoria:string,
    quantidade:number,
    total_caloria:number,
    total_proteina:number,
    total_sodio:number,
    total_fibras:number,
    total_gorduras:number,
    total_carboidratos:number,
    data_hora_refeicao:Date;
}