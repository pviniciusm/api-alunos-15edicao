import { PayloadToken } from "../contracts/login.contract";
import { Result } from "../contracts/result.contract";
import { TipoAluno } from "../models/aluno.model";
import { AuthService } from "./auth.service";

export class AutorizacaoService {
    public validateAutorizacao(token: string, tiposPermitidos: TipoAluno[]): Result {
        const service = new AuthService();
        const payload = service.decodeToken(token) as PayloadToken;

        if (!tiposPermitidos.includes(payload.tipo)) {
            return {
                ok: false,
                message: "O usuário não possui autorização para esta operação",
                code: 403,
            };
        }

        return {
            ok: true,
            message: "Validação feita com sucesso",
            code: 200,
        };
    }

    public validateAluno(token: string, id: string): Result {
        const authService = new AuthService();
        const payload = authService.decodeToken(token) as PayloadToken;

        if (payload.id != id && payload.tipo == TipoAluno.Matriculado) {
            return {
                ok: false,
                message: "O aluno não tem permissão para realizar uma operação de outro aluno",
                code: 403,
            };
        }

        return {
            ok: true,
            message: "Validação realizada com sucesso",
            code: 200,
        };
    }
}
