// app/materiais/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function MateriaisPage() {
  // Aqui futuramente faremos a busca no banco, por enquanto simulamos
  const materiaisMock = [
    { id: "1", nome: "Mangueira de Incêndio" },
    { id: "2", nome: "Extintor ABC" },
    { id: "3", nome: "Colete Salva-Vidas" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Materiais</h1>
      <Link href="/materiais/novo">
        <Button variant="default">Novo Material</Button>
      </Link>

      <ul className="mt-4 space-y-2">
        {materiaisMock.map((mat) => (
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
