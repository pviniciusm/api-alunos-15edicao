import { Request, Response } from "express";
import {
    erroCamposNaoInformados,
    erroNaoEncontrado,
    erroServidor,
} from "../util/response.helper";
import repository from "../database/prisma.repository";
import { Avaliacao } from "../models/avaliacao.model";
import { adaptAlunoPrisma } from "../util/aluno.adapter";

export class AvaliacaoController {
    // POST http://localhost:3335/aluno/:id/avaliacao

    public async criarAvaliacao(req: Request, res: Response) {
        try {
            // 1- Entrada
            // ID do aluno
            const { id } = req.params;
            const { disciplina, nota } = req.body;

            if (!disciplina || !nota) {
                return erroCamposNaoInformados(res);
            }

            // 2- Processamento
            // verificar se o aluno existe, 404 se não
            const aluno = await repository.aluno.findUnique({
                where: {
                    id,
                },
            });

            if (!aluno) {
                return erroNaoEncontrado(res, "Aluno");
            }

            // Adapt do aluno (prisma) para o aluno (backend)
            const alunoBackend = adaptAlunoPrisma(aluno);

            // criar o model backend da avaliacao
            const avaliacao = new Avaliacao(disciplina, nota, alunoBackend);

            // salvar no BD
            const result = await repository.avaliacao.create({
                data: {
                    id: avaliacao.id,
                    disciplina: avaliacao.disciplina,
                    nota: avaliacao.nota,
                    idAluno: aluno.id,
                },
            });

            // 3- Saída
            return res.status(201).send({
                ok: true,
                message: "Avaliação criada com sucesso",
                data: result,
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }
}
