import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivroService } from '../../services/livro.service';
import { Livro } from '../../models/livro';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-livro-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './livro-list.html',
  styleUrls: ['./livro-list.css'] // ✅ Corrigido (plural)
})
export class LivroListComponent {
  livros: Livro[] = [];
  tituloPesquisa: string = ''; // 🔍 Campo vinculado ao ngModel

  constructor(private livroService: LivroService, private router: Router) {
    this.carregarLivros();
  }

  carregarLivros() {
    this.livros = this.livroService.getAll();
  }

  // Filtro simples usando o título
  livrosFiltrados(): Livro[] {
    const termo = this.tituloPesquisa.trim().toLowerCase();
    if (!termo) return this.livros;

    return this.livros.filter(l =>
      l.titulo.toLowerCase().includes(termo)
    );
  }

  novoLivro() {
    this.router.navigate(['/livros/novo']);
  }

  editar(id: number) {
    this.router.navigate(['/livros/editar', id]);
  }

  excluir(id: number) {
    const livro = this.livros.find(l => l.id === id);
    if (!livro) {
      alert('Livro não encontrado.');
      return;
    }

    if (confirm(`Confirma exclusão do livro "${livro.titulo}"?`)) {
      this.livroService.delete(id);
      this.carregarLivros();
    }
  }

  voltarHome() {
    this.router.navigate(['/']);
  }
}
