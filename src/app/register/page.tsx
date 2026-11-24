
"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("As palavras-passe não coincidem.");
      return;
    }

    if (password.length < 8) {
      setError("A palavra-passe deve ter pelo menos 8 caracteres.");
      return;
    }

    if (!acceptedTerms) {
      setError("Deves aceitar os termos para continuar.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      if (data.session) {
        setMessage("Conta criada com sucesso! Bem-vindo à AULORA.");
      } else {
        setMessage(
          "Conta criada! Verifica o teu email para confirmares o registo."
        );
      }

      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAcceptedTerms(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível criar a conta."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F7FA] px-5 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50 sm:p-10">

        <Link href="/" className="text-3xl font-bold tracking-tight text-[#14243A]">
          AULORA<span className="text-[#087CC1]">.</span>
        </Link>

        <div className="mt-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#087CC1]">
            Join the ecosystem
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#14243A]">
            Cria a tua conta.
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Começa a organizar a tua vida académica com a AULORA.
          </p>
        </div>

        <form onSubmit={handleRegister} className="mt-8 space-y-5">

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Nome completo
            </label>
            <input
              type="text"
              required
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="O teu nome completo"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#087CC1] focus:ring-2 focus:ring-[#087CC1]/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@email.com"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#087CC1] focus:ring-2 focus:ring-[#087CC1]/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Palavra-passe
            </label>
            <input
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo de 8 caracteres"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#087CC1] focus:ring-2 focus:ring-[#087CC1]/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Confirmar palavra-passe
            </label>
            <input
              type="password"
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repete a palavra-passe"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#087CC1] focus:ring-2 focus:ring-[#087CC1]/10"
            />
          </div>

          <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-500">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-1 accent-[#087CC1]"
            />
            <span>
              Aceito os termos de utilização e a política de privacidade.
            </span>
          </label>

          {error && (
            <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {message && (
            <p role="status" className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#087CC1] py-4 text-sm font-bold text-white transition hover:bg-[#066BA8] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "A criar conta..." : "Criar conta gratuitamente →"}
          </button>

        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Já tens uma conta?{" "}
          <Link href="/login" className="font-bold text-[#087CC1] hover:underline">
            Entrar
          </Link>
        </p>

      </div>
    </main>
  );
}
