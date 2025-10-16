export interface Leitura {
  id: number;
  livroId: number;
  dataInicio: string; // ISO date string
  dataTermino?: string; // ISO date string opcional
  status: 'em andamento' | 'concluido';
  notaPessoal?: number;
}