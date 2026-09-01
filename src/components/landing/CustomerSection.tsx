import { useState, type FormEvent } from "react";
import {
  UserCheck, UserPlus, Search, Loader2, Check, Gift, PartyPopper, Send,
  CalendarCheck, History, AlertCircle,
} from "lucide-react";
import { BUSINESS, MOCK_CUSTOMER, normalizePlate } from "./data";
import { Reveal } from "./Reveal";

type FormState = "idle" | "loading" | "success" | "error";

const inputCls =
  "min-h-12 w-full rounded-xl border border-input bg-background px-4 text-base text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary disabled:opacity-60";

function Field({ label, id, children, hint }: { label: string; id: string; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-foreground">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

/* ---------- Progreso de promoción ---------- */

export function ProgressCard({ completadas, meta }: { completadas: number; meta: number }) {
  const done = completadas >= meta;
  const pct = Math.min(100, Math.round((completadas / meta) * 100));

  return (
    <div
      className={`rounded-2xl border p-6 transition-colors duration-500 ${
        done ? "border-success/50 bg-success/10" : "border-primary/30 bg-secondary/60"
      }`}
      aria-live="polite"
    >
      <p className="text-xs font-bold tracking-[0.18em] text-primary">TU PROGRESO</p>

      <div className="mt-4 flex items-center justify-center gap-3" aria-hidden>
        {Array.from({ length: meta }).map((_, i) => (
          <span
            key={i}
            className={`flex size-11 items-center justify-center rounded-full border-2 font-display text-base font-bold transition-all duration-500 ${
              i < completadas
                ? "border-success bg-success text-success-foreground scale-105"
                : "border-border bg-card text-muted-foreground"
            }`}
          >
            {i < completadas ? <Check className="size-5" /> : i + 1}
          </span>
        ))}
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-border" role="progressbar" aria-valuenow={completadas} aria-valuemin={0} aria-valuemax={meta} aria-label="Lavadas completadas">
        <div
          className={`h-full rounded-full transition-all duration-700 ${done ? "bg-success" : "bg-primary"}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <p className="mt-3 text-center font-display text-2xl font-extrabold text-foreground">
        {completadas} / {meta}
      </p>

      {done ? (
        <p className="mt-2 flex items-center justify-center gap-2 text-center text-sm font-bold text-success">
          <PartyPopper className="size-4" aria-hidden />
          ¡BENEFICIO DESBLOQUEADO! Tienes 1 lavada GRATIS disponible.
        </p>
      ) : (
        <p className="mt-2 flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
          <Gift className="size-4 text-primary" aria-hidden />
          Te falta {meta - completadas} {meta - completadas === 1 ? "lavada" : "lavadas"} para ganar tu beneficio.
        </p>
      )}
    </div>
  );
}

/* ---------- Tab 1: Ya estoy registrado ---------- */

function RegisteredCustomer() {
  const [state, setState] = useState<FormState>("idle");
  const [placa, setPlaca] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (normalizePlate(placa).length < 5) {
      setError("Ingresa una placa válida (ejemplo: ABC123).");
      setState("error");
      return;
    }
    if (telefono.replace(/\D/g, "").length < 7) {
      setError("Ingresa un teléfono válido.");
      setState("error");
      return;
    }
    setState("loading");
    // Mock: la consulta real se conectará al webhook de n8n.
    setTimeout(() => setState("success"), 900);
  };

  return (
    <div>
      <h3 className="font-display text-xl font-bold text-foreground">Consulta tus lavadas o aparta tu próximo cupo</h3>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2" noValidate={false}>
        <Field label="Número de placa" id="consulta-placa">
          <input
            id="consulta-placa"
            className={inputCls}
            placeholder="ABC123"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            disabled={state === "loading"}
            required
            autoComplete="off"
          />
        </Field>
        <Field label="Teléfono" id="consulta-telefono">
          <input
            id="consulta-telefono"
            type="tel"
            className={inputCls}
            placeholder="300 111 2233"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            disabled={state === "loading"}
            required
          />
        </Field>
        {state === "error" && (
          <p role="alert" className="flex items-center gap-2 text-sm font-medium text-destructive sm:col-span-2">
            <AlertCircle className="size-4" aria-hidden /> {error}
          </p>
        )}
        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-base font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97] disabled:translate-y-0 disabled:opacity-60 sm:col-span-2"
        >
          {state === "loading" ? (
            <>
              <Loader2 className="size-5 animate-spin" aria-hidden /> Consultando...
            </>
          ) : (
            <>
              <Search className="size-5" aria-hidden /> Consultar
            </>
          )}
        </button>
      </form>

      {state === "success" && (
        <div className="mt-8 space-y-5 rounded-2xl border border-border bg-background p-6" aria-live="polite">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs font-bold tracking-wider text-muted-foreground">CLIENTE</p>
              <p className="font-display text-lg font-bold text-foreground">{MOCK_CUSTOMER.nombre}</p>
            </div>
            <span className="rounded-lg bg-secondary px-3 py-1.5 font-mono text-sm font-bold text-secondary-foreground">
              {MOCK_CUSTOMER.placa}
            </span>
          </div>

          <ProgressCard completadas={MOCK_CUSTOMER.lavadasCompletadas} meta={MOCK_CUSTOMER.meta} />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="flex items-center gap-2 text-sm font-bold text-foreground">
                <History className="size-4 text-primary" aria-hidden /> Últimas lavadas
              </p>
              <ul className="mt-3 space-y-2">
                {MOCK_CUSTOMER.ultimasLavadas.map((l) => (
                  <li key={l.fecha} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{l.fecha} · {l.servicio}</span>
                    <span className="inline-flex items-center gap-1 font-medium text-success">
                      <Check className="size-3.5" aria-hidden /> {l.estado}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-between rounded-xl border border-primary/30 bg-secondary/60 p-4">
              <p className="flex items-center gap-2 text-sm font-bold text-foreground">
                <CalendarCheck className="size-4 text-primary" aria-hidden /> Próximo cupo disponible
              </p>
              <p className="mt-2 font-display text-xl font-extrabold text-primary">{MOCK_CUSTOMER.proximoCupo}</p>
              <a
                href={BUSINESS.whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-3 inline-flex min-h-11 items-center justify-center rounded-xl bg-highlight px-4 text-sm font-bold text-highlight-foreground transition-all hover:-translate-y-0.5 hover:brightness-105 active:scale-[0.97]"
              >
                Apartar este cupo
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Tab 2: Quiero registrarme ---------- */

function RegistrationForm() {
  const [state, setState] = useState<FormState>("idle");
  const [accepts, setAccepts] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!accepts) {
      setError("Debes aceptar participar en la promoción y sus condiciones.");
      setState("error");
      return;
    }
    setError("");
    setState("loading");
    // Mock: el registro real se conectará al webhook de n8n.
    setTimeout(() => setState("success"), 900);
  };

  if (state === "success") {
    return (
      <div className="mt-2 rounded-2xl border border-success/40 bg-success/10 p-8 text-center" aria-live="polite">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-success">
          <Check className="size-7 text-success-foreground" aria-hidden />
        </span>
        <h3 className="mt-4 font-display text-2xl font-extrabold text-foreground">¡Registro realizado!</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
          Ahora únete al grupo de Telegram para participar en la promoción.
        </p>
        <a
          href={BUSINESS.telegramUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-7 text-base font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
        >
          <Send className="size-5" aria-hidden /> Unirme a Telegram
        </a>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-display text-xl font-bold text-foreground">Regístrate y empieza a acumular lavadas</h3>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Nombre completo" id="reg-nombre">
          <input id="reg-nombre" className={inputCls} placeholder="Tu nombre" autoComplete="name" required disabled={state === "loading"} />
        </Field>
        <Field label="Teléfono" id="reg-telefono">
          <input id="reg-telefono" type="tel" className={inputCls} placeholder="300 111 2233" autoComplete="tel" required disabled={state === "loading"} />
        </Field>
        <Field label="Número de placa" id="reg-placa" hint="La normalizamos automáticamente (ej: abc-123 → ABC123).">
          <input id="reg-placa" className={inputCls} placeholder="ABC123" required disabled={state === "loading"} />
        </Field>
        <Field label="Tipo de vehículo" id="reg-vehiculo">
          <select id="reg-vehiculo" className={inputCls} required disabled={state === "loading"} defaultValue="">
            <option value="" disabled>Selecciona una opción</option>
            <option value="pequeno">Vehículo pequeño</option>
            <option value="camioneta">Camioneta</option>
          </select>
        </Field>

        <label htmlFor="reg-acepta" className="flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border border-border bg-background p-3.5 sm:col-span-2">
          <input
            id="reg-acepta"
            type="checkbox"
            checked={accepts}
            onChange={(e) => setAccepts(e.target.checked)}
            disabled={state === "loading"}
            className="mt-0.5 size-5 shrink-0 accent-[var(--primary)]"
          />
          <span className="text-sm text-foreground">Acepto participar en la promoción y sus condiciones.</span>
        </label>

        {state === "error" && (
          <p role="alert" className="flex items-center gap-2 text-sm font-medium text-destructive sm:col-span-2">
            <AlertCircle className="size-4" aria-hidden /> {error}
          </p>
        )}

        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-highlight px-6 text-base font-bold text-highlight-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:brightness-105 active:scale-[0.97] disabled:translate-y-0 disabled:opacity-60 sm:col-span-2"
        >
          {state === "loading" ? (
            <>
              <Loader2 className="size-5 animate-spin" aria-hidden /> Enviando...
            </>
          ) : (
            "Registrarme"
          )}
        </button>
      </form>
    </div>
  );
}

/* ---------- Sección con Tabs ---------- */

export function CustomerSection() {
  const [tab, setTab] = useState<"registrado" | "nuevo">("registrado");

  return (
    <section id="consultas" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-10">
            <div role="tablist" aria-label="Consultas y registro" className="grid grid-cols-1 gap-2 rounded-2xl bg-secondary p-1.5 sm:grid-cols-2">
              {([
                { id: "registrado", label: "YA ESTOY REGISTRADO", icon: UserCheck },
                { id: "nuevo", label: "QUIERO REGISTRARME", icon: UserPlus },
              ] as const).map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  role="tab"
                  type="button"
                  aria-selected={tab === id}
                  onClick={() => setTab(id)}
                  className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl text-sm font-extrabold tracking-wide transition-all duration-300 ${
                    tab === id ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4" aria-hidden />
                  {label}
                </button>
              ))}
            </div>

            <div key={tab} className="mt-8" style={{ animation: "fade-up 0.45s cubic-bezier(0.22,1,0.36,1)" }}>
              {tab === "registrado" ? <RegisteredCustomer /> : <RegistrationForm />}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
