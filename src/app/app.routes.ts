import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LivroListComponent } from './components/livro-list/livro-list.component';
import { LivroFormComponent } from './components/livro-form/livro-form.component';
import { LeituraListComponent } from './components/leitura-list/leitura-list.component';
import { LeituraFormComponent } from './components/leitura-form/leitura-form.component';
import { PageNotFound } from './components/page-not-found/page-not-found';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Página inicial
  { path: 'livros', component: LivroListComponent }, // Listagem de livros
  { path: 'livros/novo', component: LivroFormComponent }, // Formulário para novo livro
  { path: 'livros/editar/:id', component: LivroFormComponent }, // Formulário para editar livro
  { path: 'leituras', component: LeituraListComponent }, // Listagem de leituras
  { path: 'leituras/novo', component: LeituraFormComponent }, // Formulário para nova leitura
  { path: 'leituras/editar/:id', component: LeituraFormComponent }, // Formulário para editar leitura
  { path: "**", component: PageNotFound} // Página não encontrada
];