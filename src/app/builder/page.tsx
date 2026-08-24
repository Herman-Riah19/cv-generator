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
import { SoftSkillsEditor } from "@/components/cv/SoftSkillEditor";
import { useShallow } from "zustand/react/shallow";
import { useCVDataStore } from "@/context/cvDataContext";

const defaultValues: CVDataForm = {
  personalInfo: {
    name: "",
    email: "",
    poste: "",
    portfolio: "",
    adresse: "",
    phone: "",
    linkedIn: "",
    whatsApp: "",
    description: "",
  },
  skills: [],
  languages: [],
  diplomas: [],
  experiences: [],
  softSkills: [],
  theme: "default",
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
  const { cvData, setCvData } = useCVDataStore(
    useShallow((state) => ({
      cvData: state.cvData,
      setCvData: state.setCvData,
    })),
  );
  const [isHydrated, setIsHydrated] = useState(false);

  const form = useForm<CVDataForm>({
    resolver: zodResolver(cvDataSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (cvData && !isHydrated) {
      form.reset(cvData);
      setIsHydrated(true);
    }
  }, [cvData, form, isHydrated]);

  // 2. Sauvegarder dans Zustand uniquement après l'hydratation initiale
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (isHydrated) {
        setCvData(value as CVData);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, setCvData, isHydrated]);

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

  const softSkillsArray = useFieldArray({
    control: form.control,
    name: "softSkills",
  });

  const onSubmit = (data: CVDataForm) => {};

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-2 sm:px-4 py-2">
        <Form {...form}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
            {/* Editor Section */}
            <div className="space-y-6 lg:sticky lg:top-8 lg:h-[95vh] lg:overflow-auto">
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

              <SoftSkillsEditor form={form} fieldsArray={softSkillsArray} />
              <DiplomasEditor form={form} fieldsArray={diplomasArray} />

              <ExperiencesEditor form={form} fieldsArray={experiencesArray} />
            </div>

            {/* Preview Section */}
            <div className="lg:col-span-2 space-y-8">
              {cvData && (
                <Toolbar
                  data={cvData}
                  onImport={(importedData) => form.reset(importedData)}
                />
              )}

              <div className="lg:sticky lg:top-8 space-y-4">
                <PDFGenerator
                  data={form.getValues() as CVData}
                  onSubmit={form.handleSubmit(onSubmit)}
                  language={language}
                />

                <div>
                  <CVPreview
                    data={form.getValues()}
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