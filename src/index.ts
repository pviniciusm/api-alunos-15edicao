import express from "express";
import { AlunoController } from "./controllers/aluno.controller";

const app = express();
app.use(express.json());

const alunoController = new AlunoController();

// Criar um novo aluno
app.post("/aluno", alunoController.criarAluno);
app.get("/aluno/:id", alunoController.obterAluno);
app.delete("/aluno/:id", alunoController.deletarAluno);

app.listen(3335, () => {
    console.log("API está rodando");
});
