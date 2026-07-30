"use client";

import { useState } from "react";
import { CVData } from "@/types/cv";
import { Button } from "@/components/ui/button";
import {
  convertToJSONResume,
  downloadJSON,
  validateJSONResume,
  convertFromJSONResume,
  JSONResumeSchema,
} from "@/lib/json-resume";
import { FileJson, Loader2, Check, Upload } from "lucide-react";

interface JsonImportExportProps {
  data: CVData;
  onImport?: (data: CVData) => void;
}

export function JsonImportExport({ data, onImport }: JsonImportExportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<"idle" | "success" | "error">("idle");
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

  const handleImportJSON = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text) as JSONResumeSchema;
      const cvData = convertFromJSONResume(jsonData);
      onImport?.(cvData);
    } catch (error) {
      console.error("Import error:", error);
      alert("Erreur lors de l'importation du fichier JSON");
    }

    event.target.value = "";
  };

  return (
    <div className="space-y-3">
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

      <label className="cursor-pointer">
        <input
          type="file"
          accept=".json"
          onChange={handleImportJSON}
          className="hidden"
        />
        <Button variant="outline" className="w-full" asChild>
          <span>
            <Upload className="h-4 w-4 mr-2" />
            Importer JSON
          </span>
        </Button>
      </label>

      {exportStatus === "success" && (
        <p className="text-xs text-green-600 text-center">
          Fichier JSON validé et téléchargé!
        </p>
      )}
    </div>
  );
}
