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
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Local {
  id: string;
  nome: string;
  tipo: string;
  descricao?: string;
}

export default function EditLocalForm({ local }: { local: Local }) {
  const router = useRouter();
  const [nome, setNome] = useState(local.nome);
  const [tipo, setTipo] = useState(local.tipo);
  const [descricao, setDescricao] = useState(local.descricao || "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`/api/locais/${local.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, tipo, descricao }),
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert("Erro ao atualizar local.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="font-semibold">Nome</label>
        <Input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="font-semibold">Tipo</label>
        <Select onValueChange={setTipo} value={tipo}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Unidade">Unidade</SelectItem>
            <SelectItem value="Viatura">Viatura</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="font-semibold">Descrição</label>
        <Textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>
      <Button type="submit">Salvar</Button>
    </form>
  );
}
