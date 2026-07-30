"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { generateExperienceDescription } from "@/lib/ai";
import { Sparkles, Loader2 } from "lucide-react";

interface AIGenerateButtonProps {
  position: string;
  company: string;
  onGenerated: (descriptions: string[]) => void;
}

export function AIGenerateButton({
  position,
  company,
  onGenerated,
}: AIGenerateButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!position || !company) {
      setError("Veuillez d'abord remplir le poste et la société");
      return;
    }

    setError(null);
    setIsGenerating(true);

    try {
      const descriptions = await generateExperienceDescription({
        position,
        company,
      });

      onGenerated(descriptions);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erreur lors de la génération",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-2">
      <Button
        type="button"
        onClick={handleGenerate}
        disabled={isGenerating}
        variant="secondary"
        size="sm"
        className="w-full"
      >
        {isGenerating ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Sparkles className="h-4 w-4 mr-2" />
        )}
        {isGenerating ? "Génération..." : "Générer avec IA"}
      </Button>

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
