import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// PUT /api/materiais/[id] (mantém o que já foi implementado)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const updatedMaterial = await prisma.material.update({
      where: { id: params.id },
      data: {
        nome: data.nome,
        descricao: data.descricao,
        // Se quiser atualizar outros campos (categoria, fotoUrl, etc.), adicione-os aqui
      },
    });
    return NextResponse.json(updatedMaterial);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar material: " + error },
      { status: 500 }
    );
  }
}

// DELETE /api/materiais/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Busca o material e inclui a relação "conferenciaItems"
    const material = await prisma.material.findUnique({
      where: { id: params.id },
      include: { conferenciaItems: true },
    });

    if (!material) {
      return NextResponse.json(
        { error: "Material não encontrado." },
        { status: 404 }
      );
    }

    // Se houver dependências, não permite a exclusão
    if (material.conferenciaItems && material.conferenciaItems.length > 0) {
      return NextResponse.json(
        {
          error:
            "Não é possível excluir o material, pois existem dependências associadas.",
        },
        { status: 400 }
      );
    }

    // Se não houver dependências, exclui o material
    await prisma.material.delete({
      where: { id: params.id },
    });
    return NextResponse.json({
      message: "Material excluído com sucesso.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao excluir material: " + error },
      { status: 500 }
    );
  }
}
