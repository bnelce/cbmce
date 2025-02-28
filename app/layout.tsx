import { Home, Linkedin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Conferência de Materiais",
  description:
    "Sistema de conferência de materiais, otimizado para smartphones.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-50 flex flex-col">
        {/* Cabeçalho */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          {/* Botão para voltar à página inicial */}
          <Link href="/">
            <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition">
              <Home size={20} />
              <span className="text-sm font-medium">Início</span>
            </button>
          </Link>

          <h1 className="text-lg font-bold">Conferência de Materiais</h1>

          {/* Espaço reservado para alinhar o título no centro */}
          <div className="w-16"></div>
        </header>

        {/* Conteúdo principal */}
        <main className="flex-1 w-full max-w-md mx-auto p-4">{children}</main>

        {/* Rodapé */}
        <footer className="bg-white shadow p-4 text-center text-sm flex flex-col items-center gap-2">
          <p>
            Desenvolvido por <strong>Abner Oliveira</strong>
          </p>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/abner-lima-oliveira/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
          >
            <Linkedin size={18} />
            LinkedIn
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/5585987075561"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-green-600 hover:text-green-800 transition"
          >
            <MessageCircle size={18} />
            WhatsApp: (85) 98707-5561
          </a>

          <p className="text-gray-500">
            © {new Date().getFullYear()} - Todos os direitos reservados
          </p>
        </footer>
      </body>
    </html>
  );
}
