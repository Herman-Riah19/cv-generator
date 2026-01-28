export interface CVData {
  personalInfo: PersonalInfo; // Updated to use PersonalInfo interface
  skills: Skill[]; // No change needed
  languages: Language[]; // No change needed
  diplomas: Diploma[]; // No change needed
  experiences: Experience[]; // No change needed
}

export interface Skill {
  id: string;
  name: string; // Required
  level: number; // 1 to 5
}

export interface Language {
  id: string;
  name: string; // Required
  level: number; // 1 to 5
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
  // New interface for personal info
  name: string; // Required
  email: string; // Valid email
  poste: string; // Required
  portfolio: string; // Required
  adresse: string; // Required
  phone: string; // Required
  description?: string; // Optional
}
