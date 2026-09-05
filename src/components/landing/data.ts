/**
 * Datos de demostración y configuración de la landing.
 * Todo queda centralizado aquí para conectarlo luego a n8n / webhooks.
 */

export const BUSINESS = {
  name: "Las Delicias",
  tagline: "Lavadero de Autos",
  city: "San Juan del Cesar, La Guajira",
  country: "Colombia",
  whatsapp: "573043656927", // TODO: número real
  whatsappUrl: "https://wa.me/573043656927?text=Hola%20Las%20Delicias%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n",
  telegramUrl: "https://t.me/+lUkbpyXv5HowY2Yx", // TODO: grupo real
  schedule: { label: "Todos los días", hours: "8:00 AM — 4:00 PM", capacity: 2, intervalMinutes: 30 },
};

/** Fecha configurable de fin de la inscripción a la promoción (15 días de campaña). */
export const PROMO_END_DATE = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);

export type Service = {
  id: string;
  name: string;
  description: string;
  price: string;
  recommended?: boolean;
};

export const SERVICES: Record<"pequeno" | "camioneta", Service[]> = {
  pequeno: [
    { id: "latazo", name: "Latazo", description: "Lavado exterior rápido y efectivo.", price: "$8.000" },
    { id: "basico", name: "Enjuague básico", description: "Limpieza exterior para mantener tu vehículo impecable.", price: "$12.000", recommended: true },
    { id: "general", name: "Enjuague general", description: "Limpieza más completa para una mejor presentación.", price: "$17.000" },
  ],
  camioneta: [
    { id: "latazo", name: "Latazo", description: "Lavado exterior rápido y efectivo.", price: "$10.000" },
    { id: "basico", name: "Enjuague básico", description: "Limpieza exterior para mantener tu camioneta impecable.", price: "$15.000", recommended: true },
    { id: "general", name: "Enjuague general", description: "Limpieza más completa para una mejor presentación.", price: "$20.000" },
  ],
};

export type SlotStatus = "disponible" | "parcial" | "completo";

export type TimeSlot = { time: string; occupied: number; capacity: number };

/** Mock de disponibilidad — luego vendrá del motor de disponibilidad (n8n). */
export const MOCK_SLOTS: TimeSlot[] = [
  { time: "08:00", occupied: 2, capacity: 2 },
  { time: "08:30", occupied: 1, capacity: 2 },
  { time: "09:00", occupied: 2, capacity: 2 },
  { time: "09:30", occupied: 0, capacity: 2 },
  { time: "10:00", occupied: 1, capacity: 2 },
  { time: "10:30", occupied: 0, capacity: 2 },
];

export const slotStatus = (s: TimeSlot): SlotStatus =>
  s.occupied >= s.capacity ? "completo" : s.occupied === 0 ? "disponible" : "parcial";

/** Mock de consulta de cliente registrado. */
export const MOCK_CUSTOMER = {
  nombre: "Juan Pérez",
  placa: "ABC123",
  lavadasCompletadas: 3,
  meta: 4,
  ultimasLavadas: [
    { fecha: "28 ago", servicio: "Enjuague general", estado: "Completada" },
    { fecha: "24 ago", servicio: "Enjuague básico", estado: "Completada" },
    { fecha: "18 ago", servicio: "Latazo", estado: "Completada" },
  ],
  proximoCupo: "Hoy · 10:30 AM",
};

/** Normaliza una placa: ABC-123 / abc 123 → ABC123 */
export const normalizePlate = (raw: string) => raw.toUpperCase().replace(/[^A-Z0-9]/g, "");
