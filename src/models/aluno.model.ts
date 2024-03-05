import { randomUUID } from "crypto";

export enum TipoAluno {
    Matriculado = "M",
    TechHelper = "T",
    Formado = "F",
}

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
