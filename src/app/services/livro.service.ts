import { Injectable } from '@angular/core';
import { Livro } from '../models/livro';

@Injectable({ providedIn: 'root' })
export class LivroService {
  private storageKey = 'livros';

  getAll(): Livro[] {
    const livrosJson = localStorage.getItem(this.storageKey);
    return livrosJson ? JSON.parse(livrosJson) : [];
  }

  getById(id: number): Livro | undefined {
    return this.getAll().find(l => l.id === id);
  }

  save(livro: Livro): void {
    const livros = this.getAll();
    const index = livros.findIndex(l => l.id === livro.id);
    if (index > -1) {
      livros[index] = livro;
    } else {
      livro.id = this.generateId(livros);
      livros.push(livro);
    }
    localStorage.setItem(this.storageKey, JSON.stringify(livros));
  }

  delete(id: number): void {
    const livros = this.getAll().filter(l => l.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(livros));
  }

  private generateId(livros: Livro[]): number {
    return livros.length > 0 ? Math.max(...livros.map(l => l.id)) + 1 : 1;
  }
}