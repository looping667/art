import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import HeroCreateForm from "@/components/HeroCreateForm";
import PaintingMarquee from "@/components/PaintingMarquee";

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="flex flex-col">
      {/* Hero Section with inline creation form */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-brown leading-tight mb-4">
            {t("hero.title")}
            <br />
            <span className="text-terracotta">{t("hero.titleHighlight")}</span>
          </h1>
          <p className="text-lg sm:text-xl text-brown/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <HeroCreateForm />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-gold/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-terracotta/10 rounded-full blur-3xl" />
      </section>

      {/* Scrolling painting banner */}
      <PaintingMarquee />

      {/* How it Works */}
      <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 bg-beige/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brown text-center mb-12">
            {t("howItWorks.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: t("howItWorks.step1Title"),
                desc: t("howItWorks.step1Desc"),
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                ),
              },
              {
                num: "02",
                title: t("howItWorks.step2Title"),
                desc: t("howItWorks.step2Desc"),
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                num: "03",
                title: t("howItWorks.step3Title"),
                desc: t("howItWorks.step3Desc"),
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                ),
              },
            ].map((step) => (
              <div
                key={step.num}
                className="bg-white rounded-2xl p-8 text-center shadow-sm border border-beige/50 hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-terracotta/10 text-terracotta mb-5">
                  {step.icon}
                </div>
                <div className="text-xs font-medium text-gold uppercase tracking-widest mb-2">
                  {step.num}
                </div>
                <h3 className="font-serif text-xl font-semibold text-brown mb-3">
                  {step.title}
                </h3>
                <p className="text-brown/60 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-brown text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6">
            {t("hero.title")}
            <br />
            <span className="text-gold">{t("hero.titleHighlight")}</span>
          </h2>
          <p className="text-white/70 mb-8">{t("hero.subtitle")}</p>
          <Link
            href={`/${locale}/create`}
            className="inline-flex items-center gap-2 bg-terracotta text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-terracotta-dark transition-all hover:shadow-lg"
          >
            {t("hero.cta")}
          </Link>
        </div>
      </section>
    </div>
  );
}
