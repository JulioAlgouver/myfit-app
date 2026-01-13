import { Sexo } from "../enum/sexo.enum";

export interface IUser{
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    sexo: Sexo;
    telefone: string;
    dataNascimento: Date;
    pesoAtual: Number;
    alturaAtual:Number;
    bracoAtual:Number;
    quadrilAtual:Number;
    cinturaAtual:Number;
    coxaAtual:Number;
    umbigoAtual:Number;
    agua:Number;
}