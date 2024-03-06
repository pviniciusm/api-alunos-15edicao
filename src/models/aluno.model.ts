import { randomUUID } from "crypto";

/**
 * Possíveis tipos de alunos da Growdev.
 */
export enum TipoAluno {
    /** Representa um aluno que possui matrícula ativa */
    Matriculado = "M",
    /** Um aluno que também é Tech Helper */
    TechHelper = "T",
    /**  */
    Formado = "F",
}

/**
 * Esta classe representa um aluno da Growdev.
 */
export class Aluno {
    public id: string;

    constructor(
        public nome: string,
        public email: string,
        public senha: string,
        public tipo: TipoAluno,
        public idade?: number
    ) {
        this.id = randomUUID();
    }
}
