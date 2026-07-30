"use client";

import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Languages className="h-5 w-5" />
        <span className="font-medium">Langue</span>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={toggleLanguage}
        className="min-w-20"
      >
        {language === "fr" ? "FR" : "EN"}
      </Button>
    </div>
  );
}
