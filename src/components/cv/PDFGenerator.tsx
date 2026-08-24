"use client";

import { CVData } from "@/types/cv";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import { CVPDFDocument } from "./CVPDFDocument";
import { Language } from "@/data/translations";

interface PDFGeneratorProps {
  data: CVData;
  onSubmit: () => void;
  language?: Language;
}

export function PDFGenerator({
  data,
  onSubmit,
  language = "fr",
}: PDFGeneratorProps) {
  const generatePDF = async () => {
    try {
      console.log(data)
      const blob = await pdf(
        <CVPDFDocument
          data={data}
          language={language}
        />
      ).toBlob();

      const fileName = data.personalInfo.name
        ? `${language === "en" ? "EN_":""}CV_${data.personalInfo.name.replace(/\s+/g, "_")}_${data.personalInfo.poste
            .replace(/\s+/g, "_")
            .replace("_-_5_Ans_expériences", "")
            .replace("_-_5_years_experiences", "")}.pdf`
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
