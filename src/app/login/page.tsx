
"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setErrorMessage("Email ou palavra-passe incorretos. Verifica os teus dados.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen bg-[#F5F7FA]">
      <section className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-[#075B91] to-[#16A8E8] p-12 text-white lg:flex">
        <div className="text-3xl font-bold tracking-tight">
          AULORA<span className="text-[#C8FF55]">.</span>
        </div>

        <div className="max-w-lg">
          <p className="mb-4 text-sm font-semibold tracking-widest text-blue-100">
            O TEU FUTURO COMEÇA AQUI
          </p>
          <h1 className="text-5xl font-bold leading-tight">
            Organiza os teus estudos. Alcança os teus objetivos.
          </h1>
          <p className="mt-6 text-lg leading-8 text-blue-50">
            Uma plataforma inteligente para acompanhar a tua jornada académica.
          </p>
        </div>

        <p className="text-sm text-blue-100">
          © 2026 AULORA. Todos os direitos reservados.
        </p>
      </section>

      <section className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link href="/" className="text-2xl font-bold tracking-tight text-[#14243A] lg:hidden">
            AULORA<span className="text-[#16A8E8]">.</span>
          </Link>

          <div className="mb-10 mt-10">
            <h2 className="text-3xl font-bold text-[#14243A]">
              Bem-vindo de volta!
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Entra na tua conta para continuares a tua jornada académica.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#14243A]">
                Endereço de email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#16A8E8] focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-[#14243A]">
                Palavra-passe
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Introduz a tua palavra-passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#16A8E8] focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {errorMessage && (
              <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#087CC1] py-4 text-sm font-bold text-white shadow-lg shadow-blue-100 transition hover:bg-[#075B91] disabled:opacity-60"
            >
              {loading ? "A entrar..." : "Entrar na AULORA →"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Ainda não tens conta?{" "}
            <Link href="/register" className="font-bold text-[#087CC1] hover:underline">
              Criar conta
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
