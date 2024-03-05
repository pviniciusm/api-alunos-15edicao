import { Aluno, Prisma } from "@prisma/client";
import { Aluno as AlunoBackend, TipoAluno } from "../models/aluno.model";

export function adaptAlunoPrisma(aluno: Aluno): AlunoBackend {
    const novoAluno = new AlunoBackend(
        aluno.nome,
        aluno.email,
        aluno.senha,
        aluno.tipo as TipoAluno,
        aluno.idade ?? undefined
    );
    novoAluno.id = aluno.id;

    return novoAluno;
}
