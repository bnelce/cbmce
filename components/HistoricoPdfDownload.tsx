"use client";

import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { ConferenciaPdfDownload } from "./ConferenciaPdf";

interface Conferencia {
  id: string;
  dataConferencia: string;
  responsavel: string;
  observacoes?: string;
  local?: {
    nome: string;
  };
  itens: {
    id: string;
    quantidade: number;
    status: "Conforme" | "NaoConforme";
    observacao?: string;
    material?: {
      id: string;
      nome: string;
    };
  }[];
}

interface Props {
  conferenciaId: string;
}

export function HistoricoPdfDownload({ conferenciaId }: Props) {
  const [conferencia, setConferencia] = useState<Conferencia | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchAndSetConferencia() {
    try {
      setLoading(true);
      const res = await fetch(`/api/conferencias/${conferenciaId}`);
      if (!res.ok) {
        throw new Error("Erro ao buscar dados da conferência");
      }
      const data = await res.json();
      setConferencia(data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar conferência:", error);
      alert("Não foi possível gerar o PDF.");
      setLoading(false);
    }
  }

  if (!conferencia) {
    // Caso ainda não tenha carregado os dados da conferência
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={fetchAndSetConferencia}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Carregando...
          </>
        ) : (
          "Gerar PDF"
        )}
      </Button>
    );
  }

  // Monta os dados para o PDF
  const dataFormatada = new Date(conferencia.dataConferencia).toLocaleString(
    "pt-BR"
  );
  const pdfData = {
    id: conferencia.id,
    local: conferencia.local?.nome || "Desconhecido",
    dataConferencia: dataFormatada,
    responsavel: conferencia.responsavel,
    observacoes: conferencia.observacoes || "",
    itens: conferencia.itens.map((item) => ({
      id: item.id,
      materialNome: item.material?.nome || "Material?",
      status: item.status as "Conforme" | "NaoConforme",
      quantidade: item.status === "NaoConforme" ? item.quantidade : undefined,
      observacao: item.observacao,
    })),
  };

  return (
    <PDFDownloadLink
      document={<ConferenciaPdfDownload data={pdfData} />}
      fileName={`conferencia-${conferencia.id}.pdf`}
    >
      {({ loading: pdfLoading }) =>
        pdfLoading ? (
          <Button variant="outline" size="sm" disabled>
            Gerando PDF...
          </Button>
        ) : (
          <Button variant="outline" size="sm">
            Baixar PDF
          </Button>
        )
      }
    </PDFDownloadLink>
  );
}
