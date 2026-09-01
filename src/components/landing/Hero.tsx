import { useEffect, useState } from "react";
import { ArrowRight, History, MapPin, CalendarCheck, Clock, Smartphone } from "lucide-react";
import { BUSINESS, PROMO_END_DATE } from "./data";
import heroImage from "../../assets/hero-carwash.jpg";

/* ---------- Contador de promoción (fecha configurable en data.ts) ---------- */

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number; done: boolean };

function getTimeLeft(): TimeLeft {
  const diff = PROMO_END_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
    done: false,
  };
}

function CountdownCard({ value, label }: { value: number; label: string }) {
  const text = String(value).padStart(2, "0");
  return (
    <div className="flex min-w-[70px] flex-col items-center rounded-2xl border border-deep-foreground/15 bg-deep-foreground/10 px-3 py-3 shadow-lg backdrop-blur-sm sm:min-w-[84px] sm:px-4">
      <span key={text} className="countdown-tick font-display text-3xl font-extrabold tabular-nums text-deep-foreground sm:text-4xl">
        {text}
      </span>
      <span className="mt-1 text-[10px] font-bold tracking-[0.18em] text-deep-foreground/70">{label}</span>
    </div>
  );
}

function PromoCountdown() {
  const [left, setLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setLeft(getTimeLeft());
    const id = setInterval(() => setLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div aria-live="polite">
      <p className="mb-3 text-xs font-bold tracking-[0.2em] text-highlight">LA PROMOCIÓN TERMINA EN:</p>
      {left?.done ? (
        <p className="inline-block rounded-2xl border border-deep-foreground/15 bg-deep-foreground/10 px-6 py-4 font-display text-xl font-bold text-deep-foreground">
          Promoción finalizada
        </p>
      ) : (
        <div className="flex flex-wrap gap-2 sm:gap-3" role="timer" aria-label="Tiempo restante de la promoción">
          <CountdownCard value={left?.days ?? 0} label="DÍAS" />
          <CountdownCard value={left?.hours ?? 0} label="HORAS" />
          <CountdownCard value={left?.minutes ?? 0} label="MIN" />
          <CountdownCard value={left?.seconds ?? 0} label="SEG" />
        </div>
      )}
    </div>
  );
}

/* ---------- Hero ---------- */

const TRUST = [
  { icon: Clock, text: "Cupos limitados por hora" },
  { icon: CalendarCheck, text: "Atención todos los días" },
  { icon: Smartphone, text: "Reserva fácil desde tu celular" },
  { icon: MapPin, text: "Ubicación en San Juan del Cesar" },
];

export function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-[92vh] items-center overflow-hidden bg-deep" aria-label="Promoción principal">
      <img
        src={heroImage}
        alt="Vehículo cubierto de espuma durante un lavado profesional en Las Delicias"
        className="absolute inset-0 size-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-deep via-deep/85 to-deep/30" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-deep via-transparent to-deep/40" aria-hidden />

      <div className="hero-stagger relative mx-auto w-full max-w-6xl px-4 pb-20 pt-28 sm:px-6 lg:py-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-highlight/40 bg-highlight/15 px-4 py-1.5 text-xs font-bold tracking-[0.18em] text-highlight">
          <span className="size-1.5 rounded-full bg-highlight" aria-hidden />
          PROMOCIÓN ESPECIAL
        </span>

        <h1 className="mt-5 max-w-2xl font-display text-4xl font-extrabold leading-[1.05] text-deep-foreground sm:text-6xl lg:text-7xl">
          Lava 4 veces. <span className="text-aqua">La 5ª es</span>{" "}
          <span className="text-highlight">GRATIS.</span>
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-deep-foreground/85 sm:text-lg">
          Lava tu vehículo 4 veces dentro de 30 días y recibe una lavada completamente GRATIS.{" "}
          <span className="font-semibold text-deep-foreground">Regístrate, aparta tu cupo y empieza a acumular tus lavadas.</span>
        </p>

        <PromoCountdown />

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#consultas"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-highlight px-8 text-base font-bold text-highlight-foreground shadow-[var(--shadow-cta)] transition-all hover:-translate-y-0.5 hover:brightness-105 active:scale-[0.97]"
          >
            Apartar mi cupo
            <ArrowRight className="size-5" aria-hidden />
          </a>
          <a
            href="#consultas"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border-2 border-deep-foreground/25 px-8 text-base font-bold text-deep-foreground transition-all hover:-translate-y-0.5 hover:bg-deep-foreground/10 active:scale-[0.97]"
          >
            <History className="size-5" aria-hidden />
            Consultar mis lavadas
          </a>
        </div>

        <ul className="mt-10 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2" aria-label="Garantías">
          {TRUST.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2.5 text-sm text-deep-foreground/80">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-success/25">
                <Icon className="size-3.5 text-aqua" aria-hidden />
              </span>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
