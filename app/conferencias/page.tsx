import { HistoricoPdfDownload } from "@/components/HistoricoPdfDownload";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ConferenciasPage() {
  const conferencias = await prisma.conferencia.findMany({
    include: { local: { select: { nome: true } } },
    orderBy: { dataConferencia: "desc" },
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Conferências</h1>

      <Link href="/conferencias/nova">
        <Button variant="default">Nova Conferência</Button>
      </Link>

      <h2 className="text-lg font-semibold mt-6">Histórico</h2>

      {conferencias.length === 0 ? (
        <p className="text-gray-500">Nenhuma conferência registrada ainda.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {conferencias.map((conf) => (
            <li key={conf.id} className="border p-2 rounded">
              <p>
                <strong>Local:</strong> {conf.local?.nome || "Desconhecido"}
              </p>
              <p>
                <strong>Data:</strong>{" "}
                {new Date(conf.dataConferencia).toLocaleString()}
              </p>
              <p>
                <strong>Responsável:</strong> {conf.responsavel}
              </p>

              {/* Área de botões: Ver Detalhes + Gerar PDF */}
              <div className="mt-2 flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Link href={`/conferencias/${conf.id}`}>Ver detalhes</Link>
                </Button>

                {/* Botão para baixar PDF */}
                <HistoricoPdfDownload conferenciaId={conf.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
