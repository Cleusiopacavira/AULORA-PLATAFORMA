
import Link from "next/link";

const features = [
  {
    number: "01",
    title: "Academic Performance",
    description: "Acompanha as tuas notas, médias e evolução académica.",
    color: "bg-[#087CC1] text-white",
  },
  {
    number: "02",
    title: "Smart Productivity",
    description: "Organiza tarefas, aulas, prazos e objetivos.",
    color: "bg-[#F2F2F2] text-[#14243A]",
  },
  {
    number: "03",
    title: "Intelligent Learning",
    description: "Aprende com o apoio de inteligência artificial.",
    color: "bg-[#C8FF55] text-[#14243A]",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-white text-[#14243A]">

      {/* HERO */}
      <section className="relative mx-auto mt-2 min-h-[720px] max-w-[1500px] overflow-hidden rounded-[28px] bg-gradient-to-br from-[#087CC1] via-[#078DCE] to-[#17B6ED] px-6 text-white">

        {/* Atmosfera e nuvens */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -bottom-40 left-[-10%] h-[420px] w-[700px] rounded-full bg-white/35 blur-[90px]" />
          <div className="absolute -bottom-32 right-[-10%] h-[380px] w-[650px] rounded-full bg-[#D8F8FF]/40 blur-[85px]" />
          <div className="absolute right-[-10%] top-20 h-80 w-80 rounded-full bg-[#35D4F7]/40 blur-[100px]" />
          <div className="absolute left-[20%] top-0 h-72 w-72 rounded-full bg-white/10 blur-[90px]" />
        </div>

        {/* NAVBAR */}
        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between py-7">

          <Link href="/" className="text-2xl font-bold tracking-tight">
            AULORA<span className="text-[#C8FF55]">.</span>
          </Link>

          <nav className="hidden items-center gap-10 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 md:flex">
            <a href="#home" className="hover:text-[#C8FF55]">Home</a>
            <a href="#features" className="hover:text-[#C8FF55]">Features</a>
            <a href="#about" className="hover:text-[#C8FF55]">About us</a>
            <a href="#ai" className="hover:text-[#C8FF55]">AULORA AI</a>
          </nav>

          <Link
            href="/register"
            className="rounded-full bg-[#C8FF55] px-6 py-3 text-[11px] font-bold uppercase tracking-wider text-[#14243A] transition hover:scale-105"
          >
            Get started ↗
          </Link>
        </header>

        {/* HERO CONTENT */}
        <div id="home" className="relative z-10 mx-auto max-w-4xl pt-14 text-center md:pt-16">

          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#C8FF55]" />
            Your academic life, reimagined
          </span>

          <h1 className="mt-8 text-5xl font-semibold leading-[1.08] tracking-[-0.055em] md:text-7xl">
            Build your future
            <span className="block text-[#D5EFFF]">
              with AULORA.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/85 md:text-base">
            Organize your academic life, unlock your productivity
            and achieve more with an intelligent student ecosystem.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#features"
              className="rounded-full border border-white/40 bg-white/10 px-7 py-4 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md transition hover:bg-white/20"
            >
              Explore platform
            </a>

            <Link
              href="/register"
              className="rounded-full bg-[#C8FF55] px-7 py-4 text-[11px] font-bold uppercase tracking-wider text-[#14243A] transition hover:scale-105"
            >
              Get started ↗
            </Link>
          </div>
        </div>

        {/* FLOATING DASHBOARD CARDS */}
        <div className="relative z-10 mx-auto mt-16 flex max-w-5xl items-center justify-center gap-3 pb-20">

          <div className="hidden w-44 -rotate-6 rounded-2xl border border-white/50 bg-white/90 p-4 text-[#14243A] shadow-2xl backdrop-blur-md sm:block">
            <p className="text-[10px] text-slate-500">Academic average</p>
            <p className="mt-2 text-3xl font-bold">16.5</p>
            <div className="mt-3 h-2 rounded-full bg-slate-100">
              <div className="h-2 w-[82%] rounded-full bg-[#28B8A5]" />
            </div>
            <p className="mt-2 text-[9px] text-emerald-600">Great progress ↗</p>
          </div>

          <div className="w-52 rotate-[-3deg] rounded-2xl border border-white/50 bg-white p-5 text-[#14243A] shadow-2xl sm:w-60">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold text-slate-500">My planner</p>
              <span className="text-lg">📅</span>
            </div>
            <p className="mt-3 text-xl font-bold">Today&apos;s focus</p>
            <div className="mt-4 space-y-3">
              {["Mathematics", "Programming", "Physics"].map((item, i) => (
                <div key={item} className="flex items-center gap-2">
                  <div className={`h-2.5 w-2.5 rounded-full ${i === 1 ? "bg-[#C8FF55]" : "bg-[#087CC1]"}`} />
                  <span className="text-[10px] font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden w-48 rotate-3 rounded-2xl bg-[#14243A] p-5 text-white shadow-2xl md:block">
            <span className="text-xl">✦</span>
            <p className="mt-3 text-xs font-bold">AULORA AI</p>
            <p className="mt-2 text-[10px] leading-5 text-slate-300">
              Your next exam is approaching. Let&apos;s create a study plan.
            </p>
            <div className="mt-4 rounded-lg bg-white/10 p-2 text-[9px] text-[#C8FF55]">
              Generate study plan →
            </div>
          </div>

          <div className="hidden w-40 rotate-6 rounded-2xl bg-[#C8FF55] p-4 text-[#14243A] shadow-2xl lg:block">
            <p className="text-[10px] font-medium">Tasks completed</p>
            <p className="mt-2 text-3xl font-bold">24</p>
            <p className="mt-2 text-[9px]">You&apos;re making progress!</p>
          </div>
        </div>

      </section>

      {/* PARTNERS STRIP */}
      <section className="overflow-hidden border-b border-slate-100 py-9">
        <div className="flex min-w-max items-center justify-around gap-16 px-8 text-sm font-semibold tracking-wide text-slate-300">
          <span>✦ LEARNING</span>
          <span>◈ PRODUCTIVITY</span>
          <span>✳ TECHNOLOGY</span>
          <span>◎ INNOVATION</span>
          <span>✦ INTELLIGENCE</span>
          <span>◈ EDUCATION</span>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-24">

        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#087CC1]">
            • About us
          </p>

          <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.045em] md:text-5xl">
            A smarter way to
            <span className="text-[#087CC1]"> experience</span>
            <br />
            your academic journey.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-500">
            AULORA connects the essential parts of student life
            in one intelligent ecosystem. Less chaos, more clarity
            and more time for what really matters.
          </p>
        </div>

        {/* FEATURE CARDS */}
        <div id="features" className="mt-16 grid gap-5 md:grid-cols-3">

          <div className="relative flex min-h-[330px] flex-col justify-between overflow-hidden rounded-[26px] bg-[#087CC1] p-7 text-white">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">AULORA.</span>
              <span className="rounded-full bg-white/15 p-3">↗</span>
            </div>
            <div>
              <p className="text-6xl font-semibold tracking-tight">01</p>
              <h3 className="mt-4 text-xl font-bold">Academic life</h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-white/80">
                Everything you need to organize your academic journey.
              </p>
            </div>
          </div>

          <div className="flex min-h-[330px] flex-col justify-between rounded-[26px] bg-[#F1F2F3] p-7">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">Performance</span>
              <span className="rounded-full bg-white p-3">↗</span>
            </div>
            <div>
              <p className="text-6xl font-semibold tracking-tight">20/20</p>
              <h3 className="mt-4 text-xl font-bold">Your progress matters.</h3>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Understand your academic performance and discover
                where you can improve.
              </p>
            </div>
          </div>

          <div className="flex min-h-[330px] flex-col justify-between rounded-[26px] bg-[#C8FF55] p-7">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">Intelligence</span>
              <span className="rounded-full bg-white/40 p-3">✦</span>
            </div>
            <div>
              <p className="text-6xl font-semibold tracking-tight">AI.</p>
              <h3 className="mt-4 text-xl font-bold">Think beyond limits.</h3>
              <p className="mt-3 text-sm leading-6 text-[#14243A]/70">
                An intelligent companion to help you learn, plan
                and make better decisions.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* MODULES */}
      <section className="bg-[#F5F7FA] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#087CC1]">
                • The ecosystem
              </p>
              <h2 className="mt-5 max-w-xl text-4xl font-semibold tracking-tight">
                Everything connected.
                <span className="text-[#087CC1]"> One experience.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-slate-500">
              A complete ecosystem designed to support every
              step of your student journey.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.number}
                className={`rounded-3xl p-7 ${feature.color}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold opacity-70">
                    {feature.number}
                  </span>
                  <span>↗</span>
                </div>
                <h3 className="mt-12 text-xl font-bold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 opacity-75">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AI SECTION */}
      <section id="ai" className="px-6 py-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] bg-[#14243A] px-8 py-20 text-center text-white">
          <div className="mx-auto max-w-2xl">
            <span className="text-3xl text-[#C8FF55]">✦</span>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-[#C8FF55]">
              Meet AULORA AI
            </p>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl">
              Your academic journey.
              <span className="block text-[#C8FF55]">
                Intelligently connected.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-300">
              More than an assistant. An intelligent layer that
              understands your academic context and helps you
              make the most of every day.
            </p>
            <Link
              href="/register"
              className="mt-9 inline-flex rounded-full bg-[#C8FF55] px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#14243A] transition hover:scale-105"
            >
              Discover AULORA AI ↗
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl rounded-[28px] bg-[#087CC1] px-8 py-16 text-center text-white">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Your future deserves a better system.
          </h2>
          <p className="mt-4 text-sm text-white/80">
            Start building better academic habits with AULORA.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-flex rounded-full bg-[#C8FF55] px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#14243A]"
          >
            Start your journey ↗
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-100 px-6 py-9">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 sm:flex-row">
          <Link href="/" className="text-xl font-bold">
            AULORA<span className="text-[#087CC1]">.</span>
          </Link>
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} AULORA. Own your time. Shape your future.
          </p>
        </div>
      </footer>
    </main>
  );
}
