// app/materiais/novo/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NovoMaterialPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  // Função que chamará a rota de API (ou mock) para salvar
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Exemplo de chamada para rota de API /api/materiais (que criaremos depois)
    await fetch("/api/materiais", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, descricao }),
    });

    // Volta para a listagem
    router.push("/materiais");
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Novo Material</h1>
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
    </div>
  );
}
