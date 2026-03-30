"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface OrderFormProps {
  generationId: string;
  imageUrl: string;
  onSuccess: (email: string) => void;
  onBack: () => void;
}

export default function OrderForm({
  generationId,
  imageUrl,
  onSuccess,
  onBack,
}: OrderFormProps) {
  const t = useTranslations("create");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    format: "60x80",
    messageArtiste: "",
  });

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.prenom.trim()) errs.prenom = t("required");
    if (!form.nom.trim()) errs.nom = t("required");
    if (!form.email.trim()) errs.email = t("required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = t("invalidEmail");
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          generationId,
          imageUrl,
          ...form,
        }),
      });
      if (!res.ok) throw new Error("Order failed");
      onSuccess(form.email);
    } catch {
      setErrors({ form: "An error occurred" });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border-2 transition-colors bg-white focus:outline-none focus:border-terracotta ${
      errors[field] ? "border-red-400" : "border-beige"
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-brown mb-1">
            {t("firstName")} *
          </label>
          <input
            type="text"
            value={form.prenom}
            onChange={(e) => setForm({ ...form, prenom: e.target.value })}
            className={inputClass("prenom")}
          />
          {errors.prenom && (
            <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-brown mb-1">
            {t("lastName")} *
          </label>
          <input
            type="text"
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
            className={inputClass("nom")}
          />
          {errors.nom && (
            <p className="text-red-500 text-xs mt-1">{errors.nom}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brown mb-1">
          {t("email")} *
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputClass("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-brown mb-1">
          {t("phone")}
        </label>
        <input
          type="tel"
          value={form.telephone}
          onChange={(e) => setForm({ ...form, telephone: e.target.value })}
          className={inputClass("telephone")}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-brown mb-1">
          {t("format")} *
        </label>
        <select
          value={form.format}
          onChange={(e) => setForm({ ...form, format: e.target.value })}
          className={inputClass("format")}
        >
          <option value="40x50">{t("format40x50")}</option>
          <option value="60x80">{t("format60x80")}</option>
          <option value="100x120">{t("format100x120")}</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-brown mb-1">
          {t("messageArtist")}
        </label>
        <textarea
          value={form.messageArtiste}
          onChange={(e) => setForm({ ...form, messageArtiste: e.target.value })}
          rows={3}
          placeholder={t("messagePlaceholder")}
          className={inputClass("messageArtiste")}
        />
      </div>

      {errors.form && (
        <p className="text-red-500 text-sm text-center">{errors.form}</p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-full border-2 border-beige text-brown hover:bg-beige/50 transition-colors font-medium"
        >
          {t("back")}
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 px-6 py-3 rounded-full bg-terracotta text-white font-medium hover:bg-terracotta-dark transition-colors disabled:opacity-50"
        >
          {submitting ? t("submitting") : t("submitOrder")}
        </button>
      </div>
    </form>
  );
}
