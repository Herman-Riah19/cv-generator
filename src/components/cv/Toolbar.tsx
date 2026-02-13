"use client";

import { useState, useEffect } from "react";
import { CVData } from "@/types/cv";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  convertToJSONResume,
  downloadJSON,
  validateJSONResume,
} from "@/lib/json-resume";
import {
  generateExperienceDescription,
  checkLMStudioConnection,
  setLmStudioBaseUrl,
  getLmStudioUrl,
} from "@/lib/lm-studio";
import {
  Download,
  FileJson,
  Check,
  Loader2,
  Sparkles,
  Settings,
  ChevronDown,
  ChevronUp,
  Server,
} from "lucide-react";

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

const DEFAULT_LM_STUDIO_URL = "http://localhost:1234/v1";

interface ToolbarProps {
  data: CVData;
  onThemeChange?: (theme: string) => void;
}

export function Toolbar({ data, onThemeChange }: ToolbarProps) {
  const [selectedTheme, setSelectedTheme] = useState("default");
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleExportJSON = async () => {
    setIsExporting(true);
    setExportStatus("idle");
    setValidationErrors([]);

    try {
      const jsonResume = convertToJSONResume(data);
      const validation = validateJSONResume(jsonResume);

      if (!validation.valid) {
        setValidationErrors(validation.errors);
        setExportStatus("error");
        setIsExporting(false);
        return;
      }

      const fileName = data.personalInfo.name
        ? `resume_${data.personalInfo.name.replace(/\s+/g, "_")}.json`
        : "resume.json";

      downloadJSON(jsonResume, fileName);
      setExportStatus("success");
    } catch (error) {
      console.error("Export error:", error);
      setExportStatus("error");
    } finally {
      setIsExporting(false);
    }
  };

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    const theme = AVAILABLE_THEMES.find((t) => t.id === themeId);
    if (theme && onThemeChange) {
      onThemeChange(theme.package);
    }
  };

  return (
    <div className="space-y-4">
      {/* Theme Selection */}
      <div className="bg-white rounded-lg border p-4">
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

      {/* JSON Export */}
      <div className="bg-white rounded-lg border p-4 space-y-3">
        <h3 className="font-medium">Exporter en JSON</h3>

        {validationErrors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-600 font-medium mb-1">
              Erreurs de validation:
            </p>
            <ul className="text-xs text-red-500 list-disc list-inside">
              {validationErrors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <Button
          onClick={handleExportJSON}
          disabled={isExporting}
          variant="outline"
          className="w-full"
        >
          {isExporting ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : exportStatus === "success" ? (
            <Check className="h-4 w-4 mr-2 text-green-500" />
          ) : (
            <FileJson className="h-4 w-4 mr-2" />
          )}
          {isExporting ? "Validation..." : "Exporter JSON"}
        </Button>

        {exportStatus === "success" && (
          <p className="text-xs text-green-600 text-center">
            Fichier JSON validé et téléchargé!
          </p>
        )}
      </div>
    </div>
  );
}

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
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [lmStudioUrl, setLmStudioUrl] = useState(DEFAULT_LM_STUDIO_URL);

  useEffect(() => {
    setLmStudioUrl(getLmStudioUrl());
  }, []);

  const handleSaveUrl = () => {
    setLmStudioBaseUrl(lmStudioUrl);
    setShowSettings(false);
  };

  const handleCheckConnection = async () => {
    const connected = await checkLMStudioConnection(lmStudioUrl);
    setIsConnected(connected);
    return connected;
  };

  const handleGenerate = async () => {
    if (!position || !company) {
      setError("Veuillez d'abord remplir le poste et la société");
      return;
    }

    setLmStudioBaseUrl(lmStudioUrl);
    setError(null);
    setIsGenerating(true);

    try {
      const connected = await handleCheckConnection();
      if (!connected) {
        setError("LM Studio non connecté. Vérifiez l'URL dans les paramètres.");
        setIsGenerating(false);
        return;
      }

      const descriptions = await generateExperienceDescription({
        position,
        company,
      });
      let normalizedDescriptions: string[] = [];

      if (typeof descriptions === "string") {
        try {
          const parsed = JSON.parse(descriptions);
          if (Array.isArray(parsed)) {
            normalizedDescriptions = parsed;
          } else {
            normalizedDescriptions = [descriptions];
          }
        } catch {
          // Si JSON.parse échoue, on nettoie manuellement
          normalizedDescriptions = descriptions
            .replace(/^\s*\[/, "")
            .replace(/^\s*{/, "")
            .replace(/\}\s*$/, "")
            .replace(/\]\s*$/, "")
            .split('",')
            .map((item) => item.replace(/^"/, "").replace(/"$/, "").trim());
        }
      } else if (Array.isArray(descriptions)) {
        normalizedDescriptions = descriptions;
      }

      onGenerated(normalizedDescriptions);
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
      <div className="flex gap-2">
        <Button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          variant="secondary"
          size="sm"
          className="flex-1"
        >
          {isGenerating ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4 mr-2" />
          )}
          {isGenerating ? "Génération..." : "Générer avec IA"}
        </Button>

        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={() => setShowSettings(!showSettings)}
          title="Paramètres LM Studio"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {showSettings && (
        <div className="bg-gray-50 border rounded-lg p-3 space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Server className="w-4 h-4" />
            <span>Configuration LM Studio</span>
          </div>
          <Input
            value={lmStudioUrl}
            onChange={(e) => setLmStudioUrl(e.target.value)}
            placeholder="http://localhost:1234/v1"
            className="text-sm"
          />
          <p className="text-xs text-muted-foreground">
            URL de l&apos;API LM Studio (ex: http://localhost:1234/v1)
          </p>
          <Button size="sm" onClick={handleSaveUrl} className="w-full">
            Sauvegarder
          </Button>
        </div>
      )}

      {isConnected === false && (
        <p className="text-xs text-orange-600">LM Studio non détecté</p>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
