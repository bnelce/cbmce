import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ConferenciasPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Conferências</h1>

      <Link href="/conferencias/nova">
        <Button variant="default">Nova Conferência</Button>
      </Link>

      <h2 className="text-lg font-semibold mt-6">Histórico</h2>
      <p className="text-gray-500">Nenhuma conferência registrada ainda.</p>
    </div>
  );
}
