// app/api/seeds/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Array de materiais conforme a lista extraída da imagem
    const materiais = [
      { nome: "Mangueira 1 1/2", descricao: "" },
      { nome: "Mangueira 2 1/2", descricao: "" },
      { nome: "Manômetro", descricao: "" },
      { nome: "Esguicho regulável", descricao: "" },
      { nome: "Esguicho 1 1/2", descricao: "" },
      { nome: "Esguicho 2 1/2", descricao: "" },
      { nome: "Chave storz", descricao: "" },
      { nome: "Adaptador storz", descricao: "" },
      { nome: "Abrigo hidrante", descricao: "" },
      { nome: "Chave hidrante", descricao: "" },
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

    // Insere todos os materiais de uma vez, ignorando duplicatas (caso já existam)
    await prisma.material.createMany({
      data: materiais,
    });

    return NextResponse.json(
      { message: "Seed de materiais inserido com sucesso!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao inserir seeds: " + error },
      { status: 500 }
    );
  }
}
