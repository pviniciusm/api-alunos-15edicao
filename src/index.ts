import express from "express";
import { AlunoController } from "./controllers/aluno.controller";
import { AvaliacaoController } from "./controllers/avaliacao.controller";

const app = express();
app.use(express.json());

const alunoController = new AlunoController();
const avaliacaoController = new AvaliacaoController();

// Rotas de aluno
app.post("/aluno", alunoController.criarAluno);
app.get("/aluno/:id", alunoController.obterAluno);
app.get("/aluno", alunoController.listarAlunos);
app.delete("/aluno/:id", alunoController.deletarAluno);
app.put("/aluno/:id", alunoController.atualizarAluno);

// Rotas de avaliação
app.post("/aluno/:id/avaliacao", avaliacaoController.criarAvaliacao);

app.listen(3335, () => {
    console.log("API está rodando");
});
