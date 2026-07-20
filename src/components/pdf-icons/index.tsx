import { Svg, Path } from "@react-pdf/renderer";

export type RatingIconType = "star" | "heart" | "circle" | "square" | "triangle" | "check";

const ICON_SIZE = 8;
const FILLED_COLOR = "#111827";
const EMPTY_COLOR = "#d1d5db";

const StarIcon = ({ filled }: { filled: boolean }) => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24">
    <Path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill={filled ? FILLED_COLOR : "none"}
      stroke={filled ? FILLED_COLOR : EMPTY_COLOR}
      strokeWidth={2}
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </Svg>
);

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24">
    <Path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      fill={filled ? FILLED_COLOR : "none"}
      stroke={filled ? FILLED_COLOR : EMPTY_COLOR}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CircleIcon = ({ filled }: { filled: boolean }) => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24">
    <Path
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
      fill={filled ? FILLED_COLOR : "none"}
      stroke={filled ? FILLED_COLOR : EMPTY_COLOR}
      strokeWidth={2}
    />
  </Svg>
);

const SquareIcon = ({ filled }: { filled: boolean }) => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24">
    <Path
      d="M3 3h18v18H3V3z"
      fill={filled ? FILLED_COLOR : "none"}
      stroke={filled ? FILLED_COLOR : EMPTY_COLOR}
      strokeWidth={2}
    />
  </Svg>
);

const TriangleIcon = ({ filled }: { filled: boolean }) => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24">
    <Path
      d="M12 2L2 22h20L12 2z"
      fill={filled ? FILLED_COLOR : "none"}
      stroke={filled ? FILLED_COLOR : EMPTY_COLOR}
      strokeWidth={2}
      strokeLinejoin="round"
    />
  </Svg>
);

const CheckIcon = ({ filled }: { filled: boolean }) => (
  <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24">
    {filled ? (
      <Path
        d="M20 6L9 17l-5-5"
        fill="none"
        stroke={FILLED_COLOR}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ) : (
      <Path
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
        fill="none"
        stroke={EMPTY_COLOR}
        strokeWidth={2}
      />
    )}
  </Svg>
);

export const iconComponents: Record<RatingIconType, React.FC<{ filled: boolean }>> = {
  star: StarIcon,
  heart: HeartIcon,
  circle: CircleIcon,
  square: SquareIcon,
  triangle: TriangleIcon,
  check: CheckIcon,
};
