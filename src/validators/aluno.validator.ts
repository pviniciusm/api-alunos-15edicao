import { CriarAlunoDTO } from "../contracts/aluno.contract";
import { Result } from "../contracts/result.contract";

export function validarCamposCriarFunction(data: CriarAlunoDTO): Result {
    // 1 - Não permitir que um aluno com nome menor que 3 caracteres seja cadastrado
    if (data.nome.length < 3) {
        return {
            ok: false,
            message: "O nome do aluno deve ter pelo menos 3 caracteres",
            code: 400,
        };
    }

    // 2 - ...

    return {
        ok: true,
        code: 200,
        message: "Validação realizada com sucesso",
    };
}
