"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextField } from "@/components/ui/text-field";
import {
  UseFieldArrayReturn,
  UseFormReturn,
} from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { CVDataForm } from "@/lib/validation";
import { AIGenerateButton } from "./Toolbar";
import { useLanguage } from "@/context/LanguageContext";

interface ExperiencesEditorProps {
  form: UseFormReturn<CVDataForm>;
  fieldsArray: UseFieldArrayReturn<CVDataForm, "experiences">;
}

export function ExperiencesEditor({
  form,
  fieldsArray,
}: ExperiencesEditorProps) {
  const { t } = useLanguage();
  const { fields, append } = fieldsArray;

  const addExperience = () => {
    append({
      id: Date.now().toString(),
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      description: [""],
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("experiences")}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {fields.map((field, expIndex) => {
          let descriptions = form.watch(`experiences.${expIndex}.description`) ?? [];

          const addDescriptionItem = () => {
            form.setValue(
              `experiences.${expIndex}.description`,
              [...descriptions, ""],
              { shouldDirty: true },
            );
          };

          const removeDescriptionItem = (index: number) => {
            form.setValue(
              `experiences.${expIndex}.description`,
              descriptions.filter((_, i) => i !== index),
              { shouldDirty: true },
            );
          };

          const position = form.watch(`experiences.${expIndex}.position`) || "";
          const company = form.watch(`experiences.${expIndex}.company`) || "";

          const handleAIGenerated = (generatedDescriptions: string[]) => {
            if (generatedDescriptions.length > 0) {
              descriptions = generatedDescriptions;
              form.setValue(
                `experiences.${expIndex}.description`,
                generatedDescriptions,
                { shouldDirty: true }
              );
            }
          };

          return (
            <div key={field.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">
                  {t("experienceNumber")} {expIndex + 1}
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => fieldsArray.remove(expIndex)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <TextField
                  form={form}
                  name={`experiences.${expIndex}.position`}
                  label={t("position")}
                />
                <TextField
                  form={form}
                  name={`experiences.${expIndex}.company`}
                  label={t("company")}
                />
                <TextField
                  form={form}
                  name={`experiences.${expIndex}.startDate`}
                  type="month"
                  label={t("startDate")}
                />
                <TextField
                  form={form}
                  name={`experiences.${expIndex}.endDate`}
                  type="month"
                  label={t("endDate")}
                />
              </div>

              {/* DESCRIPTIONS */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {t("taskDescription")}
                </label>

                <div className="space-y-2">
                  {descriptions.map((desc, descIndex) => (
                    <div key={descIndex} className="flex gap-2">
                      <TextField
                        form={form}
                        name={`experiences.${expIndex}.description.${descIndex}`}
                        placeholder={t("taskDescriptionPlaceholder")}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeDescriptionItem(descIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => addDescriptionItem()}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {t("addTask")}
                    </Button>

                    <AIGenerateButton
                      position={position}
                      company={company}
                      onGenerated={handleAIGenerated}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <Button
          type="button"
          onClick={addExperience}
          variant="outline"
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t("addExperience")}
        </Button>
      </CardContent>
    </Card>
  );
}
