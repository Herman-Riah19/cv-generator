import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { baseUrl, apiKey, model, messages, temperature, max_tokens, providerId } = body;

    if (!baseUrl) {
      return NextResponse.json({ error: "AI base URL is required" }, { status: 400 });
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (apiKey) {
      if (providerId === "anthropic") {
        headers["x-api-key"] = apiKey;
        headers["anthropic-version"] = "2023-06-01";
      } else {
        headers["Authorization"] = `Bearer ${apiKey}`;
      }
    }

    let apiUrl: string;
    let requestBody: Record<string, unknown>;

    if (providerId === "anthropic") {
      apiUrl = `${baseUrl.replace(/\/+$/, "")}/messages`;
      requestBody = {
        model: model || "claude-3-haiku-20240307",
        max_tokens: max_tokens || 500,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role === "system" ? "user" : m.role,
          content: m.content,
        })),
        temperature: temperature || 0.7,
      };
    } else {
      apiUrl = `${baseUrl.replace(/\/+$/, "")}/chat/completions`;
      requestBody = {
        model: model || "gpt-4o-mini",
        messages,
        temperature: temperature || 0.7,
        max_tokens: max_tokens || 500,
      };
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || data.error || `API error: ${response.status}` },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to connect to AI provider" },
      { status: 500 },
    );
  }
}
