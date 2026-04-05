"use client";

import Image from "next/image";

interface FramedPaintingProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export default function FramedPainting({
  src,
  alt,
  size = 400,
  className = "",
}: FramedPaintingProps) {
  return (
    <div
      className={`block w-full ${className}`}
      style={{ maxWidth: size }}
    >
      <div className="relative w-full">
        {/* Outer frame — dark walnut wood */}
        <div
          className="relative w-full p-[6%] rounded-sm"
          style={{
            background:
              "linear-gradient(145deg, #5a3a1a 0%, #3d2510 25%, #4a2e14 50%, #5c3818 75%, #3a2008 100%)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.08), inset 0 -1px 1px rgba(0,0,0,0.3)",
          }}
        >
          {/* Wood grain texture overlay */}
          <div
            className="absolute inset-0 rounded-sm pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)",
            }}
          />

          {/* Inner bevel — gold/gilded lip */}
          <div
            className="relative p-[3px] rounded-[1px]"
            style={{
              background:
                "linear-gradient(145deg, #c4a35a 0%, #8b6914 30%, #d4b56a 50%, #8b6914 70%, #a07830 100%)",
              boxShadow:
                "inset 0 1px 2px rgba(255,255,255,0.3), inset 0 -1px 2px rgba(0,0,0,0.4)",
            }}
          >
            {/* Painting */}
            <Image
              src={src}
              alt={alt}
              width={size}
              height={size}
              className="block w-full aspect-square object-cover"
            />
          </div>
        </div>

        {/* Subtle wall shadow under frame */}
        <div
          className="absolute -bottom-3 left-[5%] right-[5%] h-4 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}
