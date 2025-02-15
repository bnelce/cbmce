"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Material {
  id: string;
  nome: string;
  descricao?: string;
}

export default function EditMaterialForm({ material }: { material: Material }) {
  const router = useRouter();

  const [nome, setNome] = useState(material.nome);
  const [descricao, setDescricao] = useState(material.descricao || "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`/api/materiais/${material.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, descricao }),
    });

    if (res.ok) {
      router.push("/materiais");
    } else {
      alert("Erro ao atualizar material.");
    }
  }

  async function handleDelete() {
    if (!confirm("Tem certeza de que deseja excluir este material?")) {
      return;
    }
    const res = await fetch(`/api/materiais/${material.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/materiais");
    } else {
      const data = await res.json();
      alert(data.error || "Erro ao excluir material.");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="nome">Nome</Label>
          <Input
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Mangueira de Incêndio"
            required
          />
        </div>
        <div>
          <Label htmlFor="descricao">Descrição</Label>
          <Textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Detalhes do material"
          />
        </div>
        <Button type="submit">Salvar</Button>
      </form>
      <div className="mt-4">
        <Button variant="destructive" onClick={handleDelete}>
          Excluir Material
        </Button>
      </div>
    </div>
  );
}
