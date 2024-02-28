import { randomUUID } from "crypto";
import repository from "../database/prisma.repository";
import { LoginDTO, PayloadToken } from "../contracts/login.contract";
import { Result } from "../contracts/result.contract";
import jwt, { JwtPayload } from "jsonwebtoken";

export class AuthService {
    public async login(data: LoginDTO): Promise<Result> {
        // Entrada -> parametros da função/método

        // Processamento
        // buscar o aluno por email + senha
        const aluno = await repository.aluno.findFirst({
            where: {
                email: data.email,
                senha: data.senha,
            },
            select: {
                id: true,
                nome: true,
            },
        });

        // Se nao tem aluno, 401 - Unauthorized
        if (!aluno) {
            return {
                ok: false,
                message: "Credenciais inválidas",
                code: 401,
            };
        }

        // Gerar a credencial de acesso para o usuario
        const token = this.generateToken(aluno);

        return {
            ok: true,
            message: "Login realizado com sucesso",
            code: 200,
            data: {
                id: aluno.id,
                nome: aluno.nome,
                token,
            },
        };
    }

    public async validateLogin(token: string, idAluno: string): Promise<Result> {
        // Verificar se o token JWT é válido
        const payload = this.validateToken(token) as PayloadToken;

        // Buscar o ID do aluno de dentro JWT
        // Validar o ID do token com o ID da requisição
        if (payload == null || idAluno != payload.id) {
            return {
                ok: false,
                message: "Token de autenticação inválido",
                code: 401,
            };
        }

        return {
            ok: true,
            message: "Validação de login feita com sucesso",
            code: 200,
        };
    }

    public async validateLoginMaiorIdade(id: string): Promise<Result> {
        const aluno = await repository.aluno.findUnique({
            where: {
                id,
            },
        });

        if (!aluno) {
            return {
                ok: false,
                message: "Aluno não encontrado",
                code: 404,
            };
        }

        if (!aluno.idade || aluno.idade < 18) {
            return {
                ok: false,
                message: "Aluno não possui 18 anos ou mais",
                code: 403,
            };
        }

        return {
            ok: true,
            message: "Validação feita com sucesso",
            code: 200,
        };
    }

    public generateToken(payload: any) {
        const token = jwt.sign(payload, process.env.JWT_SECRET!);
        return token;
    }

    public validateToken(token: string) {
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET!);
            return payload;
        } catch (error: any) {
            return null;
        }
    }
}
