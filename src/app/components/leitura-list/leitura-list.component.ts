import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeituraService } from '../../services/leitura.service';
import { LivroService } from '../../services/livro.service';
import { Leitura } from '../../models/leitura';
import { Livro } from '../../models/livro';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-leitura-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './leitura-list.html',
  styleUrl: './leitura-list.css'
})
export class LeituraListComponent {
  leituras: Leitura[] = [];
  livros: Livro[] = [];
  notaPessoalPesquisa: string = '';

  constructor(
    private leituraService: LeituraService,
    private livroService: LivroService,
    private router: Router
  ) {
    this.carregarDados();
  }

  carregarDados() {
    this.leituras = this.leituraService.getAll();
    this.livros = this.livroService.getAll();
  }

  getTituloLivro(livroId: number): string {
    const livro = this.livros.find(l => l.id === livroId);
    return livro ? livro.titulo : 'Livro não encontrado';
  }

  // Filtro simples usando apenas a notaPessoal
  leiturasFiltradas(): Leitura[] {
    const termo = this.notaPessoalPesquisa.trim();
    if (!termo) return this.leituras;

    const termoNum = Number(termo);

    // Se não for número (NaN = Not a Number) ou estiver fora do intervalo 1-10, retorna lista vazia
    if (isNaN(termoNum) || termoNum < 1 || termoNum > 10) return [];

    return this.leituras.filter(l => l.notaPessoal === termoNum);
  }

  novaLeitura() {
    this.router.navigate(['/leituras/novo']);
  }

  editar(id: number) {
    this.router.navigate(['/leituras/editar', id]);
  }

  excluir(id: number) {
    // Busca a leitura pelo id
    const leitura = this.leituras.find(l => l.id === id);
    if (!leitura) {
      alert('Leitura não encontrada.');
      return;
    }

    // Busca o título do livro relacionado
    const livro = this.livros.find(l => l.id === leitura.livroId);
    const tituloLivro = livro ? livro.titulo : 'Livro não encontrado';

    if (confirm(`Confirma exclusão da leitura do livro "${tituloLivro}"?`)) {
      this.leituraService.delete(id);
      this.carregarDados();
    }
  }

  voltarHome() {
    this.router.navigate(['/']);
  }

}