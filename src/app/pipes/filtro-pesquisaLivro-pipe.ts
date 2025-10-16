import { Pipe, PipeTransform } from '@angular/core';
import { Livro } from '../models/livro';

@Pipe({
  name: 'filtroPesquisa',
  standalone: true,
  pure: false
})
export class FiltroPesquisaPipe implements PipeTransform {

  transform(listaLivros: Livro[], tituloPesquisa: string | undefined): Livro[] {
    if(!tituloPesquisa || tituloPesquisa.length < 3) {
      return listaLivros; 
    } 

    return listaLivros.filter( (livro) => {
      return livro.titulo?.toLowerCase().includes(tituloPesquisa.toLowerCase());
    } )
  }

}
