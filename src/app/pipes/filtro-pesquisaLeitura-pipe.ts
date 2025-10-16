import { Pipe, PipeTransform } from '@angular/core';
import { Leitura } from '../models/leitura';

@Pipe({
  name: 'filtroPesquisaLeitura',
  standalone: true
})
export class FiltroPesquisaLeituraPipe implements PipeTransform {
  transform(leituras: Leitura[], termoPesquisa: string): Leitura[] {
    if (!leituras || !termoPesquisa) return leituras;

    const termoNum = Number(termoPesquisa.trim());

    // Se o termo não for um número válido, não filtra nada
    if (isNaN(termoNum)) return leituras;

    // Retorna apenas leituras cuja nota pessoal é exatamente igual ao termo
    return leituras.filter(leitura => leitura.notaPessoal === termoNum);
  }
}
