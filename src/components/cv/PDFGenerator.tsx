"use client";

import { CVData } from "@/types/cv";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";

interface PDFGeneratorProps {
  data: CVData;
  previewRef: React.RefObject<HTMLDivElement>;
  onSubmit: () => void;
}

export function PDFGenerator({ data, previewRef, onSubmit }: PDFGeneratorProps) {
  const generatePDF = async () => {
    if (!previewRef.current) {
      alert("Veuillez d'abord remplir votre CV");
      return;
    }

    try {
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const topMargin = 10;
      const bottomMargin = 15;
      const usableHeight = pageHeight - topMargin - bottomMargin;

      // 1️⃣ Capture image complète
      const dataUrl = await toPng(previewRef.current, {
        cacheBust: true, 
        pixelRatio: 3, 
        quality: 1
      });

      const img = new Image();
      img.src = dataUrl;
      await new Promise((res) => (img.onload = res));

      // 2️⃣ Conversion mm → px
      const pxPerMm = img.width / pageWidth;
      const pageContentHeightPx = usableHeight * pxPerMm;

      let positionPx = 0;
      let pageIndex = 0;

      // 3️⃣ Découpage réel avec canvas
      while (positionPx < img.height) {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = Math.min(pageContentHeightPx, img.height - positionPx);

        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(
          img,
          0,
          positionPx,
          img.width,
          canvas.height,
          0,
          0,
          img.width,
          canvas.height
        );

        const pageImg = canvas.toDataURL("image/png");

        if (pageIndex > 0) pdf.addPage();

        pdf.addImage(
          pageImg,
          "PNG",
          0,
          topMargin,
          pageWidth,
          (canvas.height / pxPerMm)
        );

        positionPx += pageContentHeightPx;
        pageIndex++;
      }

      const fileName = data.personalInfo.name
        ? `CV_${data.personalInfo.name.replace(/\s+/g, "_")}.pdf`
        : "CV.pdf";

      pdf.save(fileName);
      onSubmit();
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      alert("Une erreur est survenue lors de la génération du PDF");
    }
  };

  return (
    <Button onClick={generatePDF} className="w-full" size="lg">
      <Download className="h-4 w-4 mr-2" />
      Générer le PDF
    </Button>
  );
}
