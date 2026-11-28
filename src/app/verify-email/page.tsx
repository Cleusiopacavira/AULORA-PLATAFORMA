"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function VerifyEmailPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setEmail(params.get("email")?.trim().toLowerCase() ?? "");
  }, []);

  async function handleVerify(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Endereço de email não encontrado. Volta ao registo.");
      return;
    }

    if (!/^\d{6}$/.test(token)) {
      setError("Introduz um código válido de 6 dígitos.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "email",
      });

      if (verifyError) throw verifyError;

      router.replace("/dashboard");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível verificar o código."
      );
      setLoading(false);
    }
  }

  async function handleResend() {
    setError("");
    setMessage("");

    if (!email) {
      setError("Não foi possível identificar o teu email.");
      return;
    }

    setResending(true);

    try {
      const supabase = createClient();

      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email,
      });

      if (resendError) throw resendError;

      setMessage("Se o endereço puder receber uma nova confirmação, o Supabase enviará outro código.");
      setToken("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível reenviar o código."
      );
    } finally {
      setResending(false);
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
            Verificação de segurança
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#14243A]">
            Confirma o teu email.
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Introduz o código de 6 dígitos enviado para:
          </p>

          <p className="mt-2 break-all font-semibold text-[#14243A]">
            {email || "A carregar email..."}
          </p>
        </div>

        <form onSubmit={handleVerify} className="mt-8 space-y-5">
          <div>
            <label htmlFor="token" className="mb-2 block text-sm font-semibold text-[#14243A]">
              Código de confirmação
            </label>

            <input
              id="token"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              required
              value={token}
              onChange={(e) => setToken(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="000000"
              className="w-full rounded-xl border border-slate-200 px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] text-[#14243A] outline-none transition focus:border-[#087CC1] focus:ring-2 focus:ring-[#087CC1]/10"
            />
          </div>

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
            disabled={loading || token.length !== 6 || !email}
            className="w-full rounded-xl bg-[#087CC1] py-4 text-sm font-bold text-white transition hover:bg-[#066BA8] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "A verificar..." : "Confirmar email"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Não recebeste o código?
          </p>

          <button
            type="button"
            onClick={handleResend}
            disabled={resending || !email}
            className="mt-2 text-sm font-bold text-[#087CC1] hover:underline disabled:opacity-50"
          >
            {resending ? "A reenviar..." : "Reenviar código"}
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          <Link href="/login" className="font-bold text-[#087CC1] hover:underline">
            Voltar ao login
          </Link>
        </p>
      </div>
    </main>
  );
}
