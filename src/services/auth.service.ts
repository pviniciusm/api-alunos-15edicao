import { randomUUID } from "crypto";
import repository from "../database/prisma.repository";
import { LoginDTO, PayloadToken } from "../contracts/login.contract";
import { Result } from "../contracts/result.contract";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Aluno } from "../models/aluno.model";

/**
 * Service para funcionalidades de login e validação de autenticação.
 */
export class AuthService {
    /**
     * Realiza uma autenticação na API através de login com email e senha.
     *
     * ```typescript
     *      const authService = new AuthService();
     *      const result = await authService.login({
     *          email:  "daphne@dog.com",
     *          senha: "12345"
     *      });
     * ```
     *
     * @author Paulo
     * @param data DTO contendo email e senha
     * @async por conta de chamada ao banco de dados
     * @returns um objeto contendo informações de erro/sucesso e os dados do usuário logado + o token
     */
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
                tipo: true,
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

    public async validateLogin(token: string): Promise<Result> {
        const payload = this.validateToken(token);

        if (!payload) {
            return {
                ok: false,
                message: "As credenciais de autenticação são inválidas",
                code: 401,
            };
        }

        return {
            ok: true,
            message: "Validação realizada com sucesso",
            code: 200,
        };
    }

    public generateToken(payload: any) {
        const token = jwt.sign(payload, process.env.JWT_SECRET!, {
            expiresIn: "1h",
        });
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

    /**
     * Método para decodificar um token JWT
     */
    public decodeToken(token: string) {
        return jwt.decode(token);
    }

    /**
     * Método para decodificar um token JWT.
     * Usando a biblioteca xYz.
     *
     * @deprecated Este método está obsoleto por questões de atualização tecnológica.
     */
    public decodficiarToken(token: string) {
        console.log(token);

        // ....
    }
}
