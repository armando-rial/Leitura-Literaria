import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-5">
      <h1 class="mb-4">Bem-vindo ao Sistema de Leituras Literárias</h1>
      <div class="d-flex gap-3">
        <button class="btn btn-primary btn-lg" (click)="criarLivro()">Meus Livros</button>
        <button class="btn btn-success btn-lg" (click)="criarLeitura()">Minhas Leituras</button>
      </div>
    </div>
  `
})
export class HomeComponent {
  constructor(private router: Router) {}

  criarLivro() {
    this.router.navigate(['/livros']);
  }

  criarLeitura() {
    this.router.navigate(['/leituras']);
  }
}