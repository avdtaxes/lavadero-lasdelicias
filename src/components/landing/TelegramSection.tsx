import { Send, Bell, CheckCircle2, MessageCircle, Megaphone, AlertCircle } from "lucide-react";
import { BUSINESS } from "./data";
import { Reveal } from "./Reveal";

const BENEFITS = [
  { icon: Megaphone, text: "Novedades del lavadero" },
  { icon: CheckCircle2, text: "Confirmaciones de reserva" },
  { icon: Bell, text: "Información de la promoción" },
  { icon: AlertCircle, text: "Avisos importantes" },
  { icon: MessageCircle, text: "Comunicación directa" },
];

export function TelegramSection() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="grid lg:grid-cols-[1.15fr_1fr]">
              <div className="p-8 sm:p-12">
                <h2 className="font-display text-3xl font-extrabold text-foreground sm:text-4xl">
                  Únete al grupo de Telegram
                </h2>
                <p className="mt-3 text-base text-muted-foreground">
                  Forma parte de la comunidad de Las Delicias y mantente informado.
                </p>

                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {BENEFITS.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-2.5 text-sm text-foreground">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-secondary">
                        <Icon className="size-3.5 text-primary" aria-hidden />
                      </span>
                      {text}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={BUSINESS.telegramUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-7 text-base font-bold text-primary-foreground shadow-[var(--shadow-cta)] transition-all hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
                  >
                    <Send className="size-5" aria-hidden />
                    Unirme al grupo de Telegram
                  </a>
                  <a
                    href="#consultas"
                    className="inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-border px-7 text-base font-bold text-foreground transition-all hover:-translate-y-0.5 hover:bg-secondary active:scale-[0.97]"
                  >
                    Ya estoy registrado
                  </a>
                </div>

                <p className="mt-6 flex items-start gap-2.5 rounded-xl border border-highlight/40 bg-highlight/15 p-4 text-sm text-foreground">
                  <AlertCircle className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  La participación en la promoción requiere inscripción en el grupo de Telegram.
                </p>
              </div>

              <div className="relative flex items-center justify-center bg-deep p-10">
                <div className="absolute inset-0 opacity-30" aria-hidden
                  style={{ backgroundImage: "radial-gradient(circle at 30% 30%, var(--aqua), transparent 55%)" }} />
                <div className="relative w-full max-w-xs space-y-3">
                  <div className="float-soft flex size-20 items-center justify-center rounded-3xl bg-aqua/20 mx-auto">
                    <Send className="size-10 text-aqua" aria-hidden />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-deep-foreground/10 p-4 text-sm text-deep-foreground/90">
                    ✅ Tu reserva de las 10:30 AM fue confirmada.
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-deep-foreground/10 p-4 text-sm text-deep-foreground/90">
                    🎁 ¡Llevas 3 de 4 lavadas! Te falta una para tu lavada gratis.
                  </div>
                  <div className="rounded-2xl rounded-tr-sm bg-aqua/25 p-4 text-sm text-deep-foreground">
                    ¿Tienen cupo mañana a las 9:00?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
