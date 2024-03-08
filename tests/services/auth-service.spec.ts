import { AuthService } from "../../src/services/auth.service";
import { prismaMock } from "../config/prisma.mock";

import * as dotenv from "dotenv";
dotenv.config();

describe("Testes UNITÁRIOS de login no service de autenticação", () => {
    test("deve retornar falha 401 quando o usuário não existe no BD", async () => {
        // 1- SUT
        const authService = new AuthService();

        // Comportamento simulado
        // Simular que não existe qualquer aluno no BD (findFirst)
        prismaMock.aluno.findFirst.mockResolvedValue(null);

        // 2 - chamar o método
        const result = await authService.login({
            email: "daphne2@dog.com",
            senha: "12345",
        });

        // 3 - asserts
        expect(result).toBeDefined();

        expect(result).toHaveProperty("ok");
        expect(result.ok).toBe(false);

        expect(result).toHaveProperty("code", 401);
        expect(result).toHaveProperty("message", "Credenciais inválidas");

        expect(result).not.toHaveProperty("data");
        expect(result.data).toBeUndefined();
    });

    test("deve retornar sucesso (200) quando o login for feito com sucesso", async () => {
        const sut = new AuthService();

        // Simular
        // (findFirst) simular que o aluno existe
        prismaMock.aluno.findFirst.mockResolvedValue({
            id: "qualquer_id",
            dthrAtualizacao: new Date(),
            dthrCriacao: new Date(),
            email: "daphne@dog.com",
            idade: 1,
            nome: "qualquer_nome",
            senha: "12345",
            tipo: "X",
            token: "eyJqualquer_token",
        });

        const result = await sut.login({
            email: "daphne@dog.com",
            senha: "12345",
        });

        expect(result).toBeDefined();

        expect(result).toHaveProperty("ok", true);
        expect(result).toHaveProperty("code", 200);
        expect(result).toHaveProperty("message", "Login realizado com sucesso");
        expect(result).toHaveProperty("data");

        expect(result.data).toHaveProperty("id");
        expect(result.data).toHaveProperty("nome");
        expect(result.data).toHaveProperty("token");

        expect(result.data.token).toContain("eyJ");
    });
});
