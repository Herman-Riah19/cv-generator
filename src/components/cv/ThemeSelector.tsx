"use client";

import { useState } from "react";

const AVAILABLE_THEMES = [
  { id: "default", name: "Default (ATS-Friendly)", package: "default" },
  { id: "even", name: "Even (Moderne)", package: "jsonresume-theme-even" },
  {
    id: "class",
    name: "Class (Professionnel)",
    package: "@jsonresume/jsonresume-theme-class",
  },
  {
    id: "compact",
    name: "Compact",
    package: "@warleon/jsonresume-theme-compact",
  },
];

interface ThemeSelectorProps {
  onThemeChange?: (themePackage: string) => void;
}

export function ThemeSelector({ onThemeChange }: ThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState("default");

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    const theme = AVAILABLE_THEMES.find((t) => t.id === themeId);
    if (theme && onThemeChange) {
      onThemeChange(theme.package);
    }
  };

  return (
    <div>
      <h3 className="font-medium mb-3">Thème du CV</h3>
      <select
        value={selectedTheme}
        onChange={(e) => handleThemeChange(e.target.value)}
        className="w-full p-2 border rounded-md bg-background"
      >
        {AVAILABLE_THEMES.map((theme) => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>
      <p className="text-xs text-gray-500 mt-2">
        Thème pour l&apos;export via resume-cli
      </p>
    </div>
  );
}
