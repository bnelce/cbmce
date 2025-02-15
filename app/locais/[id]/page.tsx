import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditLocalForm from "./EditLocalForm";

export default async function EditLocalPage({
  params,
}: {
  params: { id: string };
}) {
  // Busca o local no banco de dados
  const local = await prisma.local.findUnique({
    where: { id: params.id },
  });

  if (!local) {
    return notFound();
  }

  // Renderiza o formulário de edição
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Local</h1>
      <EditLocalForm local={local} />
    </div>
  );
}
