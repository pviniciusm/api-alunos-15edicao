import { Request, Response } from "express";
import { Aluno } from "../models/aluno.model";
import repository from "../database/prisma.repository";

export class AlunoController {
    // Criar um novo aluno
    public async criarAluno(req: Request, res: Response) {
        try {
            // 1- Entrada
            const { nome, email, senha, idade } = req.body;

            if (!nome || !email || !senha) {
                return res.status(400).send({
                    ok: false,
                    message: "Os campos obrigatórios não foram informados",
                });
            }

            // 2- Processamento
            const aluno = new Aluno(nome, email, senha, idade);

            const result = await repository.aluno.create({
                data: aluno,
            });

            // 3- Saída
            return res.status(201).send({
                ok: true,
                message: "Usuário criado com sucesso",
                data: result,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    // Obter um aluno pelo ID
    public async obterAluno(req: Request, res: Response) {
        try {
            // 1- Entrada
            const { id } = req.params;

            // 2- Processamento
            const aluno = await repository.aluno.findUnique({
                where: {
                    id,
                },
                select: {
                    id: true,
                    nome: true,
                    email: true,
                },
            });

            if (!aluno) {
                return res.status(404).send({
                    ok: false,
                    message: "Aluno não encontrado",
                });
            }

            // 3- Saída
            return res.status(200).send({
                ok: true,
                message: "Aluno obtido com sucesso",
                data: aluno,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    // PUT - atualizar um aluno

    // DELETE - deletar um aluno
    public async deletarAluno(req: Request, res: Response) {
        try {
            // 1- Entrada
            const { id } = req.params;

            // 2- Processamento
            // verificar se o aluno existe, se não 404
            const aluno = await repository.aluno.findUnique({
                where: {
                    id,
                },
            });

            if (!aluno) {
                return res.status(404).send({
                    ok: false,
                    message: "Aluno não encontrado",
                });
            }

            // deletar o aluno
            await repository.aluno.delete({
                where: {
                    id,
                },
            });

            // 3- Saída
            return res.status(200).send({
                ok: true,
                message: "Aluno deletado com sucesso",
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
