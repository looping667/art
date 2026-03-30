"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const newLocale = locale === "fr" ? "en" : "fr";
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={switchLocale}
      className="text-sm font-medium text-brown/70 hover:text-terracotta transition-colors px-2 py-1 rounded-md hover:bg-beige/50"
    >
      {locale === "fr" ? "EN" : "FR"}
    </button>
  );
}
