import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, companyDomain, companyName } =
      await request.json();

    if (!process.env.SCRAPIN_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Build query parameters
    const queryParams = new URLSearchParams({
      apikey: process.env.SCRAPIN_API_KEY,
    });

    if (firstName) queryParams.append("firstName", firstName);
    if (lastName) queryParams.append("lastName", lastName);
    // Add the appropriate company parameter based on what was provided
    if (companyDomain) queryParams.append("companyDomain", companyDomain);
    if (companyName) queryParams.append("companyName", companyName);

    // Construct the API URL
    const apiUrl = `https://api.scrapin.io/enrichment?${queryParams.toString()}`;

    console.log("Making request to:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

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
        { error: errorData.msg || "Failed to fetch profile data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Profile search error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
