import { NextFunction, Request, Response } from "express";
import repository from "../database/prisma.repository";

export async function validaLoginMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        // Header
        const { authorization } = req.headers;
        const { id } = req.params;

        if (!authorization) {
            return res.status(401).send({
                ok: false,
                message: "Token de autenticação não informado",
            });
        }

        const aluno = await repository.aluno.findUnique({
            where: {
                id,
            },
        });

        if (!aluno || aluno.token !== authorization) {
            return res.status(401).send({
                ok: false,
                message: "Token de autenticação inválido",
            });
        }

        next();
    } catch (error: any) {
        return res.status(500).send({
            ok: false,
            message: error.toString(),
        });
    }
}
