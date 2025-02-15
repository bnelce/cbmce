import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/locais - retorna todos os locais
export async function GET() {
  try {
    const locais = await prisma.local.findMany({
      orderBy: { nome: "asc" },
    });
    return NextResponse.json(locais);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar locais: " },
      { status: 500 }
    );
  }
}

// POST /api/locais - cria um novo local
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const novoLocal = await prisma.local.create({
      data: {
        nome: data.nome,
        tipo: data.tipo,
        descricao: data.descricao,
      },
    });
    return NextResponse.json(novoLocal, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar local: " + error },
      { status: 500 }
    );
  }
}
