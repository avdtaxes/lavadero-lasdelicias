import { useEffect, useState } from "react";
import { Menu, X, Droplets } from "lucide-react";

const NAV = [
  { label: "Promoción", href: "#promocion" },
  { label: "Precios", href: "#precios" },
  { label: "Horarios", href: "#horarios" },
  { label: "Consultas", href: "#consultas" },
  { label: "Contacto", href: "#contacto" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-deep/95 shadow-lg backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#inicio" className="flex items-center gap-2.5 text-deep-foreground" aria-label="Las Delicias - inicio">
          <span className="flex size-9 items-center justify-center rounded-xl bg-aqua/20">
            <Droplets className="size-5 text-aqua" aria-hidden />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm font-extrabold tracking-wide">LAS DELICIAS</span>
            <span className="block text-[11px] text-deep-foreground/70">Lavadero de Autos</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-deep-foreground/80 transition-colors hover:bg-deep-foreground/10 hover:text-deep-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#consultas"
            className="hidden min-h-11 items-center rounded-xl bg-highlight px-5 text-sm font-bold text-highlight-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:brightness-105 active:scale-[0.97] sm:inline-flex"
          >
            Apartar mi cupo
          </a>
          <a
            href="#consultas"
            className="inline-flex min-h-11 items-center rounded-xl bg-highlight px-4 text-sm font-bold text-highlight-foreground active:scale-[0.97] sm:hidden"
          >
            Apartar cupo
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex size-11 items-center justify-center rounded-xl text-deep-foreground transition-colors hover:bg-deep-foreground/10 lg:hidden"
          >
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-deep-foreground/10 bg-deep/95 px-4 pb-4 pt-2 backdrop-blur-md lg:hidden" aria-label="Menú móvil">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-base font-medium text-deep-foreground/85 transition-colors hover:bg-deep-foreground/10"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
