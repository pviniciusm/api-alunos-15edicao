import { TipoAluno } from "../models/aluno.model";

export interface CriarAlunoDTO {
    nome: string;
    email: string;
    senha: string;
    idade?: number;
    tipo: TipoAluno;
}
