import { TipoAluno } from "../../src/models/aluno.model";
import { AlunoService } from "../../src/services/aluno.service";
import { prismaMock } from "../config/prisma.mock";

describe("Testes unitários do método criar de AlunoService", () => {
    // Função executada antes de cada teste
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();

        prismaMock.aluno.create.mockResolvedValue({
            email: "jose@dog.com",
            senha: "12345",
            nome: "aaa",
            tipo: "F",
            id: "aaa",
            dthrAtualizacao: new Date(),
            dthrCriacao: new Date(),
            token: "",
            idade: 1,
        });
    });

    // Função executada antes do primeiro teste do describe
    beforeAll(() => {
        // ...
    });

    // Função executada depois de cada teste
    afterEach(() => {
        // ...
    });

    // Função executada depois do último teste do describe
    afterAll(() => {
        // ...
    });

    // 1 - Retornar 400 se o nome for menor que 3 caracteres
    test("Deveria retornar 400 se o nome for menor que 3 caracteres", async () => {
        // 1 - SUT
        const sut = new AlunoService();

        // 2 - Executar o método (mock e param de entrada)
        const result = await sut.criar({
            email: "jose@dog.com",
            senha: "12345",
            nome: "a",
            tipo: TipoAluno.Formado,
        });

        // 3 - Asserts
        expect(result).toBeDefined();
        expect(result).toHaveProperty("ok", false);
        expect(result).toHaveProperty("message", "O nome do aluno deve ter pelo menos 3 caracteres");
        expect(result).toHaveProperty("code", 400);
    });

    // 2 - Retornar 400 se o e-mail informado não possui @
    test("Deveria retornar 400 se o e-mail informado não possui @", async () => {
        // 1 - SUT
        const sut = new AlunoService();

        // 2 - Executar o método (mock e param de entrada)
        const result = await sut.criar({
            email: "josedog.com",
            senha: "12345",
            nome: "aaaa",
            tipo: TipoAluno.Formado,
        });

        // 3 - Asserts
        expect(result).toBeDefined();
        expect(result).toHaveProperty("ok", false);
        expect(result).toHaveProperty("message", "E-mail informado é inválido");
        expect(result).toHaveProperty("code", 400);
    });

    // 3 - Retornar 201 se o aluno foi criado com sucesso

    // 4 - to-do - tratar possível erro no repository.create
});
