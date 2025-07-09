import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const range = searchParams.get("range") || "last_year"
  const apiKey = request.headers.get("authorization")?.replace("Bearer ", "")

  if (!apiKey) {
    return NextResponse.json({ error: "API key required" }, { status: 401 })
  }

  try {
    const response = await fetch(`https://wakatime.com/api/v1/users/current/stats/${range}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`WakaTime API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("WakaTime API error:", error)
    return NextResponse.json({ error: "Failed to fetch WakaTime data" }, { status: 500 })
  }
}
