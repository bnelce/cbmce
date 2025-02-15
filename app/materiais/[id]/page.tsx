// app/materiais/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditMaterialForm from "./EditMaterialForm";

interface Material {
  id: string;
  nome: string;
  descricao?: string;
  criadoEm: string;
  atualizadoEm: string;
}

export default async function EditMaterialPage({
  params,
}: {
  params: { id: string };
}) {
  // Busca o material no banco de dados
  const material = await prisma.material.findUnique({
    where: { id: params.id },
  });

  // Se não existir, retornamos um 404
  if (!material) {
    return notFound();
  }

  // Renderiza o formulário de edição, passando o material como prop
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Material</h1>
      <EditMaterialForm material={material} />
    </div>
  );
}
