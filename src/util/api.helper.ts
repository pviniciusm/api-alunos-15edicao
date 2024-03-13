import cors from "cors";
import express from "express";
import { alunoRoutes } from "../routes/aluno.routes";
import { loginRoutes } from "../routes/login.routes";

export function createApp() {
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use("/aluno", alunoRoutes());
    app.use("/login", loginRoutes());

    return app;
}
