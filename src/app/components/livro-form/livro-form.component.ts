import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LivroService } from '../../services/livro.service';
import { Livro } from '../../models/livro';

@Component({
  selector: 'app-livro-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './livro-form.html',
  styleUrl: './livro-form.css'
})
export class LivroFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  livroId?: number;

  constructor(
    private livroService: LivroService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      titulo: new FormControl('', Validators.required),
      autor: new FormControl('', Validators.required),
      genero: new FormControl('', Validators.required),
      numPaginas: new FormControl(1, [Validators.required, Validators.min(1)]),
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.livroId = +params['id'];
        const livro = this.livroService.getById(this.livroId);
        if (livro) {
          this.form.patchValue(livro);
        } else {
          alert('Livro não encontrado');
          this.router.navigate(['/livros']);
        }
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const livro: Livro = {
        id: this.livroId ?? 0,
        ...this.form.value
      };
      this.livroService.save(livro);
      this.router.navigate(['/livros']);
    }
  }

  cancelar() {
    this.router.navigate(['/livros']);
  }
}