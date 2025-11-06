'use client'

import { NFTCard } from './NFTCard'
import { NFTSkeletonGrid } from './NFTSkeleton'
import { useNFTStore } from '@/stores/nftStore'
import Image from 'next/image'
import type { NFT } from '@/types'
import { getRarityColor } from '@/lib/nft-api'

export function NFTGrid() {
  const { nfts, isLoading, viewMode, selectNFT } = useNFTStore()

  if (isLoading) {
    return <NFTSkeletonGrid />
  }

  if (nfts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-500/20 mb-6">
          <svg
            className="w-10 h-10 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">No NFTs Found</h3>
        <p className="text-gray-400 mb-6">
          This wallet doesn&apos;t own any NFTs yet
        </p>
        <button className="btn-primary">
          Explore Collections
        </button>
      </div>
    )
  }

  // List 视图
  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {nfts.map((nft) => (
          <NFTListItem key={`${nft.contractAddress}-${nft.tokenId}`} nft={nft} onClick={() => selectNFT(nft)} />
        ))}
      </div>
    )
  }

  // Grid 视图
  return (
    <div className="nft-grid">
      {nfts.map((nft, index) => (
        <NFTCard key={`${nft.contractAddress}-${nft.tokenId}`} nft={nft} index={index} />
      ))}
    </div>
  )
}

// List 视图项组件
function NFTListItem({ nft, onClick }: { nft: NFT; onClick: () => void }) {
  const rarityAttr = nft.attributes.find(attr => 
    attr.trait_type.toLowerCase() === 'rarity'
  )

  return (
    <div
      onClick={onClick}
      className="glass-strong rounded-2xl p-4 hover:glass hover-lift cursor-pointer flex gap-4 group"
    >
      {/* 缩略图 */}
      <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
        <Image
          src={nft.image}
          alt={nft.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* 信息 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-lg text-white truncate group-hover:text-purple-400 transition-colors">
              {nft.name}
            </h3>
            <p className="text-sm text-purple-400">{nft.collection}</p>
          </div>
          
          {rarityAttr && (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex-shrink-0 ${getRarityColor(rarityAttr.value as string)}`}>
              {rarityAttr.value}
            </span>
          )}
        </div>

        {/* 属性 */}
        <div className="flex gap-2 flex-wrap">
          {nft.attributes.slice(0, 4).map((attr, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs rounded-lg bg-white/5 text-gray-300 border border-white/10"
            >
              {attr.trait_type}: {attr.value}
            </span>
          ))}
          {nft.attributes.length > 4 && (
            <span className="px-2 py-1 text-xs rounded-lg bg-white/5 text-gray-400">
              +{nft.attributes.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Token ID */}
      <div className="flex-shrink-0 text-right">
        <p className="text-xs text-gray-500 mb-1">Token ID</p>
        <p className="text-sm font-mono text-gray-300">#{nft.tokenId}</p>
      </div>
    </div>
  )
}