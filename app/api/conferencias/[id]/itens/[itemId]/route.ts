import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// DELETE /api/conferencias/[id]/itens/[itemId] - Remove um item da conferência
export async function DELETE(
  request: Request,
  { params }: { params: { id: string; itemId: string } }
) {
  try {
    // Verifica se o item existe antes de tentar remover
    const item = await prisma.conferenciaItem.findUnique({
      where: { id: params.itemId },
    });

    if (!item) {
      return NextResponse.json(
        { error: "Item não encontrado" },
        { status: 404 }
      );
    }

    // Remove o item da conferência
    await prisma.conferenciaItem.delete({
      where: { id: params.itemId },
    });

    return NextResponse.json({ message: "Item removido com sucesso" });
  } catch (error) {
    console.error("Erro ao remover item:", error);
    return NextResponse.json(
      { error: "Erro ao remover item" },
      { status: 500 }
    );
  }
}
