"use client";
import { useLanguage } from '@/context/LanguageContext';
import { CVDataForm } from '@/lib/validation';
import React, { useState, useRef } from 'react'
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { generateId } from '@/lib/json-resume';

interface SoftSkillsEditorProps {
  form: UseFormReturn<CVDataForm>;
  fieldsArray: UseFieldArrayReturn<CVDataForm, "softSkills">;
}

export function SoftSkillsEditor({
  form,
  fieldsArray,
}: SoftSkillsEditorProps) {
    const { t } = useLanguage();
    const { fields, append, remove } = fieldsArray;
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const addSkill = () => {
      const trimmed = inputValue.trim();
      if (!trimmed) return;
      append({ id: generateId(), name: trimmed });
      setInputValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addSkill();
      }
      if (e.key === "Backspace" && !inputValue && fields.length > 0) {
        remove(fields.length - 1);
      }
    };

    return (
      <Card>
          <CardHeader>
              <CardTitle>{t("softSkills")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="flex flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] min-h-9 cursor-text"
              onClick={() => inputRef.current?.focus()}
            >
              {fields.map((field, index) => (
                <Badge key={field.id} variant="default" className="gap-1 whitespace-nowrap">
                  {field.name}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); remove(index); }}
                    className="ml-0.5 rounded-full outline-none h-4"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={fields.length === 0 ? t("softSkillPlaceholder") : ""}
                className="flex-1 min-w-30 border-none bg-transparent outline-none text-sm py-0.5 placeholder:text-muted-foreground"
              />
            </div>
          </CardContent>
      </Card>
    )
}
