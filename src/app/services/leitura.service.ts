import { Injectable } from '@angular/core';
import { Leitura } from '../models/leitura';

@Injectable({ providedIn: 'root' })
export class LeituraService {
  private storageKey = 'leituras';

  getAll(): Leitura[] {
    const leiturasJson = localStorage.getItem(this.storageKey);
    return leiturasJson ? JSON.parse(leiturasJson) : [];
  }

  getById(id: number): Leitura | undefined {
    return this.getAll().find(l => l.id === id);
  }

  save(leitura: Leitura): void {
    // Regra 1: data de término não pode ser menor que data de início
    if (leitura.dataTermino && new Date(leitura.dataTermino) < new Date(leitura.dataInicio)) {
      throw new Error('A data de término não pode ser anterior à data de início.');
    }

    leitura.livroId = +leitura.livroId; // garante número

    const leituras = this.getAll();

    // Regra 2: cada livro só pode ter uma leitura vinculada
    const leituraExistente = leituras.find(l => l.livroId === leitura.livroId && l.id !== leitura.id);
    if (leituraExistente) {
      throw new Error('Já existe uma leitura cadastrada para este livro.');
    }

    const index = leituras.findIndex(l => l.id === leitura.id);
    if (index > -1) {
      leituras[index] = leitura;
    } else {
      leitura.id = this.generateId(leituras);
      leituras.push(leitura);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(leituras));
  }

  delete(id: number): void {
    const leituras = this.getAll().filter(l => l.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(leituras));
  }

  private generateId(leituras: Leitura[]): number {
    return leituras.length > 0 ? Math.max(...leituras.map(l => l.id)) + 1 : 1;
  }
}