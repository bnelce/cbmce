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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Local {
  id: string;
  nome: string;
  tipo: "Unidade" | "Viatura";
}

export default function NovaConferenciaPage() {
  const router = useRouter();
  const [locais, setLocais] = useState<Local[]>([]);
  const [localId, setLocalId] = useState<string>("");
  const [responsavel, setResponsavel] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLocais() {
      try {
        const res = await fetch("/api/locais");
        const data = await res.json();
        setLocais(data);
      } catch (error) {
        console.error("Erro ao carregar locais:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLocais();
  }, []);

  function iniciarConferencia() {
    if (!localId) return alert("Por favor, selecione um local.");
    if (!responsavel.trim()) return alert("Por favor, informe o responsável.");

    router.push(
      `/conferencias/nova/${localId}?responsavel=${encodeURIComponent(
        responsavel
      )}`
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Nova Conferência</h1>

      {loading ? (
        <p className="text-gray-500">Carregando locais...</p>
      ) : (
        <>
          <div className="mb-4">
            <label className="font-semibold">Local da Conferência</label>
            <Select onValueChange={(value) => setLocalId(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um local" />
              </SelectTrigger>
              <SelectContent>
                {locais.map((local) => (
                  <SelectItem key={local.id} value={local.id}>
                    {local.nome} ({local.tipo})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4">
            <label className="font-semibold">
              Responsável pela Conferência
            </label>
            <Input
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
              placeholder="Digite seu nome"
            />
          </div>
        </>
      )}

      <Button
        className="w-full"
        onClick={iniciarConferencia}
        disabled={!localId || !responsavel.trim()}
      >
        Iniciar Conferência
      </Button>
    </div>
  );
}
