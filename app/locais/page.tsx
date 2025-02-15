import { Button } from "@/components/ui/button";
import Link from "next/link";

// Interface para tipar o Local
interface LocalModel {
  id: string;
  nome: string;
  tipo: string;
  descricao?: string;
  criadoEm: string;
  atualizadoEm: string;
}

export default async function LocaisPage() {
  // Busca os locais via fetch na rota de API
  const res = await fetch("http://localhost:3000/api/locais", {
    next: { revalidate: 0 },
  });
  const locais: LocalModel[] = await res.json();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Locais</h1>
      <Link href="/locais/novo">
        <Button variant="default">Novo Local</Button>
      </Link>

      <ul className="mt-4 space-y-2">
        {locais.map((local) => (
          <li key={local.id} className="border rounded p-2">
            <Link href={`/locais/${local.id}`} className="underline">
              {local.nome} - {local.tipo}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
