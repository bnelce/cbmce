"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";

const materiaisMock = [
  { id: "1", nome: "Mangueira 1 1/2" },
  { id: "2", nome: "Extintor ABC" },
  { id: "3", nome: "Colete Salva-Vidas" },
];

export default function ConferenciaPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [itensConferidos, setItensConferidos] = useState<
    Record<string, boolean>
  >({});
  const [observacoes, setObservacoes] = useState<string>("");

  function toggleItem(id: string) {
    setItensConferidos((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function finalizarConferencia() {
    console.log("Conferência finalizada", {
      localId: params.id,
      itensConferidos,
      observacoes,
    });
    router.push("/conferencias");
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Conferindo Materiais</h1>
      <p className="text-gray-500 mb-4">
        Marque os itens que foram conferidos.
      </p>

      <ul className="space-y-3">
        {materiaisMock.map((mat) => (
          <li key={mat.id} className="flex items-center gap-2">
            <Checkbox
              checked={itensConferidos[mat.id] || false}
              onCheckedChange={() => toggleItem(mat.id)}
            />
            {mat.nome}
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <label className="font-semibold">Observações</label>
        <Textarea
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
        />
      </div>

      <Button className="mt-4 w-full" onClick={finalizarConferencia}>
        Finalizar Conferência
      </Button>
    </div>
  );
}
