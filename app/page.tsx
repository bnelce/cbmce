// app/page.tsx

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        Sistema de Conferência de Materiais
      </h1>
      <p className="text-lg mb-6">
        Bem-vindo ao sistema de conferência de materiais! Aqui você pode
        gerenciar materiais, locais e realizar conferências de forma simples e
        organizada.
      </p>

      <div className="space-x-4">
        <Link href="/materiais">
          <Button>Materiais</Button>
        </Link>
        <Link href="/locais">
          <Button>Locais</Button>
        </Link>
        <Link href="/conferencias">
          <Button>Conferências</Button>
        </Link>
      </div>
    </main>
  );
}
