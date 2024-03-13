import supertest from "supertest";
import { createApp } from "../../src/util/api.helper";

describe("Testes integrados para a criação de um aluno via API", () => {
    test("Deveria retornar 400 caso o campo nome não seja informado", async () => {
        // 1 - SUT => quando teste de API, a própria API
        // 1 - Arrange
        const sut = createApp();
        // mocks...

        // 2 - Executar o método
        // 2 - Act
        const result = await supertest(sut).post("/aluno").send({
            idade: 20,
            email: "daphne@dog.com",
            senha: "12345",
        });

        // 3 - Asserts
        expect(result).toBeDefined();
        expect(result).toHaveProperty("ok", false);
        expect(result.statusCode).toEqual(400);

        expect(result.body).toBeDefined();
        expect(result.body).toHaveProperty("ok", false);
        expect(result.body).toHaveProperty("message", "Nome não foi informado");
    });
});
