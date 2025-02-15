// app/api/materials/route.ts

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/materials - retorna todos os materiais
export async function GET() {
  try {
    const materials = await prisma.material.findMany({
      orderBy: { criadoEm: "desc" },
    });
    return NextResponse.json(materials);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar materiais" + error },
      { status: 500 }
    );
  }
}

// app/api/materials/route.ts
// POST /api/materials - Cria um novo material
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Cria o novo material usando Prisma
    const material = await prisma.material.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        // Se precisar, adicione outros campos aqui (categoria, fotoUrl, etc.)
      },
    });

    return NextResponse.json(material, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar material" + error },
      { status: 500 }
    );
  }
}
