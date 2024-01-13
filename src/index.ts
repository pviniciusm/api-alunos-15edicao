import express from "express";
import cors from "cors";

import { alunoRoutes } from "./routes/aluno.routes";
import { loginRoutes } from "./routes/login.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/aluno", alunoRoutes());
app.use("/login", loginRoutes());

app.listen(3335, () => {
    console.log("API está rodando");
});
