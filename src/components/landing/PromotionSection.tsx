import { UserPlus, CalendarClock, Droplets, Gift, Info, ArrowDown } from "lucide-react";
import { Reveal } from "./Reveal";

const STEPS = [
  { icon: UserPlus, n: "01", title: "Regístrate", text: "Crea tu registro con tus datos y placa." },
  { icon: CalendarClock, n: "02", title: "Aparta tu cupo", text: "Selecciona servicio, fecha y hora." },
  { icon: Droplets, n: "03", title: "Completa 4 lavadas", text: "Tus lavadas completadas se acumulan durante 30 días." },
  { icon: Gift, n: "04", title: "¡Gana una lavada GRATIS!", text: "Al completar 4 lavadas válidas obtienes tu beneficio." },
];

export function PromotionSection() {
  return (
    <section id="promocion" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold text-foreground sm:text-4xl">¿Cómo funciona la promoción?</h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Tu próxima lavada gratis está a solo 4 lavadas de distancia.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, n, title, text }, i) => (
            <Reveal key={n} as="article" delay={i * 90}>
              <li className="group h-full list-none rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)]">
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-6 text-primary" aria-hidden />
                  </span>
                  <span className="font-display text-2xl font-extrabold text-border">{n}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-14">
          <div className="overflow-hidden rounded-3xl border border-border bg-deep text-deep-foreground shadow-[var(--shadow-card-hover)]">
            <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2">
              <div className="flex flex-col items-center gap-3 text-center">
                <span className="rounded-2xl bg-deep-foreground/10 px-6 py-3 font-display text-2xl font-extrabold tracking-wide">
                  4 LAVADAS
                </span>
                <ArrowDown className="size-6 text-aqua float-soft" aria-hidden />
                <span className="flex size-14 items-center justify-center rounded-2xl bg-highlight/20">
                  <Gift className="size-8 text-highlight" aria-hidden />
                </span>
                <span className="rounded-2xl bg-success px-6 py-3 font-display text-2xl font-extrabold tracking-wide text-success-foreground">
                  1 LAVADA GRATIS
                </span>
              </div>
              <div>
                <p className="font-display text-xl font-bold leading-snug sm:text-2xl">
                  Cada 4 lavadas completadas dentro de 30 días generan una lavada gratuita.
                </p>
                <p className="mt-4 flex items-start gap-2.5 rounded-xl bg-deep-foreground/10 p-4 text-sm text-deep-foreground/85">
                  <Info className="mt-0.5 size-4 shrink-0 text-highlight" aria-hidden />
                  La promoción está disponible para clientes registrados durante el período de inscripción.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
