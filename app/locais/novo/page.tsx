"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NovoLocalPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/locais", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, tipo, descricao }),
    });

    if (res.ok) {
      router.push("/locais");
    } else {
      alert("Erro ao criar local.");
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Novo Local</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="nome">Nome</Label>
          <Input
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Almoxarifado Central"
            required
          />
        </div>

        <div>
          <Label htmlFor="tipo">Tipo</Label>
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
            placeholder="Informações adicionais do local"
          />
        </div>

        <Button type="submit">Salvar</Button>
      </form>
    </div>
  );
}
