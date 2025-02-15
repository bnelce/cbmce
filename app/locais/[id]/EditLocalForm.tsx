"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LocalModel {
  id: string;
  nome: string;
  tipo: string;
  descricao?: string;
}

export default function EditLocalForm({ local }: { local: LocalModel }) {
  const router = useRouter();

  const [nome, setNome] = useState(local.nome);
  const [tipo, setTipo] = useState(local.tipo);
  const [descricao, setDescricao] = useState(local.descricao || "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validação simples no front-end
    if (!nome || !tipo) {
      alert("Nome e Tipo são obrigatórios.");
      return;
    }

    const res = await fetch(`/api/locais/${local.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, tipo, descricao }),
    });

    if (res.ok) {
      router.push("/locais");
    } else {
      alert("Erro ao atualizar local.");
    }
  }

  async function handleDelete() {
    if (!confirm("Tem certeza de que deseja excluir este local?")) {
      return;
    }
    const res = await fetch(`/api/locais/${local.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/locais");
    } else {
      const data = await res.json();
      alert(data.error || "Erro ao excluir local.");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="nome">Nome *</Label>
          <Input
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="tipo">Tipo *</Label>
          <select
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
            className="border border-gray-300 rounded px-2 py-1 w-full"
          >
            <option value="">Selecione o tipo...</option>
            <option value="Unidade">Unidade</option>
            <option value="Viatura">Viatura</option>
          </select>
        </div>

        <div>
          <Label htmlFor="descricao">Descrição</Label>
          <Textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <Button type="submit">Salvar</Button>
      </form>

      <div className="mt-4">
        <Button variant="destructive" onClick={handleDelete}>
          Excluir Local
        </Button>
      </div>
    </div>
  );
}
