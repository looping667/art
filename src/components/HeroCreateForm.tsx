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
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl border border-beige shadow-sm p-5 sm:p-8">
      {/* Textarea */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={t("hero.promptPlaceholder")}
        rows={3}
        className="w-full px-4 py-3 rounded-xl border-2 border-beige bg-offwhite focus:outline-none focus:border-terracotta transition-colors text-brown placeholder-brown/30 resize-none text-base"
      />

      {/* Examples */}
      <div className="flex flex-wrap items-center gap-1.5 mt-3">
        <span className="text-xs text-brown/40 font-medium mr-1">
          {t("hero.tryExamples")}
        </span>
        {examples.map((ex, i) => (
          <button
            key={i}
            onClick={() => setDescription(ex)}
            className="text-xs px-2.5 py-1 rounded-full text-brown/50 hover:bg-beige/60 hover:text-brown transition-colors italic"
          >
            {ex}
          </button>
        ))}
      </div>

      {/* Separator */}
      <div className="border-t border-beige my-5" />

      {/* Style selection */}
      <p className="text-sm font-medium text-brown mb-3">
        {t("hero.chooseStyle")}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {artStyles.map((style) => {
          const isSelected = selectedStyle === style.id;
          return (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`relative text-left p-3 rounded-xl border-2 transition-all ${
                isSelected
                  ? "border-terracotta bg-terracotta/5"
                  : "border-beige/80 bg-offwhite hover:border-brown/20"
              }`}
            >
              {/* Radio indicator */}
              <div className="absolute top-3 right-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? "border-terracotta" : "border-brown/20"
                  }`}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-terracotta" />
                  )}
                </div>
              </div>
              {/* Color dot + name */}
              <div className="flex items-center gap-2 mb-0.5 pr-5">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: style.color }}
                />
                <span className="text-sm font-semibold text-brown leading-tight">
                  {t(`create.${style.nameKey}`)}
                </span>
              </div>
              {/* Description */}
              <p className="text-xs text-brown/50 leading-snug pl-[18px]">
                {t(`create.${style.descKey}`)}
              </p>
            </button>
          );
        })}
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={!description.trim()}
        className="w-full mt-6 inline-flex items-center justify-center gap-2 bg-terracotta text-white px-6 py-3.5 rounded-xl text-base font-medium hover:bg-terracotta-dark transition-all hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
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
  );
}
