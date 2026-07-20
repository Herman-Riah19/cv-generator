export interface CVTheme {
  id: string;
  name: string;
  preview: {
    headingColor: string;
    textColor: string;
    mutedColor: string;
    separatorColor: string;
    badge: string;
    cardBg: string;
  };
  pdf: {
    headingColor: string;
    textColor: string;
    mutedColor: string;
    separatorColor: string;
    badgeBg: string;
    badgeText: string;
    badgeBorderRadius: number;
    primaryColor: string;
  };
}

const defaultTheme: CVTheme = {
  id: "default",
  name: "Classic",
  preview: {
    headingColor: "text-gray-900",
    textColor: "text-gray-700",
    mutedColor: "text-gray-600",
    separatorColor: "border-gray-300",
    badge: "bg-primary text-primary-foreground",
    cardBg: "bg-white",
  },
  pdf: {
    headingColor: "#111827",
    textColor: "#374151",
    mutedColor: "#6b7280",
    separatorColor: "#d1d5db",
    badgeBg: "#1f2937",
    badgeText: "#ffffff",
    badgeBorderRadius: 6,
    primaryColor: "#111827",
  },
};

const modernTheme: CVTheme = {
  id: "modern",
  name: "Moderne",
  preview: {
    headingColor: "text-blue-900",
    textColor: "text-slate-700",
    mutedColor: "text-slate-500",
    separatorColor: "border-blue-200",
    badge: "bg-blue-600 text-white",
    cardBg: "bg-white",
  },
  pdf: {
    headingColor: "#1e3a5f",
    textColor: "#334155",
    mutedColor: "#64748b",
    separatorColor: "#bfdbfe",
    badgeBg: "#2563eb",
    badgeText: "#ffffff",
    badgeBorderRadius: 6,
    primaryColor: "#2563eb",
  },
};

const minimalTheme: CVTheme = {
  id: "minimal",
  name: "Minimal",
  preview: {
    headingColor: "text-neutral-800",
    textColor: "text-neutral-600",
    mutedColor: "text-neutral-400",
    separatorColor: "border-neutral-200",
    badge: "bg-neutral-800 text-neutral-100",
    cardBg: "bg-white",
  },
  pdf: {
    headingColor: "#262626",
    textColor: "#525252",
    mutedColor: "#a3a3a3",
    separatorColor: "#e5e5e5",
    badgeBg: "#262626",
    badgeText: "#f5f5f5",
    badgeBorderRadius: 4,
    primaryColor: "#262626",
  },
};

const elegantTheme: CVTheme = {
  id: "elegant",
  name: "Élégant",
  preview: {
    headingColor: "text-rose-900",
    textColor: "text-stone-700",
    mutedColor: "text-stone-500",
    separatorColor: "border-rose-200",
    badge: "bg-rose-700 text-white",
    cardBg: "bg-white",
  },
  pdf: {
    headingColor: "#881337",
    textColor: "#44403c",
    mutedColor: "#78716c",
    separatorColor: "#fecdd3",
    badgeBg: "#be123c",
    badgeText: "#ffffff",
    badgeBorderRadius: 6,
    primaryColor: "#be123c",
  },
};

export const themes: Record<string, CVTheme> = {
  default: defaultTheme,
  modern: modernTheme,
  minimal: minimalTheme,
  elegant: elegantTheme,
};

export const themeList: CVTheme[] = Object.values(themes);

export function getTheme(id: string): CVTheme {
  return themes[id] || defaultTheme;
}
