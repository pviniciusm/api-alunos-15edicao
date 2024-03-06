import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

import { alunoRoutes } from "./routes/aluno.routes";
import { loginRoutes } from "./routes/login.routes";

import swagger from "swagger-ui-express";
import swaggerJson from "./docs/swagger.json";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/aluno", alunoRoutes());
app.use("/login", loginRoutes());

app.use("/docs", swagger.serve);
app.use("/docs", swagger.setup(swaggerJson));

app.listen(process.env.PORT, () => {
    console.log("API está rodando");
});
