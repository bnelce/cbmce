import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ConferenciaPdfDownload } from "../../../components/ConferenciaPdf"; // Ajuste o caminho conforme sua estrutura

export default async function ConferenciaDetalhesPage({
  params,
}: {
  params: { id: string };
}) {
  const conferencia = await prisma.conferencia.findUnique({
    where: { id: params.id },
    include: {
      local: { select: { nome: true } },
      itens: {
        include: { material: true },
      },
    },
  });

  if (!conferencia) {
    return notFound();
  }

  // Formatando data e hora
  const dataFormatada = new Date(conferencia.dataConferencia).toLocaleString(
    "pt-BR",
    {
      dateStyle: "short",
      timeStyle: "short",
    }
  );

  // Monta dados para PDF
  const pdfData = {
    id: conferencia.id,
    local: conferencia.local?.nome || "Desconhecido",
    dataConferencia: dataFormatada,
    responsavel: conferencia.responsavel,
    observacoes: conferencia.observacoes || "",
    itens: conferencia.itens.map((item) => ({
      id: item.id,
      materialNome: item.material.nome,
      status: item.status as "Conforme" | "NaoConforme",
      quantidade: item.status === "NaoConforme" ? item.quantidade : undefined,
      observacao: item.observacao,
    })),
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Detalhes da Conferência</h1>

      <div className="mb-6">
        <p>
          <strong>Local:</strong> {pdfData.local}
        </p>
        <p>
          <strong>Data:</strong> {pdfData.dataConferencia}
        </p>
        <p>
          <strong>Responsável:</strong> {pdfData.responsavel}
        </p>
        {pdfData.observacoes && (
          <p className="mt-2">
            <strong>Observações Gerais:</strong> {pdfData.observacoes}
          </p>
        )}
      </div>

      <h2 className="text-lg font-semibold mb-2">Itens Conferidos</h2>
      <div className="bg-white border rounded p-2">
        {pdfData.itens.length === 0 ? (
          <p className="text-gray-500">Nenhum item registrado.</p>
        ) : (
          <ul className="divide-y">
            {pdfData.itens.map((it) => (
              <li key={it.id} className="py-2">
                <p className="font-semibold">{it.materialNome}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  {it.status === "Conforme" ? "Conforme" : "Não Conforme"}
                </p>
                {it.status === "NaoConforme" && (
                  <>
                    <p>
                      <strong>Quantidade Contabilizada:</strong> {it.quantidade}
                    </p>
                    {it.observacao && (
                      <p>
                        <strong>Observação:</strong> {it.observacao}
                      </p>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Botão para baixar PDF */}
      <div className="mt-6">
        <ConferenciaPdfDownload data={pdfData} />
      </div>
    </div>
  );
}
