import { Sexo } from "../enum/sexo.enum";

export interface IUser{
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    sexo: Sexo;
    telefone: string;
    dataNascimento: Date;
    pesoAtual: number;
    alturaAtual: number;
    bracoAtual: number;
    quadrilAtual: number;
    cinturaAtual: number;
    coxaAtual: number;
    umbigoAtual: number;
    agua: number;
}