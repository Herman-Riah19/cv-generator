import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const lmStudioUrl = body.lmStudioUrl || "http://localhost:1234/v1";
    
    const response = await fetch(`${lmStudioUrl}/models`, {
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
