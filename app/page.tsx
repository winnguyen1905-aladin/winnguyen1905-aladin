import IntegratedStatsDashboard from "@/components/integrated-stats-dashboard"

export default function Home() {
  // In a real app, you would get these from environment variables or user settings
  const wakaTimeApiKey = process.env.NEXT_PUBLIC_WAKATIME_API_KEY
  const githubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN

  return <IntegratedStatsDashboard wakaTimeApiKey={wakaTimeApiKey} githubToken={githubToken} username="winnguyen1905" />
}
