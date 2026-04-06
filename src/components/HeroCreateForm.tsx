"use client";

import { useState, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { artStyles } from "@/lib/styles";
import ImageDropZone from "@/components/ImageDropZone";

export default function HeroCreateForm() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("free");
  const [enhancing, setEnhancing] = useState(false);
  const [referenceImage, setReferenceImage] = useState<{
    base64: string;
    mimeType: string;
  } | null>(null);

  const handleImageChange = useCallback(
    (data: { base64: string; mimeType: string } | null) => {
      setReferenceImage(data);
    },
    []
  );

  const selectedStyleObj = artStyles.find((s) => s.id === selectedStyle);
  const selectedStyleDesc = selectedStyleObj
    ? t(`create.${selectedStyleObj.descKey}`)
    : "";

  const examples = [
    t("create.descExample1"),
    t("create.descExample2"),
    t("create.descExample3"),
    t("create.descExample4"),
  ];

  const handleEnhance = async () => {
    if (!description.trim() || enhancing) return;
    setEnhancing(true);
    try {
      const res = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: description,
          style: selectedStyle,
          locale,
        }),
      });
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Enhance response not JSON:", text.slice(0, 200));
        return;
      }
      if (data.enhanced) {
        setDescription(data.enhanced);
      } else {
        console.error("Enhance: no enhanced field", data);
      }
    } catch (err) {
      console.error("Enhance failed:", err);
    } finally {
      setEnhancing(false);
    }
  };

  const handleGenerate = () => {
    if (!description.trim()) return;
    // Store reference image in sessionStorage (too large for URL params)
    if (referenceImage) {
      sessionStorage.setItem("refImage", JSON.stringify(referenceImage));
    } else {
      sessionStorage.removeItem("refImage");
    }
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

      {/* Enhance button */}
      <button
        onClick={handleEnhance}
        disabled={!description.trim() || enhancing}
        className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium border-2 border-gold/40 text-gold hover:bg-gold/10 hover:border-gold/60 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {enhancing ? (
          <>
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {t("hero.enhancing")}
          </>
        ) : (
          <>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
            </svg>
            {t("hero.enhance")}
          </>
        )}
      </button>

      {/* Reference image drop zone */}
      <div className="mt-4">
        <ImageDropZone
          onImage={handleImageChange}
          label={
            referenceImage
              ? t("hero.imageAttached")
              : t("hero.dropImage")
          }
          hint={
            referenceImage
              ? t("hero.imageAttachedHint")
              : t("hero.dropImageHint")
          }
        />
      </div>

      {/* Separator */}
      <div className="border-t border-beige my-5" />

      {/* Style selection */}
      <p className="text-sm font-medium text-brown mb-3">
        {t("hero.chooseStyle")}
      </p>
      <div className="flex flex-wrap gap-2">
        {artStyles.map((style) => {
          const isSelected = selectedStyle === style.id;
          return (
            <button
              key={style.id}
              type="button"
              onClick={() => setSelectedStyle(style.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
                isSelected
                  ? "border-terracotta bg-terracotta/10 text-brown shadow-sm"
                  : "border-beige bg-offwhite text-brown/70 hover:border-brown/20 hover:text-brown"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: style.color }}
              />
              {t(`create.${style.nameKey}`)}
            </button>
          );
        })}
      </div>
      {/* Selected style description */}
      <p className="mt-3 text-xs text-brown/50 italic min-h-[1rem]">
        {selectedStyleDesc}
      </p>

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
