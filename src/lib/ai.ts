export interface AIProviderConfig {
  id: string;
  name: string;
  baseUrl: string;
  apiKey: string;
  model: string;
}

export const AI_PROVIDERS: AIProviderConfig[] = [
  {
    id: "lm-studio",
    name: "LM Studio",
    baseUrl: "http://localhost:1234/v1",
    apiKey: "",
    model: "oppus-v1.2-llama-3-8b",
  },
  {
    id: "openai",
    name: "OpenAI",
    baseUrl: "https://api.openai.com/v1",
    apiKey: "",
    model: "gpt-4o-mini",
  },
  {
    id: "ollama",
    name: "Ollama",
    baseUrl: "http://localhost:11434/v1",
    apiKey: "",
    model: "llama3",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    baseUrl: "https://api.anthropic.com/v1",
    apiKey: "",
    model: "claude-3-haiku-20240307",
  },
  {
    id: "custom",
    name: "Custom (OpenAI-compatible)",
    baseUrl: "",
    apiKey: "",
    model: "",
  },
];

const STORAGE_KEY_PROVIDER = "ai-provider";
const STORAGE_KEY_BASE_URL = "ai-base-url";
const STORAGE_KEY_API_KEY = "ai-api-key";
const STORAGE_KEY_MODEL = "ai-model";

export function getProviderId(): string {
  if (typeof window === "undefined") return "lm-studio";
  return localStorage.getItem(STORAGE_KEY_PROVIDER) || "lm-studio";
}

export function setProviderId(id: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_PROVIDER, id);
  }
}

export function getAiBaseUrl(): string {
  if (typeof window === "undefined") return "http://localhost:1234/v1";

  const custom = localStorage.getItem(STORAGE_KEY_BASE_URL);
  if (custom) return custom;

  const providerId = getProviderId();
  const provider = AI_PROVIDERS.find((p) => p.id === providerId);
  return provider?.baseUrl || "http://localhost:1234/v1";
}

export function setAiBaseUrl(url: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_BASE_URL, url);
  }
}

export function getAiApiKey(): string {
  if (typeof window === "undefined") return "";

  const custom = localStorage.getItem(STORAGE_KEY_API_KEY);
  if (custom) return custom;

  const providerId = getProviderId();
  const provider = AI_PROVIDERS.find((p) => p.id === providerId);
  return provider?.apiKey || "";
}

export function setAiApiKey(key: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_API_KEY, key);
  }
}

export function getAiModel(): string {
  if (typeof window === "undefined") return "gpt-4o-mini";

  const custom = localStorage.getItem(STORAGE_KEY_MODEL);
  if (custom) return custom;

  const providerId = getProviderId();
  const provider = AI_PROVIDERS.find((p) => p.id === providerId);
  return provider?.model || "gpt-4o-mini";
}

export function setAiModel(model: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY_MODEL, model);
  }
}

export function getCurrentProvider(): AIProviderConfig {
  const id = getProviderId();
  return {
    id,
    name: AI_PROVIDERS.find((p) => p.id === id)?.name || "Custom",
    baseUrl: getAiBaseUrl(),
    apiKey: getAiApiKey(),
    model: getAiModel(),
  };
}

export interface GenerateDescriptionParams {
  position: string;
  company: string;
  language?: string;
}

export async function generateExperienceDescription(
  params: GenerateDescriptionParams,
  signal?: AbortSignal,
): Promise<string[]> {
  const { position, company, language = "fr" } = params;
  const provider = getCurrentProvider();

  const systemPrompt = `You are a CV writing expert. Generate impactful professional experience descriptions for a resume.
  - Respond ONLY with a JSON array of strings (no markdown, no code blocks)
  - Each item must be a concise and impactful task/accomplishment
  - Use action verbs and quantify results when possible
  - Expected format: ["Task 1", "Task 2", "Task 3"]
  - Maximum 5 items
  - Write in ${language === "fr" ? "French" : "English"}
  - Be concise (under 100 characters per item)`;

  const userPrompt = `Generate task descriptions for the position of ${position} at ${company}.`;

  try {
    const response = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        baseUrl: provider.baseUrl,
        apiKey: provider.apiKey,
        model: provider.model,
        providerId: provider.id,
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
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || `AI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No response content from AI");
    }

    const cleaned = content
      .replace(/```json\s*/gi, "")
      .replace(/```/g, "")
      .trim();

    try {
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === "string");
      }
      if (typeof parsed === "object" && parsed !== null) {
        return Object.values(parsed).filter(
          (item): item is string => typeof item === "string",
        );
      }
    } catch {
      const lines = cleaned
        .split("\n")
        .map((l: string) => l.replace(/^[-•*]\s*/, "").replace(/^\d+\.\s*/, ""))
        .filter((l: string) => l.trim().length > 0);
      return lines;
    }

    return [];
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") throw error;
      throw new Error(`AI Error: ${error.message}`);
    }
    throw new Error("Unknown error during AI generation");
  }
}

export async function checkAiConnection(): Promise<boolean> {
  const provider = getCurrentProvider();
  try {
    const response = await fetch("/api/ai/models", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        baseUrl: provider.baseUrl,
        apiKey: provider.apiKey,
        providerId: provider.id,
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}
