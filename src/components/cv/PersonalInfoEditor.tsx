"use client";

import { TextField } from "@/components/ui/text-field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { CVDataForm } from "@/lib/validation";

interface PersonalInfoEditorProps {
  form: UseFormReturn<CVDataForm>;
}

export function PersonalInfoEditor({ form }: PersonalInfoEditorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations Personnelles</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <TextField
          form={form}
          name="personalInfo.name"
          placeholder="Votre nom complet"
          label="Nom"
        />
        
        <TextField
          form={form}
          name="personalInfo.email"
          type="email"
          placeholder="votre.email@example.com"
          label="Email"
        />

        <TextField
          form={form}
          name="personalInfo.poste"
          placeholder="Votre poste actuel"
          label="Poste"
        />

        <TextField
          form={form}
          name="personalInfo.portfolio"
          placeholder="Votre portfolio"
          label="Portfolio"
        />

        <TextField
          form={form}
          name="personalInfo.adresse"
          placeholder="Votre adresse"
          label="Adresse"
        />

        <TextField
          form={form}
          name="personalInfo.phone"
          placeholder="Votre numéro de téléphone"
          label="Téléphone"
        />
        
        <TextField
          form={form}
          name="personalInfo.description"
          placeholder="Une brève description de vous-même..."
          label="Description"
          textarea
          rows={4}
        />
      </CardContent>
    </Card>
  );
}