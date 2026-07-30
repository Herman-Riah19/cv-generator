import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { baseUrl, apiKey, providerId } = body;

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
    if (providerId === "anthropic") {
      apiUrl = `${baseUrl.replace(/\/+$/, "")}/models`;
    } else {
      apiUrl = `${baseUrl.replace(/\/+$/, "")}/models`;
    }

    const response = await fetch(apiUrl, { method: "GET", headers });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Connection failed: ${response.status}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to connect to AI provider" },
      { status: 500 },
    );
  }
}
