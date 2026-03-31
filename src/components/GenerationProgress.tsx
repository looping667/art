"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const STEPS = [
  { key: "progressStep1", target: 20, duration: 4000 },
  { key: "progressStep2", target: 45, duration: 6000 },
  { key: "progressStep3", target: 70, duration: 5000 },
  { key: "progressStep4", target: 90, duration: 4000 },
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
      {/* Animated canvas being painted */}
      <div className="flex justify-center mb-8">
        <div className="relative w-48 h-48">
          {/* Painting canvas background */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-beige/80 to-beige/40 border-2 border-brown/10 overflow-hidden">
            {/* Animated paint strokes */}
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background:
                  "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(168,86,54,0.08) 8px, rgba(168,86,54,0.08) 9px)",
              }}
            />

            {/* Sweeping brush stroke 1 */}
            <div
              className="absolute top-[20%] h-[15%] rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(168,86,54,0.4) 30%, rgba(168,86,54,0.6) 50%, rgba(168,86,54,0.3) 80%, transparent 100%)",
                animation: "brushStroke1 3s ease-in-out infinite",
              }}
            />

            {/* Sweeping brush stroke 2 */}
            <div
              className="absolute top-[45%] h-[12%] rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(184,148,60,0.4) 20%, rgba(184,148,60,0.6) 50%, rgba(184,148,60,0.3) 70%, transparent 100%)",
                animation: "brushStroke2 3.5s ease-in-out infinite 0.5s",
              }}
            />

            {/* Sweeping brush stroke 3 */}
            <div
              className="absolute top-[68%] h-[10%] rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(120,70,40,0.3) 25%, rgba(120,70,40,0.5) 50%, rgba(120,70,40,0.2) 75%, transparent 100%)",
                animation: "brushStroke3 4s ease-in-out infinite 1s",
              }}
            />

            {/* Reveal mask — painting fills from top to bottom */}
            <div
              className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-beige/80 via-beige/60 to-transparent"
              style={{
                animation: "revealPaint 15s ease-out forwards",
              }}
            />
          </div>

          {/* Floating paint particles */}
          <div
            className="absolute w-2 h-2 rounded-full bg-terracotta/50"
            style={{
              animation: "particle1 2.5s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-gold/50"
            style={{
              animation: "particle2 3s ease-in-out infinite 0.8s",
            }}
          />
          <div
            className="absolute w-1 h-1 rounded-full bg-brown/40"
            style={{
              animation: "particle3 2.8s ease-in-out infinite 1.5s",
            }}
          />

          {/* Paintbrush */}
          <div
            className="absolute"
            style={{
              animation: "brushMove 4s ease-in-out infinite",
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              className="drop-shadow-md"
            >
              <rect
                x="20"
                y="2"
                width="4"
                height="14"
                rx="1"
                fill="#8B6914"
                transform="rotate(35 20 2)"
              />
              <rect
                x="12"
                y="14"
                width="5"
                height="10"
                rx="1"
                fill="#C0C0C0"
                transform="rotate(35 12 14)"
              />
              <ellipse
                cx="8"
                cy="24"
                rx="3"
                ry="4"
                fill="#A85636"
                transform="rotate(35 8 24)"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Progress bar with shimmer */}
      <div className="w-full h-3 bg-beige rounded-full overflow-hidden mb-4 relative">
        <div
          className="h-full bg-gradient-to-r from-terracotta via-gold to-terracotta rounded-full relative overflow-hidden"
          style={{
            width: `${progress}%`,
            transition: "width 0.3s ease-out",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s linear infinite",
          }}
        />
      </div>

      {/* Step text + percentage */}
      <div className="flex justify-between items-center">
        <span
          className="text-sm font-medium text-brown/70"
          style={{ animation: "fadeStep 0.5s ease-out" }}
          key={stepIndex}
        >
          {t(STEPS[stepIndex].key)}
        </span>
        <span className="text-sm text-brown/40 tabular-nums">
          {Math.round(progress)}%
        </span>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes brushStroke1 {
          0%,
          100% {
            left: -20%;
            width: 30%;
          }
          50% {
            left: 90%;
            width: 35%;
          }
        }
        @keyframes brushStroke2 {
          0%,
          100% {
            left: 110%;
            width: 25%;
          }
          50% {
            left: -15%;
            width: 30%;
          }
        }
        @keyframes brushStroke3 {
          0%,
          100% {
            left: -10%;
            width: 20%;
          }
          50% {
            left: 100%;
            width: 28%;
          }
        }
        @keyframes revealPaint {
          0% {
            height: 100%;
          }
          100% {
            height: 10%;
          }
        }
        @keyframes particle1 {
          0%,
          100% {
            top: 30%;
            left: 80%;
            opacity: 0;
            transform: scale(0);
          }
          20% {
            opacity: 1;
            transform: scale(1);
          }
          80% {
            opacity: 0.5;
          }
          100% {
            top: -5%;
            left: 90%;
            transform: scale(0.5);
          }
        }
        @keyframes particle2 {
          0%,
          100% {
            top: 50%;
            right: 75%;
            opacity: 0;
            transform: scale(0);
          }
          20% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            top: 5%;
            right: 85%;
            transform: scale(0.3);
          }
        }
        @keyframes particle3 {
          0%,
          100% {
            bottom: 30%;
            left: 60%;
            opacity: 0;
            transform: scale(0);
          }
          30% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            bottom: 100%;
            left: 70%;
            transform: scale(0.4);
          }
        }
        @keyframes brushMove {
          0%,
          100% {
            top: 15%;
            right: 5%;
            transform: rotate(-10deg);
          }
          25% {
            top: 40%;
            right: 15%;
            transform: rotate(5deg);
          }
          50% {
            top: 60%;
            right: -5%;
            transform: rotate(-15deg);
          }
          75% {
            top: 35%;
            right: 10%;
            transform: rotate(0deg);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        @keyframes fadeStep {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
