'use client'

import { Grid3x3, List } from 'lucide-react'
import { useNFTStore } from '@/stores/nftStore'

export function ViewToggle() {
  const { viewMode, toggleViewMode } = useNFTStore()

  return (
    <div className="glass rounded-xl p-1 inline-flex gap-1">
      <button
        onClick={toggleViewMode}
        className={`p-2 rounded-lg transition-colors ${
          viewMode === 'grid'
            ? 'bg-purple-500 text-white'
            : 'text-gray-400 hover:text-white hover:bg-white/10'
        }`}
        title="Grid View"
      >
        <Grid3x3 className="w-5 h-5" />
      </button>
      
      <button
        onClick={toggleViewMode}
        className={`p-2 rounded-lg transition-colors ${
          viewMode === 'list'
            ? 'bg-purple-500 text-white'
            : 'text-gray-400 hover:text-white hover:bg-white/10'
        }`}
        title="List View"
      >
        <List className="w-5 h-5" />
      </button>
    </div>
  )
}