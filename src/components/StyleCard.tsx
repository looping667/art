"use client";

interface StyleCardProps {
  name: string;
  description: string;
  color: string;
  selected: boolean;
  onClick: () => void;
}

export default function StyleCard({
  name,
  description,
  color,
  selected,
  onClick,
}: StyleCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative p-5 rounded-xl text-left transition-all duration-200 border-2 ${
        selected
          ? "border-terracotta bg-white shadow-md scale-[1.02]"
          : "border-beige bg-beige/30 hover:border-terracotta/30 hover:bg-white hover:shadow-sm"
      }`}
    >
      {/* Color accent bar */}
      <div
        className="w-full h-1.5 rounded-full mb-3"
        style={{ backgroundColor: color }}
      />
      <h3 className="font-serif text-lg font-semibold text-brown mb-1">
        {name}
      </h3>
      <p className="text-sm text-brown/60 leading-relaxed">{description}</p>
      {selected && (
        <div className="absolute top-3 right-3 w-6 h-6 bg-terracotta rounded-full flex items-center justify-center">
          <svg
            className="w-3.5 h-3.5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}
    </button>
  );
}
