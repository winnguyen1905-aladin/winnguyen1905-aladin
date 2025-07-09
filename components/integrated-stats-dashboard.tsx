"use client"

import { useState } from "react"
import GitHubStatsOverview from "./github-stats-overview"
import WakaTimeStats from "./wakatime-stats"
import ContributionGraph from "./contribution-graph"
import { Button } from "@/components/ui/button"
import { Settings, RefreshCw } from "lucide-react"

interface IntegratedStatsDashboardProps {
  wakaTimeApiKey?: string
  githubToken?: string
  username?: string
}

export default function IntegratedStatsDashboard({
  wakaTimeApiKey,
  githubToken,
  username = "winnguyen1905",
}: IntegratedStatsDashboardProps) {
  const [refreshKey, setRefreshKey] = useState(0)
  const [showSettings, setShowSettings] = useState(false)

  const handleRefreshAll = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gray-950 py-8">
      <div className="container mx-auto px-4 space-y-6">
        {/* Control Panel */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefreshAll}
              className="text-blue-400 border-blue-400 hover:bg-blue-400/10 bg-transparent"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh All
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="text-gray-400 border-gray-400 hover:bg-gray-400/10"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>

          {!wakaTimeApiKey && !githubToken && (
            <div className="text-sm text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-lg">
              Using demo data - Add API keys for real-time stats
            </div>
          )}
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-semibold text-white">API Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <label className="block text-gray-300 mb-1">WakaTime API Key</label>
                <input
                  type="password"
                  placeholder="waka_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  defaultValue={wakaTimeApiKey}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">GitHub Token</label>
                <input
                  type="password"
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  defaultValue={githubToken}
                />
              </div>
            </div>
            <div className="text-xs text-gray-400">
              <p>
                • WakaTime API key can be found in your{" "}
                <a
                  href="https://wakatime.com/settings/account"
                  target="_blank"
                  className="text-blue-400 hover:underline"
                  rel="noreferrer"
                >
                  WakaTime settings
                </a>
              </p>
              <p>
                • GitHub token needs 'repo' and 'user' scopes from{" "}
                <a
                  href="https://github.com/settings/tokens"
                  target="_blank"
                  className="text-blue-400 hover:underline"
                  rel="noreferrer"
                >
                  GitHub settings
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Main Stats Dashboard */}
        <GitHubStatsOverview key={`github-${refreshKey}`} username={username} githubToken={githubToken} />

        <WakaTimeStats key={`wakatime-${refreshKey}`} apiKey={wakaTimeApiKey} username={username} />

        <ContributionGraph key={`contributions-${refreshKey}`} username={username} />
      </div>
    </div>
  )
}
