"use client";

import { useTranslations } from "next-intl";
import FramedPainting from "./FramedPainting";

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
    <section className="py-4 sm:py-6 overflow-hidden">
      <div
        className="flex gap-5 sm:gap-7 hover:[animation-play-state:paused] w-max"
        style={{
          animation: "marquee 30s linear infinite",
        }}
      >
        {items.map((painting, i) => (
          <div key={i} className="flex-shrink-0 w-56 sm:w-72 lg:w-80">
            <FramedPainting
              src={painting.src}
              alt={t(painting.labelKey)}
              size={600}
            />
            <p className="text-center mt-2.5 text-xs sm:text-sm text-brown/50 italic">
              {t(painting.labelKey)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
