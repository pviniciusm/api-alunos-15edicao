import { NextFunction, Request, Response } from "express";
import repository from "../database/prisma.repository";
import { AuthService } from "../services/auth.service";

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

        const authService = new AuthService();
        const result = await authService.validateLogin(authorization, id);

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

export async function validaLoginMaiorIdadeMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        const authService = new AuthService();
        const result = await authService.validateLoginMaiorIdade(id);

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
