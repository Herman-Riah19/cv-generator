"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextField } from "@/components/ui/text-field";
import { RatingSystem, RatingIconType } from "@/components/ui/rating-system";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { CVDataForm } from "@/lib/validation";

interface LanguagesEditorProps {
  form: UseFormReturn<CVDataForm>;
  fieldsArray: UseFieldArrayReturn<CVDataForm, "languages">;
  iconType: RatingIconType;
  onIconTypeChange: (type: RatingIconType) => void;
}

export function LanguagesEditor({ 
  form, 
  fieldsArray,
  iconType,
  onIconTypeChange
}: LanguagesEditorProps) {
  const { fields, append, remove } = fieldsArray;

  const addLanguage = () => {
    append({
      id: Date.now().toString(),
      name: "",
      level: 3,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Langues</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium">Type d'icône:</span>
          <select
            value={iconType}
            onChange={(e) => onIconTypeChange(e.target.value as RatingIconType)}
            className="px-2 py-1 border rounded text-sm"
          >
            <option value="star">Étoile</option>
            <option value="heart">Cœur</option>
            <option value="circle">Cercle</option>
            <option value="square">Carré</option>
            <option value="triangle">Triangle</option>
            <option value="check">Check</option>
          </select>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Langue {index + 1}</h3>
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
              name={`languages.${index}.name`}
              placeholder="Ex: Anglais"
              label="Nom de la langue"
            />
            
            <div>
              <label className="text-sm font-medium mb-2 block">
                Niveau:
              </label>
              <RatingSystem
                level={form.watch(`languages.${index}.level`)}
                onChange={(level) => 
                  form.setValue(`languages.${index}.level`, level)
                }
                iconType={iconType}
              />
            </div>
          </div>
        ))}
        
        <Button type="button" onClick={addLanguage} variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une langue
        </Button>
      </CardContent>
    </Card>
  );
}