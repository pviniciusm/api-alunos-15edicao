import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export async function validateTokenMid(req: Request, res: Response, next: NextFunction) {
    try {
        // 1- Entrada
        const { authorization } = req.headers;

        // 401 - Erro de usuário não está autenticado
        if (!authorization) {
            return res.status(401).send({
                ok: false,
                message: "Token de autenticação não informado",
            });
        }

        // 2- Processamento
        const service = new AuthService();
        const result = await service.validateLogin(authorization);

        // 3- Saída
        if (!result.ok) {
            return res.status(result.code).send(result);
        }

        next();
    } catch (error: any) {
        return res.status(500).send({
            ok: false,
            message: error.toString(),
        });
    }
}
