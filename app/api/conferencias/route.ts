import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Definição das interfaces para tipagem
interface ConferenciaItem {
  id: string;
  quantidade?: number;
  status?: string;
  observacao?: string;
}

interface ConferenciaRequest {
  localId: string;
  responsavel: string;
  observacoes?: string;
  itens: ConferenciaItem[];
}

export async function POST(request: Request) {
  try {
    // Faz a conversão da requisição para o tipo ConferenciaRequest
    const data: ConferenciaRequest = await request.json();

    // Valida se os campos obrigatórios estão presentes
    if (!data.localId || !data.itens.length || !data.responsavel) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes." },
        { status: 400 }
      );
    }

    // Criação da conferência no banco de dados
    const conferencia = await prisma.conferencia.create({
      data: {
        localId: data.localId,
        dataConferencia: new Date(), // Data gerada automaticamente
        responsavel: data.responsavel,
        observacoes: data.observacoes || "", // Se não houver, salva string vazia
        itens: {
          create: data.itens.map((item) => ({
            materialId: item.id,
            quantidade: item.quantidade ?? 1, // Se não informado, assume 1
            status: item.status ?? "Presente", // Se não informado, assume "Presente"
            observacao: item.observacao ?? "",
          })),
        },
      },
    });

    return NextResponse.json(conferencia, { status: 201 });
  } catch (error) {
    console.error("Erro ao salvar conferência:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Busca todas as conferências, incluindo o nome do local
    const conferencias = await prisma.conferencia.findMany({
      include: {
        local: {
          select: { nome: true },
        },
      },
      orderBy: { dataConferencia: "desc" },
    });

    return NextResponse.json(conferencias);
  } catch (error) {
    console.error("Erro ao buscar histórico de conferências:", error);
    return NextResponse.json(
      { error: "Erro ao buscar conferências" },
      { status: 500 }
    );
  }
}
