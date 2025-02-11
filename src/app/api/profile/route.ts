// app/api/profile/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { linkedInUrl } = await request.json();

    if (!process.env.SCRAPIN_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Include API key in the URL as a query parameter
    const apiUrl = `https://api.scrapin.io/enrichment/profile?linkedInUrl=${encodeURIComponent(
      linkedInUrl
    )}&apikey=${process.env.SCRAPIN_API_KEY}`;

    console.log("Making request to:", apiUrl); // Debug log

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Log the full response for debugging
    console.log("Response status:", response.status);
    console.log("Response headers:", Object.fromEntries(response.headers));

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API Response Error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      return NextResponse.json(
        { error: errorData.msg || "Failed to fetch LinkedIn data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Profile enrichment error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
