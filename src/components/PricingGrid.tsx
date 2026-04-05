"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

const tiers = [
  { format: "30x30", formatKey: "format30x30", priceKey: "price30x30" },
  { format: "30x40", formatKey: "format30x40", priceKey: "price30x40" },
  {
    format: "40x40",
    formatKey: "format40x40",
    priceKey: "price40x40",
    popular: true,
  },
  { format: "50x50", formatKey: "format50x50", priceKey: "price50x50" },
  { format: "100x100", formatKey: "format100x100", priceKey: "price100x100" },
];

export default function PricingGrid() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 bg-offwhite">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brown mb-3">
            {t("pricing.title")}
          </h2>
          <p className="text-brown/60 max-w-2xl mx-auto">
            {t("pricing.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {tiers.map((tier) => (
            <div
              key={tier.format}
              className={`relative rounded-2xl p-5 text-center border-2 transition-all hover:shadow-md ${
                tier.popular
                  ? "border-terracotta bg-white shadow-sm"
                  : "border-beige bg-white/60"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-terracotta text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap">
                  {t("pricing.popular")}
                </div>
              )}
              <div className="font-serif text-lg font-semibold text-brown mb-1">
                {t(`create.${tier.formatKey}`)}
              </div>
              <div className="font-serif text-3xl font-bold text-terracotta mb-2">
                {t(`pricing.${tier.priceKey}`)}
              </div>
              <div className="text-[11px] text-brown/50 uppercase tracking-wider">
                {t("pricing.includes")}
              </div>
            </div>
          ))}
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10 text-sm text-brown/60">
          <li className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-terracotta"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {t("pricing.includedArtist")}
          </li>
          <li className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-terracotta"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {t("pricing.includedShipping")}
          </li>
          <li className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-terracotta"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {t("pricing.includedFrame")}
          </li>
        </ul>

        <div className="text-center mt-10">
          <Link
            href={`/${locale}/create`}
            className="inline-flex items-center gap-2 bg-terracotta text-white px-8 py-3.5 rounded-full font-medium hover:bg-terracotta-dark transition-all hover:shadow-lg"
          >
            {t("pricing.ctaStart")}
          </Link>
        </div>
      </div>
    </section>
  );
}
