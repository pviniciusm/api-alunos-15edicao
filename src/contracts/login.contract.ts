import { JwtPayload } from "jsonwebtoken";
import { TipoAluno } from "../models/aluno.model";

export interface LoginDTO {
    email: string;
    senha: string;
}

export interface PayloadToken extends JwtPayload {
    id: string;
    nome: string;
    tipo: TipoAluno;
}
