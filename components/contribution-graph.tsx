"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface Contribution {
  date: string
  count: number
  color: string
}

interface ContributionGraphProps {
  username?: string
}

const mockContributions: Contribution[] = [
  { date: "2024-07-01", count: 5, color: "#1e6823" },
  { date: "2024-07-02", count: 10, color: "#1e6823" },
  { date: "2024-07-03", count: 2, color: "#0e4429" },
  { date: "2024-07-04", count: 0, color: "#ebedf0" },
  { date: "2024-07-05", count: 8, color: "#1e6823" },
  { date: "2024-07-06", count: 15, color: "#239a3b" },
  { date: "2024-07-07", count: 30, color: "#39d353" },
  { date: "2024-07-08", count: 40, color: "#39d353" },
  { date: "2024-07-09", count: 12, color: "#1e6823" },
  { date: "2024-07-10", count: 7, color: "#1e6823" },
  { date: "2024-07-11", count: 1, color: "#0e4429" },
  { date: "2024-07-12", count: 0, color: "#ebedf0" },
  { date: "2024-07-13", count: 3, color: "#0e4429" },
  { date: "2024-07-14", count: 9, color: "#1e6823" },
  { date: "2024-07-15", count: 22, color: "#239a3b" },
  { date: "2024-07-16", count: 35, color: "#39d353" },
]

export default function ContributionGraph({ username = "winnguyen1905" }: ContributionGraphProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [contributions, setContributions] = useState<Contribution[]>(mockContributions)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // In a real implementation, you would fetch contribution data from GitHub API
    // For demo purposes, we'll use mock data
  }, [])

  return (
    <Card className="bg-gray-800 border-gray-700 text-white">
      <CardHeader className="pb-2">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between text-blue-400 hover:text-blue-300"
        >
          <CardTitle className="text-lg">{username}'s Contribution Graph</CardTitle>
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </CardHeader>

      {isExpanded && (
        <CardContent className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-4">Loading contribution data...</div>
          ) : (
            <div className="flex gap-1">
              {contributions.map((contribution, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: contribution.color }}
                  title={`${contribution.date}: ${contribution.count} contributions`}
                />
              ))}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}
