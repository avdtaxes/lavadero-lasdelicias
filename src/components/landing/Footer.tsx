import { Droplets, Send, MessageCircle, MapPin } from "lucide-react";
import { BUSINESS } from "./data";

const LINKS = [
  { label: "Promoción", href: "#promocion" },
  { label: "Servicios", href: "#precios" },
  { label: "Horarios", href: "#horarios" },
  { label: "Consultas", href: "#consultas" },
  { label: "Contacto", href: "#contacto" },
];

export function Footer() {
  return (
    <footer className="bg-deep py-14 text-deep-foreground">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-aqua/20">
                <Droplets className="size-5 text-aqua" aria-hidden />
              </span>
              <span className="leading-tight">
                <span className="block font-display text-sm font-extrabold tracking-wide">LAS DELICIAS</span>
                <span className="block text-[11px] text-deep-foreground/70">Lavadero de Autos</span>
              </span>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-deep-foreground/70">
              <MapPin className="size-4 text-aqua" aria-hidden />
              {BUSINESS.city}, {BUSINESS.country}.
            </p>
          </div>

          <nav aria-label="Enlaces del sitio">
            <p className="text-xs font-bold tracking-[0.18em] text-deep-foreground/50">NAVEGACIÓN</p>
            <ul className="mt-4 space-y-2.5">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-deep-foreground/80 transition-colors hover:text-aqua">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-deep-foreground/50">CONTACTO</p>
            <div className="mt-4 flex flex-col items-start gap-3">
              <a
                href={BUSINESS.telegramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-aqua/20 px-5 text-sm font-bold text-aqua transition-all hover:-translate-y-0.5 hover:bg-aqua/30 active:scale-[0.97]"
              >
                <Send className="size-4" aria-hidden /> Unirme al grupo
              </a>
              <a
                href={BUSINESS.whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-success/25 px-5 text-sm font-bold text-success-foreground transition-all hover:-translate-y-0.5 hover:bg-success/35 active:scale-[0.97]"
              >
                <MessageCircle className="size-4" aria-hidden /> Escribirnos
              </a>
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-deep-foreground/10 pt-6 text-center text-xs text-deep-foreground/50">
          © 2026 Las Delicias. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export function WhatsAppButton() {
  return (
    <a
      href={BUSINESS.whatsappUrl}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-success text-success-foreground shadow-[0_10px_30px_-8px_oklch(0.60_0.14_152/0.7)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95"
      style={{ animation: "fade-up 0.6s 1.2s cubic-bezier(0.22,1,0.36,1) backwards" }}
    >
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-xl bg-deep px-3.5 py-2 text-sm font-semibold text-deep-foreground opacity-0 shadow-lg transition-all duration-200 group-hover:-translate-x-1 group-hover:opacity-100 lg:block">
        Escríbenos por WhatsApp
      </span>
      <MessageCircle className="size-7" aria-hidden />
    </a>
  );
}
