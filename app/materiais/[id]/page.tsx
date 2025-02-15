// app/materiais/[id]/page.tsx
import { notFound } from "next/navigation";

// Exemplo de mock local
const materiaisMock = [
  { id: "1", nome: "Mangueira de Incêndio", descricao: "Mangueira de 15m" },
  { id: "2", nome: "Extintor ABC", descricao: "Extintor de 6kg" },
  { id: "3", nome: "Colete Salva-Vidas", descricao: "Tamanho universal" },
];

export default async function DetalhesMaterialPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  // Se fosse com Prisma:
  // const material = await prisma.material.findUnique({ where: { id } })
  const material = materiaisMock.find((m) => m.id === id);

  if (!material) {
    return notFound();
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{material.nome}</h1>
      <p className="mb-4">{material.descricao}</p>
      {/* Aqui poderíamos colocar um botão de editar ou algo assim */}
    </div>
  );
}
