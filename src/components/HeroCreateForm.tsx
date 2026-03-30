"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { artStyles } from "@/lib/styles";

export default function HeroCreateForm() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("free");

  const examples = [
    t("create.descExample1"),
    t("create.descExample2"),
    t("create.descExample3"),
    t("create.descExample4"),
  ];

  const handleGenerate = () => {
    if (!description.trim()) return;
    const params = new URLSearchParams({
      prompt: description,
      style: selectedStyle,
    });
    router.push(`/${locale}/create?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Textarea */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={t("hero.promptPlaceholder")}
        rows={3}
        className="w-full px-5 py-4 rounded-xl border-2 border-beige bg-white focus:outline-none focus:border-terracotta transition-colors text-brown placeholder-brown/30 resize-none shadow-sm text-base"
      />

      {/* Examples */}
      <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
        {examples.map((ex, i) => (
          <button
            key={i}
            onClick={() => setDescription(ex)}
            className="text-xs px-2.5 py-1 rounded-full bg-white/80 text-brown/60 hover:bg-beige hover:text-brown transition-colors border border-beige/70"
          >
            {ex}
          </button>
        ))}
      </div>

      {/* Style chips */}
      <div className="flex flex-wrap gap-2 mb-5 justify-center">
        {artStyles.map((style) => (
          <button
            key={style.id}
            onClick={() => setSelectedStyle(style.id)}
            className={`text-sm px-4 py-2 rounded-full font-medium transition-all ${
              selectedStyle === style.id
                ? "bg-terracotta text-white shadow-md scale-105"
                : "bg-white text-brown/70 border border-beige hover:border-terracotta/40 hover:text-brown"
            }`}
          >
            {t(`create.${style.nameKey}`)}
          </button>
        ))}
      </div>

      {/* Generate button */}
      <div className="text-center">
        <button
          onClick={handleGenerate}
          disabled={!description.trim()}
          className="inline-flex items-center gap-2 bg-terracotta text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-terracotta-dark transition-all hover:shadow-lg hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {t("hero.cta")}
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
