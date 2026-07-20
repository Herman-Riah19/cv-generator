"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextField } from "@/components/ui/text-field";
import { RatingSystem, RatingIconType } from "@/components/ui/rating-system";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { CVDataForm } from "@/lib/validation";
import { useLanguage } from "@/context/LanguageContext";
import { generateId } from "@/lib/json-resume";

interface SkillsEditorProps {
  form: UseFormReturn<CVDataForm>;
  fieldsArray: UseFieldArrayReturn<CVDataForm, "skills">;
  iconType: RatingIconType;
  onIconTypeChange: (type: RatingIconType) => void;
}

export function SkillsEditor({ 
  form, 
  fieldsArray,
  iconType,
  onIconTypeChange
}: SkillsEditorProps) {
  const { t } = useLanguage();
  const { fields, append, remove } = fieldsArray;

  const addSkill = () => {
    append({
      id: generateId(),
      name: "",
      level: 3,
      iconType,
    });
  };

  const handleIconTypeChange = (type: RatingIconType) => {
    onIconTypeChange(type);
    fields.forEach((_, index) => {
      form.setValue(`skills.${index}.iconType`, type);
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("skills")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium">{t("iconType")}</span>
          <select
            value={iconType}
            onChange={(e) => handleIconTypeChange(e.target.value as RatingIconType)}
            className="px-2 py-1 border rounded text-sm"
          >
            <option value="star">{t("iconType") === "Type d'icône:" ? "Étoile" : "Star"}</option>
            <option value="heart">{t("iconType") === "Type d'icône:" ? "Cœur" : "Heart"}</option>
            <option value="circle">{t("iconType") === "Type d'icône:" ? "Cercle" : "Circle"}</option>
            <option value="square">{t("iconType") === "Type d'icône:" ? "Carré" : "Square"}</option>
            <option value="triangle">{t("iconType") === "Type d'icône:" ? "Triangle" : "Triangle"}</option>
            <option value="check">Check</option>
          </select>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">{t("skillNumber")} {index + 1}</h3>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <TextField
              form={form}
              name={`skills.${index}.name`}
              placeholder={t("skillNamePlaceholder")}
              label={t("skillName")}
            />
            
            <div>
              <label className="text-sm font-medium mb-2 block">
                {t("level")}:
              </label>
              <RatingSystem
                level={form.watch(`skills.${index}.level`)}
                onChange={(level) => 
                  form.setValue(`skills.${index}.level`, level)
                }
                iconType={iconType}
              />
            </div>
          </div>
        ))}
        
        <Button type="button" onClick={addSkill} variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          {t("addSkill")}
        </Button>
      </CardContent>
    </Card>
  );
}