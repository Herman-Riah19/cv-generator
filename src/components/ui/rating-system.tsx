"use client";

import { Star, Heart, Circle, Square, Triangle, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type RatingIconType = "star" | "heart" | "circle" | "square" | "triangle" | "check";

interface RatingIconProps {
  type: RatingIconType;
  filled: boolean;
  onClick?: () => void;
  size?: number;
  className?: string;
}

const iconComponents = {
  star: Star,
  heart: Heart,
  circle: Circle,
  square: Square,
  triangle: Triangle,
  check: Check,
};

const filledColors = {
  star: "fill-foreground text-foreground",
  heart: "fill-foreground text-foreground",
  circle: "fill-foreground text-foreground",
  square: "fill-foreground text-foreground",
  triangle: "fill-foreground text-foreground",
  check: "fill-foreground text-foreground",
};

const emptyColors = {
  star: "text-gray-300 hover:text-gray-400",
  heart: "text-gray-300 hover:text-gray-400",
  circle: "text-gray-300 hover:text-gray-400",
  square: "text-gray-300 hover:text-gray-400",
  triangle: "text-gray-300 hover:text-gray-400",
  check: "text-gray-300 hover:text-gray-400",
};

export function RatingIcon({ type, filled, onClick, size = 20, className }: RatingIconProps) {
  const IconComponent = iconComponents[type];
  const colorClass = filled ? filledColors[type] : emptyColors[type];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("transition-colors", className)}
    >
      <IconComponent
        className={cn(
          filled ? "fill-current" : "",
          colorClass
        )}
        size={size}
      />
    </button>
  );
}

interface RatingSystemProps {
  level: number;
  onChange: (level: number) => void;
  maxLevel?: number;
  iconType?: RatingIconType;
  size?: number;
  className?: string;
  showNumber?: boolean;
}

export function RatingSystem({
  level,
  onChange,
  maxLevel = 5,
  iconType = "star",
  size = 20,
  className = "",
  showNumber = true,
}: RatingSystemProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex gap-1">
        {Array.from({ length: maxLevel }, (_, index) => (
          <RatingIcon
            key={index}
            type={iconType}
            filled={index < level}
            onClick={() => onChange(index + 1)}
            size={size}
          />
        ))}
      </div>
      {showNumber && (
        <span className="text-sm text-gray-500 min-w-[30px]">
          {level}/{maxLevel}
        </span>
      )}
    </div>
  );
}