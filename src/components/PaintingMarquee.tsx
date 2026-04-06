"use client";

import { useTranslations } from "next-intl";
import FramedPainting from "./FramedPainting";

const paintings = [
  {
    src: "https://pfdpgezwwkhltzczgwem.supabase.co/storage/v1/object/public/paintings/d41c12d7-5aa4-49bc-bfa8-4639d7de2c45.png",
    labelKey: "painting1",
  },
  {
    src: "https://pfdpgezwwkhltzczgwem.supabase.co/storage/v1/object/public/paintings/a280477b-64df-4818-b194-2b60b11ac893.png",
    labelKey: "painting2",
  },
  {
    src: "https://pfdpgezwwkhltzczgwem.supabase.co/storage/v1/object/public/paintings/38a6dc9b-1d87-4a2e-a546-3eace8211db3.png",
    labelKey: "painting3",
  },
  {
    src: "https://pfdpgezwwkhltzczgwem.supabase.co/storage/v1/object/public/paintings/777e5f23-c74d-4d98-9468-fe661ea98a99.png",
    labelKey: "painting4",
  },
  {
    src: "https://pfdpgezwwkhltzczgwem.supabase.co/storage/v1/object/public/paintings/06a28955-cf23-498e-91c7-74c8c42de57c.png",
    labelKey: "painting5",
  },
  {
    src: "https://pfdpgezwwkhltzczgwem.supabase.co/storage/v1/object/public/paintings/8f3b07bb-a5b8-45e8-bc59-b02e5a53565e.png",
    labelKey: "painting6",
  },
  {
    src: "https://pfdpgezwwkhltzczgwem.supabase.co/storage/v1/object/public/paintings/fb8ca188-356f-40ab-b0a5-cf242ff8e4b1.png",
    labelKey: "painting7",
  },
  {
    src: "https://pfdpgezwwkhltzczgwem.supabase.co/storage/v1/object/public/paintings/98b1367b-4bf9-48cc-9865-4de94118bd17.png",
    labelKey: "painting8",
  },
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
          animation: "marquee 45s linear infinite",
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
