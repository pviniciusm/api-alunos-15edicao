import { CriarAlunoDTO } from "../contracts/aluno.contract";
import { Result } from "../contracts/result.contract";
import repository from "../database/prisma.repository";
import { Aluno } from "../models/aluno.model";

// DDD - Domain Driven Design

export class AlunoService {
    public async criar(data: CriarAlunoDTO): Promise<Result> {
        // Validação de campos
        const resultValidacao = this.validarCamposCriar(data);
        if (!resultValidacao.ok) {
            return resultValidacao;
        }

        const aluno = new Aluno(data.nome, data.email, data.senha, data.tipo, data.idade);

        const result = await repository.aluno.create({
            data: aluno,
        });

        return {
            ok: true,
            message: "Usuário criado com sucesso",
            code: 201,
            data: result,
        };
    }

    private validarCamposCriar(data: CriarAlunoDTO): Result {
        // 1 - Não permitir que um aluno com nome menor que 3 caracteres seja cadastrado
        if (data.nome.length < 3) {
            return {
                ok: false,
                message: "O nome do aluno deve ter pelo menos 3 caracteres",
                code: 400,
            };
        }

        // 2 - Verificar se o e-mail contém pelo menos um "@"
        if (!data.email.includes("@")) {
            return {
                ok: false,
                message: "E-mail informado é inválido",
                code: 400,
            };
        }

        return {
            ok: true,
            code: 200,
            message: "Validação realizada com sucesso",
        };
    }
}
