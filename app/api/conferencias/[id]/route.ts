import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const conferencia = await prisma.conferencia.findUnique({
      where: { id: params.id },
      include: {
        local: { select: { nome: true } },
        itens: {
          include: {
            material: true,
          },
        },
      },
    });

    if (!conferencia) {
      return NextResponse.json(
        { error: "Conferência não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(conferencia);
  } catch (error) {
    console.error("Erro ao buscar conferência:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar conferência" },
      { status: 500 }
    );
  }
}
