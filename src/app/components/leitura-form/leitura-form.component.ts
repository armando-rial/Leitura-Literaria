import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LeituraService } from '../../services/leitura.service';
import { LivroService } from '../../services/livro.service';
import { Leitura } from '../../models/leitura';
import { Livro } from '../../models/livro';

@Component({
  selector: 'app-leitura-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './leitura-form.html',
  styleUrl: './leitura-form.css'
})
export class LeituraFormComponent implements OnInit {
  form!: FormGroup;
  livros: Livro[] = [];
  isEdit = false;
  leituraId?: number;

  constructor(
    private leituraService: LeituraService,
    private livroService: LivroService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.livros = this.livroService.getAll();

    this.form = new FormGroup({
      livroId: new FormControl(null, Validators.required),
      dataInicio: new FormControl('', Validators.required),
      dataTermino: new FormControl(''),
      status: new FormControl('em andamento'),
      notaPessoal: new FormControl(null, [Validators.min(0), Validators.max(10)])
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.leituraId = +params['id'];
        const leitura = this.leituraService.getById(this.leituraId);
        if (leitura) {
          this.form.patchValue(leitura);
        } else {
          alert('Leitura não encontrada');
          this.router.navigate(['/leituras']);
        }
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const { dataInicio, dataTermino } = this.form.value;

    // Service já bloqueia, mas aqui o usuário é notificado antes
    if (dataTermino && new Date(dataTermino) < new Date(dataInicio)) {
      alert('A data de término não pode ser anterior à data de início.');
      return;
    }

    const leitura: Leitura = {
      id: this.leituraId ?? 0,
      ...this.form.value
    };

    try {
      // Tenta salvar a leitura (pode lançar erro do serviço)
      this.leituraService.save(leitura);
      this.router.navigate(['/leituras']);
    } catch (e: any) {
      // Mostra a mensagem do erro para o usuário
      alert(e.message);
    }
  }

  cancelar() {
    this.router.navigate(['/leituras']);
  }
}
