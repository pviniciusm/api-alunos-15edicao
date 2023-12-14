import { Request, Response } from "express";
import { Aluno } from "../models/aluno.model";
import repository from "../database/prisma.repository";

export class AlunoController {
    public async criarAluno(req: Request, res: Response) {
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
    }
}
