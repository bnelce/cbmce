"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Material {
  id: string;
  nome: string;
  quantidadeMinima: number;
}

// Só dois status: Conforme ou NaoConforme
interface ConferenciaItem {
  id: string;
  quantidade?: number;
  status?: "Conforme" | "NaoConforme";
  observacao?: string;
}

export default function ConferenciaPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Lê o "responsavel" da query string, ex: /conferencias/nova/[id]?responsavel=Fulano
  const responsavelParam = searchParams.get("responsavel") || "Não Informado";

  const [materiais, setMateriais] = useState<Material[]>([]);
  const [itensConferidos, setItensConferidos] = useState<
    Record<string, ConferenciaItem>
  >({});
  const [observacoesGerais, setObservacoesGerais] = useState("");

  // Buscar materiais do inventário do local
  useEffect(() => {
    async function fetchMateriais() {
      try {
        const res = await fetch(`/api/materiais?localId=${params.id}`);
        const data = await res.json();
        setMateriais(data);
      } catch (error) {
        console.error("Erro ao carregar materiais:", error);
      }
    }
    fetchMateriais();
  }, [params.id]);

  // Marca status (Conforme/NaoConforme) no item
  function toggleItemStatus(id: string, status: "Conforme" | "NaoConforme") {
    setItensConferidos((prev) => ({
      ...prev,
      [id]: { ...prev[id], id, status },
    }));
  }

  // Atualiza a quantidade quando "NaoConforme"
  function updateItemQuantidade(id: string, quantidade: number) {
    setItensConferidos((prev) => ({
      ...prev,
      [id]: { ...prev[id], id, quantidade },
    }));
  }

  // Observação caso seja "NaoConforme"
  function updateItemObservacao(id: string, observacao: string) {
    setItensConferidos((prev) => ({
      ...prev,
      [id]: { ...prev[id], id, observacao },
    }));
  }

  // Excluir item da conferência
  function excluirItem(id: string) {
    // Remove do estado itensConferidos
    setItensConferidos((prev) => {
      const novosItens = { ...prev };
      delete novosItens[id];
      return novosItens;
    });
    // Remove também do array de materiais
    setMateriais((prev) => prev.filter((m) => m.id !== id));
  }

  // Finaliza a conferência e salva no banco
  async function finalizarConferencia() {
    const conferenciaData = {
      localId: params.id,
      responsavel: responsavelParam, // Usa o valor da query string
      observacoes: observacoesGerais,
      itens: Object.values(itensConferidos),
    };

    const res = await fetch("/api/conferencias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(conferenciaData),
    });

    if (res.ok) {
      router.push("/conferencias");
    } else {
      alert("Erro ao finalizar conferência.");
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Conferindo Materiais</h1>

      {/* Exibe o responsável */}
      <p className="text-sm text-gray-600 mb-4">
        <strong>Responsável:</strong> {responsavelParam}
      </p>

      <ul className="space-y-3">
        {materiais.map((mat) => {
          const item = itensConferidos[mat.id] || {};
          return (
            <li key={mat.id} className="border p-2 rounded flex flex-col gap-2">
              {/* Cabeçalho do item */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{mat.nome}</p>
                  <p className="text-sm text-gray-600">
                    <strong>Quantidade Mínima:</strong> {mat.quantidadeMinima}
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => excluirItem(mat.id)}
                >
                  <Trash size={16} />
                </Button>
              </div>

              {/* Botões de status (Conforme / NaoConforme) */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={item.status === "Conforme" ? "default" : "outline"}
                  onClick={() => toggleItemStatus(mat.id, "Conforme")}
                >
                  ✅ Conforme
                </Button>
                <Button
                  size="sm"
                  variant={
                    item.status === "NaoConforme" ? "default" : "outline"
                  }
                  onClick={() => toggleItemStatus(mat.id, "NaoConforme")}
                >
                  ❌ Não Conforme
                </Button>
              </div>

              {/* Se for "NaoConforme", pede quantidade real e observação opcional */}
              {item.status === "NaoConforme" && (
                <div className="mt-2">
                  <label className="block text-sm font-semibold">
                    Quantidade Contabilizada
                  </label>
                  <Input
                    type="number"
                    min={0}
                    value={item.quantidade ?? 0}
                    onChange={(e) =>
                      updateItemQuantidade(mat.id, parseInt(e.target.value))
                    }
                    className="w-24"
                  />

                  <label className="block text-sm font-semibold mt-2">
                    Observação (opcional)
                  </label>
                  <Textarea
                    value={item.observacao ?? ""}
                    onChange={(e) =>
                      updateItemObservacao(mat.id, e.target.value)
                    }
                    placeholder="Descreva a não conformidade..."
                  />
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Observações gerais da conferência */}
      <div className="mt-4">
        <label className="font-semibold">Observações Gerais</label>
        <Textarea
          value={observacoesGerais}
          onChange={(e) => setObservacoesGerais(e.target.value)}
        />
      </div>

      <Button className="mt-4 w-full" onClick={finalizarConferencia}>
        Finalizar Conferência
      </Button>
    </div>
  );
}
