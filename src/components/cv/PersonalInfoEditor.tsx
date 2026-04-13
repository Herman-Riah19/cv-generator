"use client";

import { TextField } from "@/components/ui/text-field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { CVDataForm } from "@/lib/validation";
import { useLanguage } from "@/context/LanguageContext";

interface PersonalInfoEditorProps {
  form: UseFormReturn<CVDataForm>;
}

export function PersonalInfoEditor({ form }: PersonalInfoEditorProps) {
  const { t } = useLanguage();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("personalInfo")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <TextField
          form={form}
          name="personalInfo.name"
          placeholder={t("namePlaceholder")}
          label={t("name")}
        />
        
        <TextField
          form={form}
          name="personalInfo.email"
          type="email"
          placeholder={t("emailPlaceholder")}
          label={t("email")}
        />

        <TextField
          form={form}
          name="personalInfo.poste"
          placeholder={t("positionPlaceholder")}
          label={t("position")}
        />

        <TextField
          form={form}
          name="personalInfo.portfolio"
          placeholder={t("portfolioPlaceholder")}
          label={t("portfolio")}
        />

        <TextField
          form={form}
          name="personalInfo.adresse"
          placeholder={t("addressPlaceholder")}
          label={t("address")}
        />

        <TextField
          form={form}
          name="personalInfo.phone"
          placeholder={t("phonePlaceholder")}
          label={t("phone")}
        />
        
        <TextField
          form={form}
          name="personalInfo.description"
          placeholder={t("descriptionPlaceholder")}
          label={t("description")}
          textarea
          rows={4}
        />
      </CardContent>
    </Card>
  );
}