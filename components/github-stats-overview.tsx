"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Star, GitCommit, GitPullRequest, AlertCircle, Building } from "lucide-react"

interface GitHubStats {
  totalStars: number
  totalCommits: number
  totalPRs: number
  totalIssues: number
  contributedRepos: number
  totalContributions: number
  currentStreak: number
  longestStreak: number
  rank: string
}

interface GitHubStatsOverviewProps {
  username?: string
  githubToken?: string
}

const mockGitHubStats: GitHubStats = {
  totalStars: 18,
  totalCommits: 1300,
  totalPRs: 28,
  totalIssues: 75,
  contributedRepos: 19,
  totalContributions: 3935,
  currentStreak: 2,
  longestStreak: 22,
  rank: "B",
}

export default function GitHubStatsOverview({ username = "winnguyen1905", githubToken }: GitHubStatsOverviewProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [stats, setStats] = useState<GitHubStats>(mockGitHubStats)
  const [loading, setLoading] = useState(false)

  const fetchGitHubStats = async () => {
    if (!githubToken) return

    setLoading(true)
    try {
      // In a real implementation, you would fetch from GitHub GraphQL API
      // For demo purposes, we'll simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStats(mockGitHubStats)
    } catch (error) {
      console.error("Failed to fetch GitHub stats:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (githubToken) {
      fetchGitHubStats()
    }
  }, [githubToken])

  const getRankColor = (rank: string) => {
    switch (rank) {
      case "S":
        return "from-yellow-400 to-orange-500"
      case "A":
        return "from-green-400 to-blue-500"
      case "B":
        return "from-blue-400 to-purple-500"
      case "C":
        return "from-gray-400 to-gray-600"
      default:
        return "from-gray-400 to-gray-600"
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold flex items-center justify-center gap-2 text-white">📊 MY STATS 🤩</h1>
        <p className="text-gray-400 text-sm mt-1">▼ click here to expand</p>
      </div>

      {/* GitHub Stats Overview */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-2">
          <Button
            variant="ghost"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full justify-between text-blue-400 hover:text-blue-300"
          >
            <CardTitle className="text-lg">Nguyễn Thắng Lợi's GitHub Stats</CardTitle>
            {isExpanded ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </CardHeader>

        {isExpanded && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-green-400 font-medium">Total Stars Earned:</span>
                  </div>
                  <span className="text-white font-bold text-lg">{stats.totalStars}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50">
                  <div className="flex items-center gap-3">
                    <GitCommit className="w-5 h-5 text-blue-400" />
                    <span className="text-green-400 font-medium">Total Commits (2025):</span>
                  </div>
                  <span className="text-white font-bold text-lg">{(stats.totalCommits / 1000).toFixed(1)}k</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50">
                  <div className="flex items-center gap-3">
                    <GitPullRequest className="w-5 h-5 text-purple-400" />
                    <span className="text-green-400 font-medium">Total PRs:</span>
                  </div>
                  <span className="text-white font-bold text-lg">{stats.totalPRs}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-green-400 font-medium">Total Issues:</span>
                  </div>
                  <span className="text-white font-bold text-lg">{stats.totalIssues}</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-700/50">
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-cyan-400" />
                    <span className="text-green-400 font-medium">Contributed to (last year):</span>
                  </div>
                  <span className="text-white font-bold text-lg">{stats.contributedRepos}</span>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                  <div
                    className={`absolute inset-4 bg-gradient-to-br ${getRankColor(stats.rank)} rounded-full flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-3xl font-bold text-white">{stats.rank}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Contributions Summary */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-400">{stats.totalContributions.toLocaleString()}</div>
              <div className="text-blue-300 font-medium">Total Contributions</div>
              <div className="text-sm text-gray-400">20/1/2019 - Present</div>
            </div>

            <div className="space-y-2">
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-purple-500"></div>
                <div className="absolute inset-2 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-400">{stats.currentStreak}</span>
                </div>
              </div>
              <div className="text-purple-300 font-medium">Current Streak</div>
              <div className="text-sm text-gray-400">7/7 - 8/7</div>
            </div>

            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-400">{stats.longestStreak}</div>
              <div className="text-blue-300 font-medium">Longest Streak</div>
              <div className="text-sm text-gray-400">6/11/2024 - 27/11/2024</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
