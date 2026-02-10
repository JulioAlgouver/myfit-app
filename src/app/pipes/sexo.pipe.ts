import { Pipe, PipeTransform } from "@angular/core";
import { Sexo } from "../enum/sexo.enum";

@Pipe({
    name:'sexoLabel'
})
export class SexoPipe implements PipeTransform{
    transform(value: Sexo) : string {
    switch(value) {
      case Sexo.Masculino:
        return 'Masculino';
      case Sexo.Feminino:
        return 'Feminino';
      default:
        return 'Desconhecido';
    }
  }
}