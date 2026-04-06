"use client";

import { useCallback, useState, useRef } from "react";
import Image from "next/image";

interface ImageDropZoneProps {
  onImage: (data: { base64: string; mimeType: string } | null) => void;
  label: string;
  hint: string;
}

const MAX_SIZE_MB = 5;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

export default function ImageDropZone({
  onImage,
  label,
  hint,
}: ImageDropZoneProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (file: File) => {
      if (!ACCEPTED.includes(file.type)) return;
      if (file.size > MAX_SIZE_MB * 1024 * 1024) return;

      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setPreview(dataUrl);
        // Extract base64 after "data:image/...;base64,"
        const base64 = dataUrl.split(",")[1];
        onImage({ base64, mimeType: file.type });
      };
      reader.readAsDataURL(file);
    },
    [onImage]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const clear = useCallback(() => {
    setPreview(null);
    onImage(null);
    if (inputRef.current) inputRef.current.value = "";
  }, [onImage]);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => !preview && inputRef.current?.click()}
      className={`relative rounded-xl border-2 border-dashed transition-all cursor-pointer ${
        preview
          ? "border-terracotta/40 bg-terracotta/5 p-3"
          : dragging
            ? "border-terracotta bg-terracotta/10 p-6"
            : "border-beige hover:border-brown/30 p-6"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        onChange={handleChange}
        className="hidden"
      />

      {preview ? (
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-beige">
            <Image
              src={preview}
              alt="Reference"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-brown truncate">{label}</p>
            <p className="text-xs text-brown/50">{hint}</p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              clear();
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-beige/60 text-brown/40 hover:text-brown transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="text-center">
          <svg
            className="w-8 h-8 mx-auto mb-2 text-brown/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm text-brown/50">{label}</p>
          <p className="text-xs text-brown/30 mt-1">{hint}</p>
        </div>
      )}
    </div>
  );
}
