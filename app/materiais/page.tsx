// app/materiais/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Defina a interface para os dados do Material
interface Material {
  id: string;
  nome: string;
  descricao?: string;
  categoria?: string;
  fotoUrl?: string;
  criadoEm: string; // se estiver usando Date, pode ser Date também
  atualizadoEm: string;
}

export default async function MateriaisPage() {
  // Realiza uma requisição à rota da API para buscar os materiais.
  // Usamos { next: { revalidate: 0 } } para desabilitar o cache (útil em desenvolvimento).
  const res = await fetch("http://localhost:3000/api/materiais", {
    next: { revalidate: 0 },
  });
  // Especifica que o retorno é um array de Material
  const materiais: Material[] = await res.json();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Materiais</h1>
      <Link href="/materiais/novo">
        <Button variant="default">Novo Material</Button>
      </Link>

      <ul className="mt-4 space-y-2">
        {materiais.map((mat) => (
          <li key={mat.id} className="border rounded p-2">
            <Link href={`/materiais/${mat.id}`} className="underline">
              {mat.nome}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
