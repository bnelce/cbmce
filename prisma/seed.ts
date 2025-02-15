// prisma/seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Array de objetos que correspondem à tabela Material
  const materiais = [
    { nome: "Mangueira 1 1/2", descricao: "" },
    { nome: "Mangueira 2 1/2", descricao: "" },
    { nome: "Manômetros x 2", descricao: "" },
    { nome: "Esguicho regulável", descricao: "" },
    { nome: "Esguicho 1 1/2", descricao: "" },
    { nome: "Esguicho 2 1/2", descricao: "" },
    { nome: "Chave storz", descricao: "" },
    { nome: "Adaptador storz", descricao: "" },
    { nome: "Abrigo hidrante", descricao: "" },
    { nome: "Chave de hidrante", descricao: "" },
    { nome: "Extintor ABC", descricao: "" },
    { nome: "Bomba de porão", descricao: "" },
    { nome: "Bomba de recalque", descricao: "" },
    { nome: "Maleta de ferramentas", descricao: "" },
    { nome: "Lona", descricao: "" },
    { nome: "EPRA montados", descricao: "" },
    { nome: "Cilindros reservas", descricao: "" },
    { nome: "Malha de salvamento em altura", descricao: "" },
    { nome: "Escada prolongada galvanizada", descricao: "" },
    { nome: "Rede galvanizada", descricao: "" },
    { nome: "Barriga capitão serpente", descricao: "" },
    { nome: "Prancha aquática", descricao: "" },
    { nome: "Lanterna", descricao: "" },
    { nome: "Cordas", descricao: "" },
    { nome: "Flutuador", descricao: "" },
    { nome: "Carretilha rancho croque", descricao: "" },
    { nome: "Faca", descricao: "" },
    { nome: "Botas", descricao: "" },
    { nome: "Pá de cabo", descricao: "" },
    { nome: "Arame", descricao: "" },
    { nome: "Gancho e cabo", descricao: "" },
    { nome: "Mantas de borracha", descricao: "" },
    { nome: "Luvas hidrante", descricao: "" },
    { nome: "Bolsas salvamento", descricao: "" },
    { nome: "Maca envelope", descricao: "" },
    { nome: "Colete salva-vidas", descricao: "" },
  ];

  // Insere cada material. Em produção, você poderia usar createMany
  // mas aqui fazemos create individual para fins de logging/retorno.
  for (const mat of materiais) {
    await prisma.material.create({ data: mat });
  }

  console.log("Seed de materiais concluído!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
