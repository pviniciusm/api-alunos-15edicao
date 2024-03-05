import { NextFunction, Request, Response, Router } from "express";
import { AvaliacaoController } from "../controllers/avaliacao.controller";
import { validateTokenMid } from "../middlewares/auth.middleware";
import {
    validateAutorizacaoMid,
    validateCreateAvaliacaoMid,
    validateTechHelperMid,
} from "../middlewares/autorizacao.middleware";
import { TipoAluno } from "../models/aluno.model";

// http://localhost:3335/aluno/:id/avaliacao

export function avaliacaoRoutes() {
    const router = Router({
        mergeParams: true,
    });

    const avaliacaoController = new AvaliacaoController();

    // Rotas de avaliação
    router.post(
        "/",
        [validateTokenMid, validateAutorizacaoMid([TipoAluno.Matriculado, TipoAluno.TechHelper])],
        avaliacaoController.criarAvaliacao
    );

    router.get("/", [validateTokenMid], avaliacaoController.listarAvaliacoes);

    router.put(
        "/:idAvaliacao",
        [validateTokenMid, validateAutorizacaoMid([TipoAluno.TechHelper])],
        avaliacaoController.atualizarAvaliacao
    );

    return router;
}

// /aluno/:id/avaliacoes GET
// id (params), token (header authorization)
