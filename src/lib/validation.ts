import { z } from "zod";

export const skillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Le nom de la compétence est requis"),
  level: z.number().min(1).max(5),
  iconType: z.string().optional()
});

export const languageSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Le nom de la langue est requis"),
  level: z.number().min(1).max(5),
  iconType: z.string().optional()
});

export const diplomaSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Le nom du diplôme est requis"),
  institution: z.string().min(1, "L'établissement est requis"),
  startDate: z.string().min(1, "La date de début est requise"),
  endDate: z.string().optional(),
});

export const experienceSchema = z.object({
  id: z.string(),
  position: z.string().min(1, "Le poste est requis"),
  company: z.string().min(1, "La société est requise"),
  startDate: z.string().min(1, "La date de début est requise"),
  endDate: z.string().optional(),
  description: z.array(z.string()),
});

export const personalInfoSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  poste: z.string().min(1, "Le poste est requis"),
  portfolio: z.string().min(1, "Le portfolio est requis"),
  adresse: z.string().min(1, "L'adresse est requise"),
  phone: z.string().min(1, "Le numéro de téléphone est requis"),
  description: z.string().optional(),
});

export const softSkillSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Votre point fort est requis"),
});

export const cvDataSchema = z.object({
  personalInfo: personalInfoSchema,
  skills: z.array(skillSchema),
  languages: z.array(languageSchema),
  diplomas: z.array(diplomaSchema),
  experiences: z.array(experienceSchema),
  softSkills: z.array(softSkillSchema),
  theme: z.string().optional(),
});

export type CVDataForm = z.infer<typeof cvDataSchema>;