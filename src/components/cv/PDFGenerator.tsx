"use client";

import { CVData } from "@/types/cv";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import { CVPDFDocument } from "./CVPDFDocument";

interface PDFGeneratorProps {
  data: CVData;
  skillsIconType: "star" | "heart" | "circle" | "square" | "triangle" | "check";
  languagesIconType: "star" | "heart" | "circle" | "square" | "triangle" | "check";
  onSubmit: () => void;
}

export function PDFGenerator({
  data,
  skillsIconType,
  languagesIconType,
  onSubmit,
}: PDFGeneratorProps) {
  const generatePDF = async () => {
    try {
      const blob = await pdf(
        <CVPDFDocument
          data={data}
          skillsIconType={skillsIconType}
          languagesIconType={languagesIconType}
        />
      ).toBlob();

      const fileName = data.personalInfo.name
        ? `CV_${data.personalInfo.name.replace(/\s+/g, "_")}.pdf`
        : "CV.pdf";

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      onSubmit();
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      alert(`Une erreur est survenue lors de la génération du PDF: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  };

  return (
    <Button onClick={generatePDF} className="w-full" size="lg">
      <Download className="h-4 w-4 mr-2" />
      Générer le PDF
    </Button>
  );
}
