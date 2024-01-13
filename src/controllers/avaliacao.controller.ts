import { Request, Response } from "express";
import { erroCamposNaoInformados, erroNaoEncontrado, erroServidor } from "../util/response.helper";
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

    // GET http://localhost:3335/aluno/:id/avaliacao
    // Listar as avaliações de um aluno específico
    public async listarAvaliacoes(req: Request, res: Response) {
        try {
            // 1- Entrada
            const { id } = req.params;

            // 2- Processamento
            // verificar se o aluno existe, se não 404
            const aluno = await repository.aluno.findUnique({
                where: {
                    id,
                },
                include: {
                    avaliacoes: true,
                },
            });

            if (!aluno) {
                return erroNaoEncontrado(res, "Aluno");
            }

            // listar as avaliacoes
            // const avaliacoes = await repository.avaliacao.findMany({
            //     where: {
            //         idAluno: id,
            //     },
            // });

            // 3- Saída
            return res.status(200).send({
                ok: true,
                message: "Avaliações listadas com sucesso",
                data: aluno.avaliacoes,
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }

    // PUT http://localhost:3335/aluno/:id/avaliacao/:idAvaliacao
    public async atualizarAvaliacao(req: Request, res: Response) {
        try {
            // 1- Entrada
            const { id, idAvaliacao } = req.params;
            const { nota, disciplina } = req.body;

            if (!nota) {
                return erroCamposNaoInformados(res);
            }

            // 2- Processamento
            // verificar se o aluno existe, se não 404
            const aluno = await repository.aluno.findUnique({
                where: {
                    id,
                },
            });

            if (!aluno) {
                return erroNaoEncontrado(res, "Aluno");
            }

            // verificar se a avaliacao existe, se não 404
            const avaliacao = await repository.avaliacao.findUnique({
                where: {
                    id: idAvaliacao,
                },
            });

            if (!avaliacao) {
                return erroNaoEncontrado(res, "Avaliação");
            }

            // atualizar a avaliacao
            const result = await repository.avaliacao.update({
                where: {
                    id: idAvaliacao,
                },
                data: {
                    nota,
                    disciplina,
                },
            });

            // 3- Saída
            return res.status(200).send({
                ok: true,
                message: "Avaliação atualizada com sucesso",
                data: result,
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }
}
