import { Request, Response } from "express";
import { erroCamposNaoInformados, erroServidor } from "../util/response.helper";
import repository from "../database/prisma.repository";
import { randomUUID } from "crypto";

export class AuthController {
    // POST http://localhost:3335/login

    public async login(req: Request, res: Response) {
        try {
            // 1- Entrada
            const { email, senha } = req.body;

            if (!email || !senha) {
                return erroCamposNaoInformados(res);
            }

            // 2- Processamento
            // buscar o aluno por email + senha
            const aluno = await repository.aluno.findFirst({
                where: {
                    email,
                    senha,
                },
                select: {
                    id: true,
                    nome: true,
                },
            });

            if (!aluno) {
                // 401 - Unauthorized
                return res.status(401).send({
                    ok: false,
                    message: "Credenciais inválidas",
                });
            }

            // Gerar a credencial de acesso para o usuario
            const token = randomUUID();

            // Salvar o token na tabela do aluno
            await repository.aluno.update({
                where: {
                    id: aluno.id,
                },
                data: {
                    token,
                },
            });

            // 3- Saída
            return res.status(200).send({
                ok: true,
                message: "Login realizado com sucesso",
                data: {
                    id: aluno.id,
                    nome: aluno.nome,
                    token,
                },
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }
}
