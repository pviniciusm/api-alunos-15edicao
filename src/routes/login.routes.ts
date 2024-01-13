import { Router } from "express";
import { LoginController } from "../controllers/login.controller";
import { validaEmailSenhaMiddleware } from "../middlewares/aluno.middleware";

// http://localhost:3335/login

export function loginRoutes() {
    const router = Router({
        mergeParams: true,
    });

    const loginController = new LoginController();

    // Rotas de autenticação
    router.post("/", [validaEmailSenhaMiddleware], loginController.login);

    return router;
}
