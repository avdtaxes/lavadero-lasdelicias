import { CalendarDays, Clock, Users, CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";
import { BUSINESS, MOCK_SLOTS, slotStatus, type TimeSlot } from "./data";
import { Reveal } from "./Reveal";

const STATUS_UI = {
  disponible: { label: "cupos disponibles", icon: CheckCircle2, cls: "border-success/40 bg-success/10 text-success" },
  parcial: { label: "cupo disponible", icon: AlertTriangle, cls: "border-highlight/50 bg-highlight/15 text-highlight-foreground" },
  completo: { label: "Completo", icon: XCircle, cls: "border-destructive/35 bg-destructive/10 text-destructive" },
} as const;

function SlotRow({ slot }: { slot: TimeSlot }) {
  const status = slotStatus(slot);
  const ui = STATUS_UI[status];
  const Icon = ui.icon;
  const free = slot.capacity - slot.occupied;

  return (
    <li className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 transition-colors ${ui.cls}`}>
      <span className="font-display text-lg font-bold tabular-nums text-foreground">{slot.time}</span>
      <span className="flex items-center gap-2 text-sm font-semibold">
        <span className="flex gap-1" aria-hidden>
          {Array.from({ length: slot.capacity }).map((_, i) => (
            <span key={i} className={`size-2.5 rounded-full ${i < slot.occupied ? "bg-current" : "border border-current"}`} />
          ))}
        </span>
        <Icon className="size-4" aria-hidden />
        {status === "completo" ? "Completo" : `${free} ${free === 1 ? "cupo disponible" : "cupos disponibles"}`}
      </span>
    </li>
  );
}

export function AvailabilitySection() {
  return (
    <section id="horarios" className="bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold text-foreground sm:text-4xl">Consulta los cupos disponibles</h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">Elige el mejor momento para lavar tu vehículo.</p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="grid h-full gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary">
                  <CalendarDays className="size-5 text-primary" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">{BUSINESS.schedule.label}</h3>
                <p className="mt-1 font-display text-2xl font-extrabold text-primary">{BUSINESS.schedule.hours}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary">
                  <Users className="size-5 text-primary" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                  Contamos con {BUSINESS.schedule.capacity} puestos de lavado por intervalo.
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Nunca hay más de {BUSINESS.schedule.capacity} vehículos en lavado al mismo tiempo.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
                <Clock className="size-5 text-primary" aria-hidden />
                Turnos de hoy
              </h3>
              <ul className="mt-5 space-y-2.5">
                {MOCK_SLOTS.map((slot) => (
                  <SlotRow key={slot.time} slot={slot} />
                ))}
              </ul>
              <p className="mt-5 flex items-start gap-2.5 rounded-xl bg-secondary p-4 text-sm text-secondary-foreground">
                <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                Los turnos se organizan en intervalos de 30 minutos para evitar esperas y mantener una atención fluida.
              </p>
              <a
                href="#consultas"
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-primary px-6 text-base font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
              >
                Consultar disponibilidad
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
