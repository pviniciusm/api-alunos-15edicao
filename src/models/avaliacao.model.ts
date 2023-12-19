import { randomUUID } from "crypto";
import { Aluno } from "./aluno.model";

export class Avaliacao {
    public id: string;

    constructor(
        public disciplina: string,
        public nota: number,
        public aluno: Aluno
    ) {
        this.id = randomUUID();
    }
}
