
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const modules = [
  {
    name: "Planner",
    description: "Organiza o teu calendário académico.",
    icon: "📅",
    color: "bg-blue-50",
  },
  {
    name: "Tarefas",
    description: "Acompanha tudo o que precisas fazer.",
    icon: "✓",
    color: "bg-lime-50",
  },
  {
    name: "Notas",
    description: "Controla as tuas notas e médias.",
    icon: "📊",
    color: "bg-purple-50",
  },
  {
    name: "AULORA AI",
    description: "O teu assistente académico inteligente.",
    icon: "✦",
    color: "bg-sky-50",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [active, setActive] = useState("Visão geral");
  const [displayName, setDisplayName] = useState("Estudante");
  const [email, setEmail] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  const navigation = [
    "Visão geral",
    "Planner",
    "Tarefas",
    "Notas",
    "AULORA AI",
  ];

  useEffect(() => {
    async function loadUser() {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.replace("/login");
        return;
      }

      const user = data.user;
      const fullName = user.user_metadata?.full_name;

      setDisplayName(
        typeof fullName === "string" && fullName.trim()
          ? fullName
          : user.email?.split("@")[0] ?? "Estudante"
      );

      setEmail(user.email ?? "");
      setLoadingUser(false);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        router.replace("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, router]);

  async function handleLogout() {
    setLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      setLoggingOut(false);
      alert("Não foi possível terminar a sessão. Tenta novamente.");
      return;
    }

    router.replace("/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#F5F7FA] text-[#14243A]">
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white p-6 md:flex">
          <div className="mb-12 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#087CC1] text-xl font-bold text-white">
              A
            </div>

            <span className="text-2xl font-bold tracking-tight">
              AULORA<span className="text-[#16A8E8]">.</span>
            </span>
          </div>

          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
            Workspace
          </p>

          <nav className="space-y-2">
            {navigation.map((item) => (
              <button
                key={item}
                onClick={() => setActive(item)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                  active === item
                    ? "bg-[#087CC1] text-white shadow-lg shadow-blue-200"
                    : "text-slate-500 hover:bg-slate-100 hover:text-[#14243A]"
                }`}
              >
                <span>
                  {item === "Visão geral"
                    ? "⌂"
                    : item === "Planner"
                    ? "▦"
                    : item === "Tarefas"
                    ? "✓"
                    : item === "Notas"
                    ? "▤"
                    : "✦"}
                </span>

                {item}
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl bg-[#14243A] p-5 text-white">
            <div className="mb-3 text-2xl text-[#C8FF55]">✦</div>

            <p className="font-bold">Estuda com inteligência.</p>

            <p className="mt-2 text-xs leading-5 text-slate-300">
              A AULORA ajuda-te a manter o foco nos teus objetivos.
            </p>
          </div>
        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <section className="min-w-0 flex-1">

          {/* HEADER */}
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-5 md:px-10">
            <div>
              <p className="text-sm text-slate-400">
                Workspace / {active}
              </p>

              <h1 className="mt-1 text-xl font-bold md:text-2xl">
                {active}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-bold">
                  {loadingUser ? "A carregar..." : displayName}
                </p>

                <p className="max-w-48 truncate text-xs text-slate-400">
                  {email}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DDF2FF] font-bold text-[#087CC1]">
                {displayName.charAt(0).toUpperCase()}
              </div>

              <button
                onClick={handleLogout}
                disabled={loggingOut || loadingUser}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
              >
                {loggingOut ? "A sair..." : "Sair"}
              </button>
            </div>
          </header>

          <div className="mx-auto max-w-7xl space-y-8 p-5 md:p-10">

            {/* BOAS-VINDAS */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#075B91] to-[#16A8E8] p-7 text-white md:p-10">
              <div className="relative z-10 max-w-xl">
                <p className="text-sm font-semibold text-blue-100">
                  O TEU ESPAÇO ACADÉMICO
                </p>

                <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
                  Olá, {displayName}!<br />
                  Aprende mais. Organiza melhor.
                </h2>

                <p className="mt-4 max-w-md text-sm leading-6 text-blue-50">
                  Tudo o que precisas para gerir a tua vida académica,
                  num único lugar.
                </p>

                <button
                  onClick={() => setActive("Planner")}
                  className="mt-7 rounded-xl bg-[#C8FF55] px-5 py-3 text-sm font-bold text-[#14243A] transition hover:bg-white"
                >
                  Explorar workspace →
                </button>
              </div>

              <div className="absolute -right-16 -top-24 h-80 w-80 rounded-full border-[35px] border-white/10" />

              <div className="absolute -bottom-32 right-28 h-72 w-72 rounded-full border-[35px] border-white/10" />
            </div>

            {/* MÓDULOS */}
            <div>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    O teu workspace
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Acede às tuas ferramentas académicas.
                  </p>
                </div>

                <span className="hidden rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-500 shadow-sm sm:block">
                  4 módulos disponíveis
                </span>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {modules.map((module) => (
                  <button
                    key={module.name}
                    onClick={() => setActive(module.name)}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-[#16A8E8] hover:shadow-xl hover:shadow-blue-100"
                  >
                    <div
                      className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl font-bold ${module.color}`}
                    >
                      {module.icon}
                    </div>

                    <h3 className="font-bold">
                      {module.name}
                    </h3>

                    <p className="mt-2 min-h-10 text-sm leading-5 text-slate-500">
                      {module.description}
                    </p>

                    <p className="mt-5 text-sm font-bold text-[#087CC1] group-hover:text-[#16A8E8]">
                      Abrir módulo →
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* ÁREA ACADÉMICA */}
            <div className="grid gap-5 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
                <h2 className="font-bold">
                  Visão académica
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  O teu progresso académico será apresentado aqui.
                </p>

                <div className="mt-6 flex h-36 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-400">
                  Ainda não existem dados académicos.
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="font-bold">
                  AULORA AI <span className="text-[#16A8E8]">✦</span>
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  O teu assistente inteligente estará sempre pronto
                  para ajudar nos estudos.
                </p>

                <button
                  onClick={() => setActive("AULORA AI")}
                  className="mt-6 w-full rounded-xl bg-[#087CC1] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#075B91]"
                >
                  Conhecer AULORA AI →
                </button>
              </div>
            </div>

            {/* FOOTER */}
            <footer className="border-t border-slate-200 pt-6 text-center text-xs text-slate-400">
              © 2026 AULORA. Aprende, organiza e evolui.
            </footer>
          </div>
        </section>
      </div>
    </main>
  );
}
