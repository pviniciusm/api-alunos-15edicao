import express from "express";
import { AlunoController } from "./controllers/aluno.controller";
import { AvaliacaoController } from "./controllers/avaliacao.controller";
import { AuthController } from "./controllers/auth.controller";

const app = express();
app.use(express.json());

const alunoController = new AlunoController();
const avaliacaoController = new AvaliacaoController();
const authController = new AuthController();

// Rotas de aluno
app.post("/aluno", alunoController.criarAluno);
app.get("/aluno/:id", alunoController.obterAluno);
app.get("/aluno", alunoController.listarAlunos);
app.delete("/aluno/:id", alunoController.deletarAluno);
app.put("/aluno/:id", alunoController.atualizarAluno);

// Rotas de avaliação
app.post("/aluno/:id/avaliacao", avaliacaoController.criarAvaliacao);
app.get("/aluno/:id/avaliacao", avaliacaoController.listarAvaliacoes);
app.put(
    "/aluno/:id/avaliacao/:idAvaliacao",
    avaliacaoController.atualizarAvaliacao
);

// Rotas de autenticação
app.post("/login", authController.login);

app.listen(3335, () => {
    console.log("API está rodando");
});
