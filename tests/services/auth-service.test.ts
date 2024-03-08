import { AuthService } from "../../src/services/auth.service";

describe("Testes de login no service de autenticação", () => {
    test("deve retornar falha 401 quando o usuário não existe no BD", async () => {
        // 1- SUT
        const authService = new AuthService();

        // 2 - chamar o método
        const result = await authService.login({
            email: "aaaaaa@dog.com",
            senha: "123213213",
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

    // ...

    test("deve retornar sucesso (200) quando o login for feito com sucesso", async () => {
        const sut = new AuthService();

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
