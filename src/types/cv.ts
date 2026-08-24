export interface CVData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  languages: Language[];
  softSkills: SoftSkill[];
  diplomas: Diploma[];
  experiences: Experience[];
  theme?: string;
}

export interface Skill {
  id: string;
  name: string; // Required
  level: number; // 1 to 5
  iconType?: string;
}

export interface Language {
  id: string;
  name: string; // Required
  level: number; // 1 to 5
  iconType?: string;
}

export interface SoftSkill {
  id: string;
  name: string;
}

export interface Diploma {
  id: string;
  name: string; // Required
  institution: string; // Required
  startDate: string; // Required
  endDate?: string; // Optional
}

export interface Experience {
  id: string;
  position: string; // Required
  company: string; // Required
  startDate: string; // Required
  endDate?: string; // Optional
  description: string[]; // Array of strings
}

export interface PersonalInfo {
  name: string; // Required
  email: string; // Valid email
  poste: string; // Required
  portfolio: string; // Required
  adresse: string; // Required
  phone: string; // Required
  linkedIn: string; // Required
  whatsApp: string; // Required
  description?: string; // Optional
}
