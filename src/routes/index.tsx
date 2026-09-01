import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { PromotionSection } from "@/components/landing/PromotionSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { TelegramSection } from "@/components/landing/TelegramSection";
import { AvailabilitySection } from "@/components/landing/AvailabilitySection";
import { CustomerSection } from "@/components/landing/CustomerSection";
import { InfoSection } from "@/components/landing/InfoSection";
import { Footer, WhatsAppButton } from "@/components/landing/Footer";

const TITLE = "Las Delicias | Lavadero de Autos en San Juan del Cesar";
const DESCRIPTION =
  "Lava tu vehículo en Las Delicias, San Juan del Cesar. Consulta nuestros servicios, precios, horarios y participa en la promoción: 4 lavadas en 30 días y recibe 1 gratis.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_CO" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PromotionSection />
        <PricingSection />
        <TelegramSection />
        <AvailabilitySection />
        <CustomerSection />
        <InfoSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
