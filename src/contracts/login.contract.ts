import { JwtPayload } from "jsonwebtoken";

export interface LoginDTO {
    email: string;
    senha: string;
}

export interface PayloadToken extends JwtPayload {
    id: string;
    nome: string;
}
