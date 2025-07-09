interface WakaTimeStats {
  data: {
    languages: Array<{
      name: string
      total_seconds: number
      percent: number
      digital: string
      text: string
      hours: number
      minutes: number
    }>
    total_seconds: number
    daily_average: number
    human_readable_total: string
    human_readable_daily_average: string
  }
}

interface WakaTimeAllTime {
  data: {
    total_seconds: number
    text: string
    is_up_to_date: boolean
  }
}

export class WakaTimeAPI {
  private apiKey: string
  private baseUrl = "https://wakatime.com/api/v1"

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  private async makeRequest(endpoint: string) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`WakaTime API error: ${response.status}`)
    }

    return response.json()
  }

  async getStats(
    range: "last_7_days" | "last_30_days" | "last_6_months" | "last_year" = "last_year",
  ): Promise<WakaTimeStats> {
    return this.makeRequest(`/users/current/stats/${range}`)
  }

  async getAllTimeStats(): Promise<WakaTimeAllTime> {
    return this.makeRequest("/users/current/all_time_since_today")
  }

  async getSummaries(start: string, end: string) {
    return this.makeRequest(`/users/current/summaries?start=${start}&end=${end}`)
  }
}

// Mock data for development/demo purposes
export const mockWakaTimeData: WakaTimeStats = {
  data: {
    languages: [
      {
        name: "Go",
        total_seconds: 2326500,
        percent: 35.2,
        digital: "646:25",
        text: "646 hrs 25 mins",
        hours: 646,
        minutes: 25,
      },
      {
        name: "TypeScript",
        total_seconds: 887340,
        percent: 13.4,
        digital: "246:29",
        text: "246 hrs 29 mins",
        hours: 246,
        minutes: 29,
      },
      {
        name: "Prisma",
        total_seconds: 278580,
        percent: 4.2,
        digital: "77:23",
        text: "77 hrs 23 mins",
        hours: 77,
        minutes: 23,
      },
      {
        name: "Python",
        total_seconds: 198600,
        percent: 3.0,
        digital: "55:10",
        text: "55 hrs 10 mins",
        hours: 55,
        minutes: 10,
      },
      {
        name: "SQL",
        total_seconds: 151380,
        percent: 2.3,
        digital: "42:03",
        text: "42 hrs 3 mins",
        hours: 42,
        minutes: 3,
      },
      {
        name: "Java",
        total_seconds: 115560,
        percent: 1.7,
        digital: "32:06",
        text: "32 hrs 6 mins",
        hours: 32,
        minutes: 6,
      },
      {
        name: "GDScript3",
        total_seconds: 100020,
        percent: 1.5,
        digital: "27:47",
        text: "27 hrs 47 mins",
        hours: 27,
        minutes: 47,
      },
      {
        name: "YAML",
        total_seconds: 69900,
        percent: 1.1,
        digital: "19:25",
        text: "19 hrs 25 mins",
        hours: 19,
        minutes: 25,
      },
      {
        name: "Protocol Buffer",
        total_seconds: 64380,
        percent: 1.0,
        digital: "17:53",
        text: "17 hrs 53 mins",
        hours: 17,
        minutes: 53,
      },
      {
        name: "Other",
        total_seconds: 51000,
        percent: 0.8,
        digital: "14:10",
        text: "14 hrs 10 mins",
        hours: 14,
        minutes: 10,
      },
    ],
    total_seconds: 6610800,
    daily_average: 18108,
    human_readable_total: "1,836 hrs 20 mins",
    human_readable_daily_average: "5 hrs 1 min",
  },
}

// Language color mapping
export const languageColors: Record<string, string> = {
  Go: "#00ADD8",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3776ab",
  Java: "#ED8B00",
  Prisma: "#2D3748",
  SQL: "#e38c00",
  GDScript3: "#355570",
  YAML: "#cb171e",
  "Protocol Buffer": "#4285f4",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  PHP: "#4F5D95",
  "C++": "#f34b7d",
  Rust: "#dea584",
  Other: "#6c757d",
}
