const API_BASE_URL = "/api/lm-studio";

export interface GenerateDescriptionParams {
  position: string;
  company: string;
  jobType?: string;
  language?: string;
}

export async function generateExperienceDescription(
  params: GenerateDescriptionParams,
  signal?: AbortSignal,
): Promise<string[]> {
  const {
    position,
    company,
    jobType = "professionnel",
    language = "fr",
  } = params;

  const systemPrompt = `Tu es un expert en rédaction de CV. Génère des descriptions d'expériences professionnelles percutantes et percutantes pour un CV. 
  - Réponds ONLY avec un tableau JSON de chaînes de caractères (sans markdown, sans code blocks)
  - Chaque élément doit être une tâche/réalisation concise et impactante
  - Utilise des verbes d'action et des quantifiable quand possible
  - Format attendu: ["Tâche 1", "Tâche 2", "Tâche 3"]
  - Maximum 5 éléments
  - En ${language === "fr" ? "français" : "english"}
  - Sois concis (moins de 100 caractères par élément)`;

  const userPrompt = `Génère les descriptions de tâches pour le poste de ${position} chez ${company}. 
  Type d'expérience: ${jobType}`;

  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "oppus-v1.2-llama-3-8b",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
      signal,
    });

    if (!response.ok) {
      throw new Error(`LM Studio API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No response content from AI");
    }

    const cleaned = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      if (cleaned && typeof cleaned === "object" && !Array.isArray(cleaned)) {
        return Object.values(cleaned).filter(
          (item) => typeof item === "string",
        );
      }
      return cleaned;
    } catch {
      const lines = cleaned
        .split("\n")
        .filter((line: string) => line.trim().length > 0)
        .map((line: string) =>
          line.replace(/^[-•*]\s*/, "").replace(/^\d+\.\s*/, ""),
        );
      return lines;
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw error;
      }
      throw new Error(`Erreur IA: ${error.message}`);
    }
    throw new Error("Erreur inconnue lors de la génération IA");
  }
}

export async function checkLMStudioConnection(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/models`, {
      method: "GET",
    });
    return response.ok;
  } catch {
    return false;
  }
}
