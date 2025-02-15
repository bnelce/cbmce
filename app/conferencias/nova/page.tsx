"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Definição do tipo Local
interface Local {
  id: string;
  nome: string;
  tipo: "Unidade" | "Viatura";
}

export default function NovaConferenciaPage() {
  const router = useRouter();
  const [locais, setLocais] = useState<Local[]>([]);
  const [localId, setLocalId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // Carrega os locais dinamicamente
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

    router.push(`/conferencias/nova/${localId}`);
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Nova Conferência</h1>

      {loading ? (
        <p className="text-gray-500">Carregando locais...</p>
      ) : (
        <>
          {locais.length > 0 ? (
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
          ) : (
            <p className="text-gray-500">Nenhum local encontrado.</p>
          )}
        </>
      )}

      <Button
        className="mt-4 w-full"
        onClick={iniciarConferencia}
        disabled={!localId}
      >
        Iniciar Conferência
      </Button>
    </div>
  );
}
