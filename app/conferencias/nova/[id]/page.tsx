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
import { useState } from "react";

export default function NovaConferenciaPage() {
  const router = useRouter();
  const [localId, setLocalId] = useState("");

  function iniciarConferencia() {
    if (!localId) return alert("Por favor, selecione um local.");

    // Redireciona para a conferência com o local escolhido
    router.push(`/conferencias/nova/${localId}`);
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Nova Conferência</h1>

      <Select onValueChange={(value) => setLocalId(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione um local" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Almoxarifado Central</SelectItem>
          <SelectItem value="2">Viatura ABT-001</SelectItem>
        </SelectContent>
      </Select>

      <Button className="mt-4 w-full" onClick={iniciarConferencia}>
        Iniciar Conferência
      </Button>
    </div>
  );
}
