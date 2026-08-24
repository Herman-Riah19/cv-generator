import { RatingIconType } from "@/components/ui/rating-system";
import { CVData } from "@/types/cv";

export interface JSONResumeWork {
  name: string;
  position: string;
  url?: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights: string[];
}

export interface JSONResumeEducation {
  institution: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate?: string;
  score?: string;
  courses?: string[];
}

export interface JSONResumeSkill {
  name: string;
  level?: number;
  keywords?: string[];
  iconType?: string;
}

export interface JSONResumeLanguage {
  language: string;
  fluency?: string;
  iconType?: string;
}

export interface JSONResumeSchema {
  basics: {
    name: string;
    label?: string;
    email: string;
    phone?: string;
    url?: string;
    summary?: string;
    location?: {
      address?: string;
    };
    linkedIn?: string;
    whatsApp?: string;
  };
  work?: JSONResumeWork[];
  education?: JSONResumeEducation[];
  skills?: JSONResumeSkill[];
  languages?: JSONResumeLanguage[];
  softSkills?: JSONResumeSoftSkill[];
  meta?: {
    theme?: string;
  };
}

export interface JSONResumeSoftSkill {
  name: string;
}

export function convertToJSONResume(data: CVData): JSONResumeSchema {
  const basics = {
    name: data.personalInfo.name,
    label: data.personalInfo.poste,
    email: data.personalInfo.email,
    phone: data.personalInfo.phone,
    linkedIn: data.personalInfo.linkedIn,
    whatsApp: data.personalInfo.whatsApp,
    url: data.personalInfo.portfolio,
    summary: data.personalInfo.description,
    location: {
      address: data.personalInfo.adresse,
    },
  };

  const work: JSONResumeWork[] = data.experiences
    .filter((exp) => exp.position && exp.company)
    .map((exp) => ({
      name: exp.company,
      position: exp.position,
      startDate: exp.startDate,
      endDate: exp.endDate,
      highlights: exp.description.filter((d) => d.trim()),
    }));

  const education: JSONResumeEducation[] = data.diplomas
    .filter((dip) => dip.name && dip.institution)
    .map((dip) => ({
      institution: dip.institution,
      area: dip.name,
      studyType: dip.name,
      startDate: dip.startDate,
      endDate: dip.endDate,
    }));

  const skills: JSONResumeSkill[] = data.skills
    .filter((skill) => skill.name)
    .map((skill) => ({
      name: skill.name,
      level: skill.level,
      iconType: skill.iconType,
    }));

  const languages: JSONResumeLanguage[] = data.languages
    .filter((lang) => lang.name)
    .map((lang) => ({
      language: lang.name,
      fluency: getFluencyFromLevel(lang.level),
      iconType: lang.iconType,
    }));
  
    const softSkills: JSONResumeSoftSkill[] = data.softSkills
    .filter((skill) => skill.name)
    .map((skill) => ({
      name: skill.name,
    }));

  return {
    basics,
    work: work.length > 0 ? work : undefined,
    education: education.length > 0 ? education : undefined,
    skills: skills.length > 0 ? skills : undefined,
    languages: languages.length > 0 ? languages : undefined,
    softSkills: softSkills.length > 0 ? softSkills : undefined,
    meta: {
      theme: data.theme,
    },
  };
}

function getFluencyFromLevel(level: number): string {
  const levels = ["Débutant", "Élémentaire", "Intermédiaire", "Avancé", "Natif"];
  return levels[level - 1] || "Intermédiaire";
}

export function validateJSONResume(data: unknown): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data || typeof data !== "object") {
    return { valid: false, errors: ["Invalid JSON structure"] };
  }

  const resume = data as JSONResumeSchema;

  if (!resume.basics?.name) {
    errors.push("Le nom est requis");
  }
  if (!resume.basics?.email) {
    errors.push("L'email est requis");
  }
  if (!resume.basics?.label) {
    errors.push("Le poste est requis");
  }

  return { valid: errors.length === 0, errors };
}

export function downloadJSON(data: unknown, filename: string = "resume.json") {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function convertFromJSONResume(data: JSONResumeSchema): CVData {
  return {
    theme: data.meta?.theme || "default",
    personalInfo: {
      name: data.basics?.name || "",
      email: data.basics?.email || "",
      poste: data.basics?.label || "",
      portfolio: data.basics?.url || "",
      adresse: data.basics?.location?.address || "",
      phone: data.basics?.phone || "",
      linkedIn: data.basics?.linkedIn ||"", 
      whatsApp: data.basics?.whatsApp || "", // WhatsApp is not part of the JSON Resume schema
      description: data.basics?.summary || "",
    },
    skills: (data.skills || []).map((skill) => ({
      id: generateId(),
      name: skill.name || "",
      level: skill.level || 1,
      iconType: skill.iconType || "star",
    })),
    languages: (data.languages || []).map((lang) => ({
      id: generateId(),
      name: lang.language || "",
      level: getLevelFromFluency(lang.fluency),
      iconType: lang.iconType || "star",
    })),
    diplomas: (data.education || []).map((edu) => ({
      id: generateId(),
      name: edu.area || edu.studyType || "",
      institution: edu.institution || "",
      startDate: edu.startDate || "",
      endDate: edu.endDate,
    })),
    experiences: (data.work || []).map((work) => ({
      id: generateId(),
      position: work.position || "",
      company: work.name || "",
      startDate: work.startDate || "",
      endDate: work.endDate,
      description: work.highlights || [],
    })),
    softSkills: (data.softSkills || []).map((skill) => ({
      id: generateId(),
      name: skill.name || "",
    }))
  };
}

function getLevelFromFluency(fluency?: string): number {
  const levels: Record<string, number> = {
    "Débutant": 1,
    "Élémentaire": 2,
    "Intermédiaire": 3,
    "Avancé": 4,
    "Natif": 5,
  };
  return levels[fluency || ""] || 3;
}
