import { NextRequest, NextResponse } from "next/server";

const LM_STUDIO_BASE_URL = "http://localhost:1234/v1";

export async function GET() {
  try {
    const response = await fetch(`${LM_STUDIO_BASE_URL}/models`, {
      method: "GET",
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
