import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// PATCH /api/locais/[id]/inventario/[materialId] - Atualiza a quantidade mínima
export async function PATCH(
  request: Request,
  { params }: { params: { id: string; materialId: string } }
) {
  try {
    const { quantidadeMinima } = await request.json();

    if (!quantidadeMinima || quantidadeMinima < 1) {
      return NextResponse.json(
        { error: "Quantidade mínima inválida." },
        { status: 400 }
      );
    }

    // Atualiza o valor no banco de dados
    const inventarioAtualizado = await prisma.localMaterial.update({
      where: {
        localId_materialId: {
          localId: params.id,
          materialId: params.materialId,
        },
      },
      data: { quantidadeMinima },
    });

    return NextResponse.json(inventarioAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar quantidade mínima:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar quantidade." },
      { status: 500 }
    );
  }
}

// DELETE /api/locais/[localId]/inventario/[materialId] - Remove material do inventário
export async function DELETE(
  request: Request,
  context: { params: { localId: string; materialId: string } }
) {
  try {
    // Extraindo parâmetros corretamente
    const { localId, materialId } = context.params;

    // Verifica se o material já foi usado em alguma conferência
    const referenciaEmConferencia = await prisma.conferenciaItem.findFirst({
      where: { materialId },
    });

    if (referenciaEmConferencia) {
      return NextResponse.json(
        {
          error:
            "Este material já foi utilizado em uma conferência e não pode ser removido.",
        },
        { status: 400 }
      );
    }

    // Remove o material do inventário do local
    await prisma.localMaterial.deleteMany({
      where: {
        localId,
        materialId,
      },
    });

    return NextResponse.json({
      message: "Material removido do inventário com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao remover material do inventário:", error);
    return NextResponse.json(
      { error: "Erro ao remover material." },
      { status: 500 }
    );
  }
}
