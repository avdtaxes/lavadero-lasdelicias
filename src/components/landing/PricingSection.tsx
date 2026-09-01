import { useState } from "react";
import { Car, Truck, SprayCan, Droplets, Sparkles, ArrowRight } from "lucide-react";
import { SERVICES } from "./data";
import { Reveal } from "./Reveal";

const ICONS = [SprayCan, Droplets, Sparkles];

type VehicleType = "pequeno" | "camioneta";

export function PricingSection() {
  const [type, setType] = useState<VehicleType>("pequeno");
  const services = SERVICES[type];

  return (
    <section id="precios" className="bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold text-foreground sm:text-4xl">Nuestros servicios</h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Elige el servicio que mejor se adapte a tu vehículo.
          </p>
        </Reveal>

        <Reveal className="mt-10 flex justify-center">
          <div role="tablist" aria-label="Tipo de vehículo" className="inline-flex rounded-2xl border border-border bg-card p-1.5 shadow-sm">
            {([
              { id: "pequeno", label: "Vehículos pequeños", icon: Car },
              { id: "camioneta", label: "Camionetas", icon: Truck },
            ] as const).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                role="tab"
                type="button"
                aria-selected={type === id}
                onClick={() => setType(id)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition-all duration-300 sm:px-6 ${
                  type === id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="size-4" aria-hidden />
                {label}
              </button>
            ))}
          </div>
        </Reveal>

        <div key={type} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = ICONS[i] ?? SprayCan;
            return (
              <article
                key={s.id}
                style={{ animationDelay: `${i * 80}ms` }}
                className={`hero-stagger group relative flex flex-col rounded-2xl border bg-card p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)] ${
                  s.recommended ? "border-primary shadow-[var(--shadow-card-hover)]" : "border-border shadow-[var(--shadow-card)]"
                }`}
              >
                {s.recommended && (
                  <span className="absolute -top-3 right-6 rounded-full bg-highlight px-3 py-1 text-[10px] font-extrabold tracking-[0.14em] text-highlight-foreground">
                    MÁS ELEGIDO
                  </span>
                )}
                <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Icon className="size-6 text-primary" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-foreground">{s.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                <p className="mt-5 font-display text-4xl font-extrabold tracking-tight text-primary">{s.price}</p>
                <a
                  href="#consultas"
                  className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
                >
                  Apartar este servicio
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              </article>
            );
          })}
        </div>

        <Reveal className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            El precio se calcula automáticamente según tipo de vehículo + servicio.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
