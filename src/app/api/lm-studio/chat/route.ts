import { NextRequest, NextResponse } from "next/server";

const LM_STUDIO_BASE_URL = "http://localhost:1234/v1";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${LM_STUDIO_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to connect to LM Studio" },
      { status: 500 }
    );
  }
}
