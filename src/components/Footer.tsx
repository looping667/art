"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="w-full border-t border-beige bg-offwhite py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <p className="font-serif text-lg text-brown/80 mb-2">
          {t("tagline")}
        </p>
        <p className="text-sm text-brown/50">
          {t("copyright", { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
