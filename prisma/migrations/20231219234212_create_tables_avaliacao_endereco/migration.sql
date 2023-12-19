-- CreateTable
CREATE TABLE "endereco" (
    "id_aluno" UUID NOT NULL,
    "rua" VARCHAR(30) NOT NULL,
    "cidade" VARCHAR(30) NOT NULL,
    "uf" CHAR(2) NOT NULL,
    "dthr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dthr_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "endereco_pkey" PRIMARY KEY ("id_aluno")
);

-- CreateTable
CREATE TABLE "avaliacao" (
    "id" UUID NOT NULL,
    "disciplina" VARCHAR(30) NOT NULL,
    "nota" DECIMAL(3,1) NOT NULL,
    "id_aluno" UUID NOT NULL,
    "dthr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dthr_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "avaliacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacao" ADD CONSTRAINT "avaliacao_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
