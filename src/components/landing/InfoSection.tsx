import { useState, type FormEvent } from "react";
import { MapPin, Loader2, Check, AlertCircle, MessageCircle } from "lucide-react";
import { BUSINESS } from "./data";
import { Reveal } from "./Reveal";

type FormState = "idle" | "loading" | "success" | "error";

const inputCls =
  "min-h-12 w-full rounded-xl border border-input bg-background px-4 text-base text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary disabled:opacity-60";

const MOTIVOS = [
  "Información sobre servicios",
  "Información sobre la promoción",
  "Horarios",
  "Reservas",
  "Otro",
];

export function InfoSection() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setError("Completa todos los campos antes de enviar.");
      setState("error");
      form.reportValidity();
      return;
    }
    setError("");
    setState("loading");
    // Mock: el envío real se conectará al webhook de n8n.
    setTimeout(() => {
      setState("success");
      form.reset();
    }, 900);
  };

  return (
    <section id="contacto" className="bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold text-foreground sm:text-4xl">¿Tienes alguna pregunta?</h2>
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">Estamos aquí para ayudarte.</p>

            <div className="mt-8 space-y-4">
              <p className="flex items-center gap-3 text-foreground">
                <span className="flex size-10 items-center justify-center rounded-xl bg-card shadow-sm">
                  <MapPin className="size-5 text-primary" aria-hidden />
                </span>
                <span className="font-medium">{BUSINESS.city}, {BUSINESS.country}</span>
              </p>
              <a
                href={BUSINESS.whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-success px-7 text-base font-bold text-success-foreground transition-all hover:-translate-y-0.5 hover:brightness-105 active:scale-[0.97]"
              >
                <MessageCircle className="size-5" aria-hidden />
                Escribir por WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="info-nombre" className="mb-1.5 block text-sm font-semibold text-foreground">Nombre</label>
                  <input id="info-nombre" name="nombre" className={inputCls} placeholder="Tu nombre" autoComplete="name" required disabled={state === "loading"} />
                </div>
                <div>
                  <label htmlFor="info-telefono" className="mb-1.5 block text-sm font-semibold text-foreground">Teléfono</label>
                  <input id="info-telefono" name="telefono" type="tel" className={inputCls} placeholder="300 111 2233" autoComplete="tel" required disabled={state === "loading"} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="info-motivo" className="mb-1.5 block text-sm font-semibold text-foreground">Motivo de consulta</label>
                  <select id="info-motivo" name="motivo" className={inputCls} required defaultValue="" disabled={state === "loading"}>
                    <option value="" disabled>Selecciona un motivo</option>
                    {MOTIVOS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="info-mensaje" className="mb-1.5 block text-sm font-semibold text-foreground">Mensaje</label>
                  <textarea
                    id="info-mensaje"
                    name="mensaje"
                    rows={4}
                    className={`${inputCls} py-3`}
                    placeholder="Cuéntanos en qué podemos ayudarte"
                    required
                    disabled={state === "loading"}
                  />
                </div>
              </div>

              {state === "error" && (
                <p role="alert" className="mt-4 flex items-center gap-2 text-sm font-medium text-destructive">
                  <AlertCircle className="size-4" aria-hidden /> {error}
                </p>
              )}
              {state === "success" && (
                <p role="status" className="mt-4 flex items-center gap-2 rounded-xl border border-success/40 bg-success/10 p-3 text-sm font-semibold text-success">
                  <Check className="size-4" aria-hidden /> ¡Solicitud enviada! Te contactaremos pronto.
                </p>
              )}

              <button
                type="submit"
                disabled={state === "loading"}
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-base font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97] disabled:translate-y-0 disabled:opacity-60"
              >
                {state === "loading" ? (
                  <>
                    <Loader2 className="size-5 animate-spin" aria-hidden /> Enviando...
                  </>
                ) : (
                  "Enviar solicitud"
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
