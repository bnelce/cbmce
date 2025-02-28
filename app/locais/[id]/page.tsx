import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditInventarioForm from "./EditInventarioForm";
import EditLocalForm from "./EditLocalForm";

export default async function EditLocalPage({
  params,
}: {
  params: { id: string };
}) {
  // Buscar o local no banco de dados
  const local = await prisma.local.findUnique({
    where: { id: params.id },
  });

  if (!local) {
    return notFound();
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Local</h1>

      <Tabs defaultValue="dados">
        <TabsList className="mb-4">
          <TabsTrigger value="dados">Dados do Local</TabsTrigger>
          <TabsTrigger value="inventario">Inventário</TabsTrigger>
        </TabsList>

        <TabsContent value="dados">
          <EditLocalForm local={local} />
        </TabsContent>

        <TabsContent value="inventario">
          <EditInventarioForm localId={local.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
