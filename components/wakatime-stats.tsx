"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Clock, Code, Calendar } from "lucide-react"
import { mockWakaTimeData, languageColors } from "@/lib/wakatime-api"

interface WakaTimeStatsProps {
  apiKey?: string
  username?: string
}

export default function WakaTimeStats({ apiKey, username = "winnguyen1905" }: WakaTimeStatsProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [stats, setStats] = useState(mockWakaTimeData.data)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (apiKey) {
      fetchWakaTimeStats()
    }
  }, [apiKey])

  const fetchWakaTimeStats = async () => {
    if (!apiKey) return

    setLoading(true)
    setError(null)

    try {
      // In a real implementation, you would use the WakaTimeAPI class
      // const wakatime = new WakaTimeAPI(apiKey)
      // const data = await wakatime.getStats('last_year')
      // setStats(data.data)

      // For demo purposes, we'll use mock data
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      setStats(mockWakaTimeData.data)
    } catch (err) {
      setError("Failed to fetch WakaTime stats")
      console.error("WakaTime API error:", err)
    } finally {
      setLoading(false)
    }
  }

  const totalMinutes = stats.languages.reduce((acc, lang) => acc + (lang.hours * 60 + lang.minutes), 0)

  return (
    <Card className="bg-gray-800 border-gray-700 text-white">
      <CardHeader className="pb-2">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between text-blue-400 hover:text-blue-300"
        >
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {username}'s WakaTime in last year
          </CardTitle>
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            </div>
          )}

          {error && (
            <div className="text-red-400 text-center py-4">
              {error}
              <Button variant="outline" size="sm" onClick={fetchWakaTimeStats} className="ml-2 text-xs bg-transparent">
                Retry
              </Button>
            </div>
          )}

          {!loading && !error && (
            <>
              {/* Progress Bar */}
              <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden flex">
                {stats.languages.map((lang, index) => {
                  const langMinutes = lang.hours * 60 + lang.minutes
                  const percentage = (langMinutes / totalMinutes) * 100
                  return (
                    <div
                      key={index}
                      className="h-full transition-all duration-300 hover:opacity-80"
                      style={{
                        backgroundColor: languageColors[lang.name] || "#6c757d",
                        width: `${percentage}%`,
                      }}
                      title={`${lang.name}: ${lang.text} (${percentage.toFixed(1)}%)`}
                    />
                  )
                })}
              </div>

              {/* Language Stats Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                {stats.languages.map((lang, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors"
                  >
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: languageColors[lang.name] || "#6c757d" }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-200 truncate">{lang.name}</div>
                      <div className="text-xs text-gray-400">{lang.text}</div>
                    </div>
                    <div className="text-xs text-blue-400 font-mono">{lang.percent.toFixed(1)}%</div>
                  </div>
                ))}
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-700">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-blue-400 mb-1">
                    <Code className="w-4 h-4" />
                    <span className="text-sm font-medium">Total Time</span>
                  </div>
                  <div className="text-lg font-bold text-white">{stats.human_readable_total}</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-green-400 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Daily Average</span>
                  </div>
                  <div className="text-lg font-bold text-white">{stats.human_readable_daily_average}</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-purple-400 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">Languages</span>
                  </div>
                  <div className="text-lg font-bold text-white">{stats.languages.length}</div>
                </div>
              </div>

              {/* Refresh Button */}
              {apiKey && (
                <div className="flex justify-center pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchWakaTimeStats}
                    disabled={loading}
                    className="text-xs bg-transparent"
                  >
                    {loading ? "Refreshing..." : "Refresh Stats"}
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      )}
    </Card>
  )
}
