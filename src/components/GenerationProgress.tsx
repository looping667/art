"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const STEPS = [
  { key: "progressStep1", target: 25, duration: 3000 },
  { key: "progressStep2", target: 55, duration: 5000 },
  { key: "progressStep3", target: 80, duration: 4000 },
  { key: "progressStep4", target: 95, duration: 3000 },
];

export default function GenerationProgress() {
  const t = useTranslations("create");
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    let currentStep = 0;
    let animFrame: number;
    let startTime: number;
    let startProgress = 0;

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const step = STEPS[currentStep];
      if (!step) return;

      const elapsed = timestamp - startTime;
      const ratio = Math.min(elapsed / step.duration, 1);
      // Ease-out curve
      const eased = 1 - Math.pow(1 - ratio, 3);
      const current = startProgress + (step.target - startProgress) * eased;

      setProgress(current);

      if (ratio >= 1 && currentStep < STEPS.length - 1) {
        currentStep++;
        startProgress = step.target;
        startTime = timestamp;
        setStepIndex(currentStep);
      }

      if (!(currentStep === STEPS.length - 1 && ratio >= 1)) {
        animFrame = requestAnimationFrame(animate);
      }
    }

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  return (
    <div className="py-12 max-w-md mx-auto">
      {/* Painting easel icon */}
      <div className="flex justify-center mb-6">
        <svg className="w-16 h-16 text-terracotta/40" fill="none" viewBox="0 0 64 64" stroke="currentColor" strokeWidth={1.5}>
          <rect x="14" y="8" width="36" height="32" rx="2" />
          <line x1="20" y1="48" x2="32" y2="56" />
          <line x1="44" y1="48" x2="32" y2="56" />
          <line x1="32" y1="40" x2="32" y2="52" />
          <circle cx="32" cy="24" r="8" strokeDasharray="4 3" />
        </svg>
      </div>

      {/* Progress bar */}
      <div className="w-full h-3 bg-beige rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-terracotta to-gold rounded-full"
          style={{
            width: `${progress}%`,
            transition: "width 0.3s ease-out",
          }}
        />
      </div>

      {/* Percentage */}
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-brown/70">
          {t(STEPS[stepIndex].key)}
        </span>
        <span className="text-sm text-brown/40 tabular-nums">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}
