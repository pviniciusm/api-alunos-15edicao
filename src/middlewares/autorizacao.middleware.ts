import { NextFunction, Request, Response } from "express";
import { TipoAluno } from "../models/aluno.model";
import { erroServidor } from "../util/response.helper";
import { AutorizacaoService } from "../services/autorizacao.service";

export function validateCreateAvaliacaoMid(req: Request, res: Response, next: NextFunction) {
    try {
        const { authorization } = req.headers;

        const autorizacaoService = new AutorizacaoService();
        let result = autorizacaoService.validateAutorizacao(authorization!, [
            TipoAluno.Matriculado,
            TipoAluno.TechHelper,
        ]);

        if (!result.ok) {
            return res.status(result.code).send(result);
        }

        next();
    } catch (error: any) {
        return erroServidor(res, error);
    }
}

export function validateTechHelperMid(req: Request, res: Response, next: NextFunction) {
    try {
        const { authorization } = req.headers;

        const autorizacaoService = new AutorizacaoService();
        let result = autorizacaoService.validateAutorizacao(authorization!, [TipoAluno.TechHelper]);

        if (!result.ok) {
            return res.status(result.code).send(result);
        }

        next();
    } catch (error: any) {
        return erroServidor(res, error);
    }
}

export function validateAutorizacaoMid(tiposPermitidos: TipoAluno[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const { authorization } = req.headers;

            const autorizacaoService = new AutorizacaoService();
            let result = autorizacaoService.validateAutorizacao(authorization!, tiposPermitidos);

            if (!result.ok) {
                return res.status(result.code).send(result);
            }

            next();
        } catch (error: any) {
            return erroServidor(res, error);
        }
    };
}

export function validateAlunoMid(req: Request, res: Response, next: NextFunction) {
    try {
        const { authorization } = req.headers;
        const { id } = req.params;

        const autorizacaoService = new AutorizacaoService();
        const result = autorizacaoService.validateAluno(authorization!, id);

        if (!result.ok) {
            return res.status(result.code).send(result);
        }

        return next();
    } catch (error: any) {
        return erroServidor(res, error);
    }
}
