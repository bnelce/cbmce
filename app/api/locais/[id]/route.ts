import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// PUT /api/locais/[id] - atualiza um local
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const updatedLocal = await prisma.local.update({
      where: { id: params.id },
      data: {
        nome: data.nome,
        tipo: data.tipo,
        descricao: data.descricao,
      },
    });
    return NextResponse.json(updatedLocal);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar local: " + error },
      { status: 500 }
    );
  }
}

// DELETE /api/locais/[id] - exclui um local, verificando dependências
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Busca o local e inclui as conferências para checar dependências
    const local = await prisma.local.findUnique({
      where: { id: params.id },
      include: { conferencias: true },
    });

    if (!local) {
      return NextResponse.json(
        { error: "Local não encontrado." },
        { status: 404 }
      );
    }

    // Se houver dependências (conferencias), não permite a exclusão
    if (local.conferencias && local.conferencias.length > 0) {
      return NextResponse.json(
        {
          error:
            "Não é possível excluir o local, pois existem conferências associadas.",
        },
        { status: 400 }
      );
    }

    // Se não houver dependências, exclui o local
    await prisma.local.delete({
      where: { id: params.id },
    });
    return NextResponse.json({
      message: "Local excluído com sucesso.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao excluir local: " + error },
      { status: 500 }
    );
  }
}
