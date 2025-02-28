// app/api/materials/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// app/api/materiais/route.ts

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const localId = searchParams.get("localId");

  try {
    if (localId) {
      // Retorna somente materiais do inventário do local
      const inventario = await prisma.localMaterial.findMany({
        where: { localId },
        include: { material: true },
      });

      return NextResponse.json(
        inventario.map((item) => ({
          id: item.material.id,
          nome: item.material.nome,
          quantidadeMinima: item.quantidadeMinima,
        }))
      );
    } else {
      // Se não tiver localId, retorna TODOS os materiais
      const todosMateriais = await prisma.material.findMany({
        orderBy: { criadoEm: "desc" },
      });
      return NextResponse.json(todosMateriais);
    }
  } catch (error) {
    console.error("Erro ao buscar materiais:", error);
    return NextResponse.json(
      { error: "Erro ao buscar materiais." },
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
