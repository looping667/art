"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import Link from "next/link";
import StepIndicator from "@/components/StepIndicator";
import StyleCard from "@/components/StyleCard";
import OrderForm from "@/components/OrderForm";
import GenerationProgress from "@/components/GenerationProgress";
import { artStyles } from "@/lib/styles";

type Step = 0 | 1 | 2 | 3;

export default function CreatePage() {
  const t = useTranslations("create");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>(0);
  const [description, setDescription] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [generationId, setGenerationId] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [autoGenerate, setAutoGenerate] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("art-session-id");
    if (stored) {
      setSessionId(stored);
    } else {
      const id = uuidv4();
      sessionStorage.setItem("art-session-id", id);
      setSessionId(id);
    }
  }, []);

  // Read query params from hero form
  useEffect(() => {
    const prompt = searchParams.get("prompt");
    const style = searchParams.get("style");
    if (prompt) {
      setDescription(prompt);
      if (style) setSelectedStyle(style);
      setStep(1);
      setAutoGenerate(true);
    }
  }, [searchParams]);

  // Auto-generate when coming from hero form
  useEffect(() => {
    if (autoGenerate && sessionId && description && selectedStyle) {
      setAutoGenerate(false);
      handleGenerate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoGenerate, sessionId]);

  const steps = [
    t("stepDescriptionAndStyle"),
    t("stepGenerate"),
    t("stepOrder"),
  ];

  const examples = [
    t("descExample1"),
    t("descExample2"),
    t("descExample3"),
    t("descExample4"),
  ];

  const handleGenerate = async () => {
    if (attemptsLeft <= 0) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: description,
          style: selectedStyle,
          sessionId,
        }),
      });
      if (!res.ok) throw new Error("Generation failed");
      const data = await res.json();
      setImageUrl(data.imageUrl);
      setGenerationId(data.generationId);
      setAttemptsLeft((prev) => prev - 1);
    } catch {
      setError(t("generateError"));
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Confirmation screen
  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-serif text-3xl font-bold text-brown mb-4">
          {t("confirmTitle")}
        </h2>
        <p className="text-brown/70 mb-8 leading-relaxed">
          {t("confirmMessage", { email: confirmEmail })}
        </p>
        {imageUrl && (
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg inline-block">
            <Image
              src={imageUrl}
              alt="Your painting"
              width={400}
              height={400}
              className="object-cover"
            />
          </div>
        )}
        <div>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 bg-terracotta text-white px-6 py-3 rounded-full font-medium hover:bg-terracotta-dark transition-colors"
          >
            {t("backToHome")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <StepIndicator steps={steps} current={step} />

      {/* Step 0: Description + Style (merged) */}
      {step === 0 && (
        <div className="space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brown text-center">
            {t("descTitle")}
          </h2>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t("descPlaceholder")}
            rows={5}
            className="w-full px-5 py-4 rounded-xl border-2 border-beige bg-white focus:outline-none focus:border-terracotta transition-colors text-brown placeholder-brown/30 resize-none"
          />
          <div>
            <p className="text-sm text-brown/50 mb-2">{t("descExamples")}</p>
            <div className="flex flex-wrap gap-2">
              {examples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setDescription(ex)}
                  className="text-sm px-3 py-1.5 rounded-full bg-beige/50 text-brown/70 hover:bg-beige hover:text-brown transition-colors border border-beige"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          {/* Style selection inline */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-brown mb-4">
              {t("styleTitle")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {artStyles.map((style) => (
                <StyleCard
                  key={style.id}
                  name={t(style.nameKey)}
                  description={t(style.descKey)}
                  color={style.color}
                  selected={selectedStyle === style.id}
                  onClick={() => setSelectedStyle(style.id)}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setStep(1)}
              disabled={!description.trim() || !selectedStyle}
              className="px-8 py-3 rounded-full bg-terracotta text-white font-medium hover:bg-terracotta-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t("continue")}
            </button>
          </div>
        </div>
      )}

      {/* Step 1: Generate */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brown text-center">
            {t("generateTitle")}
          </h2>

          {!imageUrl && !loading && (
            <div className="text-center py-12">
              <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-beige/50 flex items-center justify-center">
                <svg className="w-16 h-16 text-brown/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <button
                onClick={handleGenerate}
                className="px-8 py-4 rounded-full bg-terracotta text-white text-lg font-medium hover:bg-terracotta-dark transition-all hover:shadow-lg hover:scale-105"
              >
                {t("generateBtn")}
              </button>
            </div>
          )}

          {loading && <GenerationProgress />}

          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}

          {imageUrl && !loading && (
            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-beige mx-auto max-w-md">
                <Image
                  src={imageUrl}
                  alt="Generated painting"
                  width={1024}
                  height={1024}
                  className="w-full h-auto"
                />
              </div>
              <p className="text-center text-sm text-brown/50">
                {t("attemptsLeft", { count: attemptsLeft })}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {attemptsLeft > 0 && (
                  <button
                    onClick={handleGenerate}
                    className="px-6 py-3 rounded-full border-2 border-beige text-brown hover:bg-beige/50 transition-colors font-medium"
                  >
                    {t("regenerateBtn")}
                  </button>
                )}
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3 rounded-full bg-gold text-white font-medium hover:bg-gold-dark transition-colors"
                >
                  {t("wantThis")}
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-start">
            <button
              onClick={() => setStep(0)}
              className="px-6 py-3 rounded-full border-2 border-beige text-brown hover:bg-beige/50 transition-colors font-medium"
            >
              {t("back")}
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Order Form */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brown text-center">
            {t("orderTitle")}
          </h2>
          {imageUrl && (
            <div className="flex justify-center mb-4">
              <div className="w-48 h-48 rounded-xl overflow-hidden shadow-md border border-beige">
                <Image
                  src={imageUrl}
                  alt="Your painting"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
          <OrderForm
            generationId={generationId}
            imageUrl={imageUrl}
            onBack={() => setStep(1)}
            onSuccess={(email) => {
              setConfirmEmail(email);
              setStep(3);
            }}
          />
        </div>
      )}
    </div>
  );
}
