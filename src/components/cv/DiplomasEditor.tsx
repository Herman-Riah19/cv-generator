"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextField } from "@/components/ui/text-field";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { CVDataForm } from "@/lib/validation";
import { useLanguage } from "@/context/LanguageContext";

interface DiplomasEditorProps {
  form: UseFormReturn<CVDataForm>;
  fieldsArray: UseFieldArrayReturn<CVDataForm, "diplomas">;
}

export function DiplomasEditor({ form, fieldsArray }: DiplomasEditorProps) {
  const { t } = useLanguage();
  const { fields, append, remove } = fieldsArray;

  const addDiploma = () => {
    append({
      id: Date.now().toString(),
      name: "",
      institution: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("diplomas")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">{t("diplomaNumber")} {index + 1}</h3>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <TextField
                form={form}
                name={`diplomas.${index}.name`}
                placeholder={t("diplomaNamePlaceholder")}
                label={t("diplomaName")}
              />

              <TextField
                form={form}
                name={`diplomas.${index}.institution`}
                placeholder={t("institutionPlaceholder")}
                label={t("institution")}
              />
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  form={form}
                  name={`diplomas.${index}.startDate`}
                  type="month"
                  label={t("startDate")}
                />
                <TextField
                  form={form}
                  name={`diplomas.${index}.endDate`}
                  type="month"
                  label={t("endDate")}
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          type="button"
          onClick={addDiploma}
          variant="outline"
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t("addDiploma")}
        </Button>
      </CardContent>
    </Card>
  );
}
