"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cvDataSchema, CVDataForm } from "@/lib/validation";
import { PersonalInfoEditor } from "@/components/cv/PersonalInfoEditor";
import { SkillsEditor } from "@/components/cv/SkillsEditor";
import { LanguagesEditor } from "@/components/cv/LanguagesEditor";
import { DiplomasEditor } from "@/components/cv/DiplomasEditor";
import { ExperiencesEditor } from "@/components/cv/ExperiencesEditor";
import { CVPreview } from "@/components/cv/CVPreview";
import { PDFGenerator } from "@/components/cv/PDFGenerator";
import { RatingIconType } from "@/components/ui/rating-system";
import { CVData } from "@/types/cv";
import { Form } from "@/components/ui/form";
import { Toolbar } from "@/components/cv/Toolbar";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";

const defaultValues: CVDataForm = {
  personalInfo: {
    name: "",
    email: "",
    poste: "",
    portfolio: "",
    adresse: "",
    phone: "",
    description: "",
  },
  skills: [],
  languages: [],
  diplomas: [],
  experiences: [],
};

export default function BuilderPage() {
  return (
    <LanguageProvider>
      <BuilderPageContent />
    </LanguageProvider>
  );
}

function BuilderPageContent() {
  const { t, language } = useLanguage();
  const [skillsIconType, setSkillsIconType] = useState<RatingIconType>("star");
  const [languagesIconType, setLanguagesIconType] = useState<RatingIconType>("heart");
  const [cvData, setCvData] = useState<CVData | null>(null);

  const form = useForm<CVDataForm>({
    resolver: zodResolver(cvDataSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      setCvData(value as CVData);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const skillsArray = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const languagesArray = useFieldArray({
    control: form.control,
    name: "languages",
  });

  const diplomasArray = useFieldArray({
    control: form.control,
    name: "diplomas",
  });

  const experiencesArray = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  const onSubmit = (data: CVDataForm) => {
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">{t("cvGenerator")}</h1>
        
        <Form {...form}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Editor Section */}
            <div className="space-y-6">
              <PersonalInfoEditor form={form} />
              
              <SkillsEditor 
                form={form} 
                fieldsArray={skillsArray}
                iconType={skillsIconType}
                onIconTypeChange={setSkillsIconType}
              />

              <LanguagesEditor 
                form={form} 
                fieldsArray={languagesArray}
                iconType={languagesIconType}
                onIconTypeChange={setLanguagesIconType}
              />
              
              <DiplomasEditor 
                form={form} 
                fieldsArray={diplomasArray}
              />
              
              <ExperiencesEditor 
                form={form} 
                fieldsArray={experiencesArray}
              />
            </div>

            {/* Preview Section */}
            <div className="lg:col-span-2 space-y-8">
              {cvData && (
                <Toolbar 
                  data={cvData} 
                  onImport={(importedData) => form.reset(importedData)} 
                />
              )}
              
              <div className="sticky top-8 space-y-4">
                <PDFGenerator 
                  data={form.getValues() as CVData}
                  skillsIconType={skillsIconType}
                  languagesIconType={languagesIconType}
                  onSubmit={form.handleSubmit(onSubmit)}
                  language={language}
                />
                
                <div>
                  <CVPreview 
                    data={form.getValues()} 
                    skillsIconType={skillsIconType}
                    languagesIconType={languagesIconType}
                  />
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
