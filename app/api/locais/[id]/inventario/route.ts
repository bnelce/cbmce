import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/locais/[id]/inventario - Lista materiais do local
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const inventario = await prisma.localMaterial.findMany({
      where: { localId: params.id },
      include: { material: true },
    });

    return NextResponse.json(inventario);
  } catch (error) {
    console.error("Erro ao buscar inventário:", error);
    return NextResponse.json(
      { error: "Erro ao buscar inventário" },
      { status: 500 }
    );
  }
}

// POST /api/locais/[id]/inventario - Adiciona um material ao inventário (SEM DUPLICATAS)
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();

    if (!data.materialId || !data.quantidadeMinima) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes" },
        { status: 400 }
      );
    }

    // Verifica se o material já existe no inventário do local
    const materialExistente = await prisma.localMaterial.findFirst({
      where: { localId: params.id, materialId: data.materialId },
    });

    if (materialExistente) {
      return NextResponse.json(
        { error: "Material já está no inventário deste local" },
        { status: 400 }
      );
    }

    // Insere o material no inventário
    const novoItem = await prisma.localMaterial.create({
      data: {
        localId: params.id,
        materialId: data.materialId,
        quantidadeMinima: data.quantidadeMinima,
      },
    });

    return NextResponse.json(novoItem, { status: 201 });
  } catch (error) {
    console.error("Erro ao adicionar material ao inventário:", error);
    return NextResponse.json(
      { error: "Erro ao adicionar material" },
      { status: 500 }
    );
  }
}
