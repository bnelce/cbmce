"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";

// Tipagem dos dados
interface Material {
  id: string;
  nome: string;
}

interface InventarioItem {
  id: string;
  materialId: string;
  quantidadeMinima: number;
}

export default function EditInventarioForm({ localId }: { localId: string }) {
  const [materiais, setMateriais] = useState<Material[]>([]);
  const [inventario, setInventario] = useState<InventarioItem[]>([]);
  const [materialId, setMaterialId] = useState("");
  const [quantidadeMinima, setQuantidadeMinima] = useState(1);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const resMateriais = await fetch("/api/materiais");
        const dataMateriais = await resMateriais.json();
        setMateriais(dataMateriais);

        const resInventario = await fetch(`/api/locais/${localId}/inventario`);
        const dataInventario = await resInventario.json();
        setInventario(dataInventario);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    fetchData();
  }, [localId]);

  async function adicionarMaterial() {
    if (!materialId) return alert("Selecione um material!");

    const res = await fetch(`/api/locais/${localId}/inventario`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ materialId, quantidadeMinima }),
    });

    if (res.ok) {
      const novoItem = await res.json();
      setInventario([...inventario, novoItem]);
      setMaterialId("");
      setQuantidadeMinima(1);
      setErro(null);
    } else {
      const data = await res.json();
      setErro(data.error || "Erro ao adicionar material.");
    }
  }

  async function atualizarQuantidade(
    materialId: string,
    novaQuantidade: number
  ) {
    if (novaQuantidade < 1)
      return alert("A quantidade mínima deve ser maior que 0.");

    const res = await fetch(`/api/locais/${localId}/inventario/${materialId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantidadeMinima: novaQuantidade }),
    });

    if (res.ok) {
      setInventario(
        inventario.map((item) =>
          item.materialId === materialId
            ? { ...item, quantidadeMinima: novaQuantidade }
            : item
        )
      );
    } else {
      alert("Erro ao atualizar a quantidade mínima.");
    }
  }

  async function excluirMaterial(materialId: string) {
    if (
      !confirm("Tem certeza que deseja remover este material do inventário?")
    ) {
      return;
    }

    const res = await fetch(`/api/locais/${localId}/inventario/${materialId}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (res.ok) {
      setInventario(
        inventario.filter((item) => item.materialId !== materialId)
      );
    } else {
      alert(data.error || "Erro ao excluir material.");
    }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold">Adicionar Material</h2>

      {erro && <p className="text-red-500">{erro}</p>}

      <div className="flex gap-2 mt-2">
        <Select onValueChange={setMaterialId} value={materialId}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um material" />
          </SelectTrigger>
          <SelectContent>
            {materiais
              .filter(
                (mat) => !inventario.some((item) => item.materialId === mat.id)
              ) // Remove duplicatas
              .map((mat) => (
                <SelectItem key={mat.id} value={mat.id}>
                  {mat.nome}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <Input
          type="number"
          value={quantidadeMinima}
          onChange={(e) => setQuantidadeMinima(parseInt(e.target.value))}
          min={1}
        />
        <Button onClick={adicionarMaterial}>Adicionar</Button>
      </div>

      <h2 className="text-lg font-semibold mt-4">Inventário Atual</h2>
      <ul className="mt-2 space-y-2">
        {inventario.map((item) => (
          <li
            key={item.id}
            className="border p-2 rounded flex items-center justify-between"
          >
            <span>{materiais.find((m) => m.id === item.materialId)?.nome}</span>
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                value={item.quantidadeMinima}
                onChange={(e) =>
                  atualizarQuantidade(item.materialId, parseInt(e.target.value))
                }
                min={1}
                className="w-16 text-center"
              />
              <Button
                variant="destructive"
                size="icon"
                onClick={() => excluirMaterial(item.materialId)}
              >
                <Trash size={16} />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
