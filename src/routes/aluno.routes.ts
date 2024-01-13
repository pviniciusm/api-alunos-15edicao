import { Router } from "express";
import { logMiddleware } from "../middlewares/log.middleware";
import { validaEmailSenhaMiddleware } from "../middlewares/aluno.middleware";
import { validaLoginMiddleware } from "../middlewares/login.middleware";
import { AlunoController } from "../controllers/aluno.controller";
import { avaliacaoRoutes } from "./avaliacao.routes";

// http://localhost:3335/aluno

export function alunoRoutes() {
    const router = Router({
        mergeParams: true,
    });

    const alunoController = new AlunoController();

    // Rotas de aluno
    router.post("/", [logMiddleware, validaEmailSenhaMiddleware], alunoController.criarAluno);
    router.get("/:id", [logMiddleware], alunoController.obterAluno);
    router.get("/", [logMiddleware], alunoController.listarAlunos);
    router.delete("/:id", [validaLoginMiddleware], alunoController.deletarAluno);
    router.put("/:id", [validaLoginMiddleware], alunoController.atualizarAluno);

    // /aluno/:id/avaliacao
    router.use("/:id/avaliacao", avaliacaoRoutes());

    return router;
}
