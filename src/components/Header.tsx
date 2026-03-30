"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("header");
  const locale = useLocale();

  return (
    <header className="w-full border-b border-beige bg-offwhite/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="font-serif text-2xl font-semibold text-brown tracking-wide"
        >
          {t("brand")}
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            href={`/${locale}#how-it-works`}
            className="hidden sm:block text-sm text-brown/70 hover:text-terracotta transition-colors"
          >
            {t("howItWorks")}
          </Link>
          <Link
            href={`/${locale}/create`}
            className="text-sm font-medium bg-terracotta text-white px-4 py-2 rounded-full hover:bg-terracotta-dark transition-colors"
          >
            {t("create")}
          </Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
