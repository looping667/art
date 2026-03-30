"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const paintings = [
  { src: "/gallery/painting-1.jpg", labelKey: "painting1" },
  { src: "/gallery/painting-2.jpg", labelKey: "painting2" },
  { src: "/gallery/painting-3.jpg", labelKey: "painting3" },
  { src: "/gallery/painting-4.jpg", labelKey: "painting4" },
  { src: "/gallery/painting-5.jpg", labelKey: "painting5" },
];

export default function PaintingMarquee() {
  const t = useTranslations("gallery");

  // Double the items for seamless loop
  const items = [...paintings, ...paintings];

  return (
    <section className="py-12 sm:py-16 overflow-hidden bg-beige/20">
      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brown text-center mb-2">
        {t("title")}
      </h2>
      <p className="text-brown/60 text-center mb-8 text-sm sm:text-base">
        {t("subtitle")}
      </p>

      <div
        className="flex gap-6 sm:gap-8 hover:[animation-play-state:paused] w-max"
        style={{
          animation: "marquee 40s linear infinite",
        }}
      >
        {items.map((painting, i) => (
          <div key={i} className="flex-shrink-0 w-48 sm:w-64">
            <div className="bg-black p-2 sm:p-3 rounded-sm shadow-xl">
              <Image
                src={painting.src}
                alt={t(painting.labelKey)}
                width={400}
                height={400}
                className="w-full aspect-square object-cover"
              />
            </div>
            <p className="text-center mt-3 text-xs sm:text-sm text-brown/60 italic">
              {t(painting.labelKey)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
