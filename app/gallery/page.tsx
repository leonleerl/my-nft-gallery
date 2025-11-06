'use client'

import { useNFTs } from '@/hooks/useNFTs'
import { NFTGrid } from '@/components/nft/NFTGrid'
import { NFTDetail } from '@/components/nft/NFTDetail'
import { ViewToggle } from '@/components/nft/ViewToggle'
import { ConnectButton } from '@/components/wallet/ConnectButton'
import { useAccount } from 'wagmi'
import { Sparkles, RefreshCw, Link } from 'lucide-react'
import { useNFTStore } from '@/stores/nftStore'

export default function GalleryPage() {
  const { isConnected } = useAccount()
  const { isLoading, refetch } = useNFTs()
  const nfts = useNFTStore((state) => state.nfts)

  return (
    <div className="min-h-screen">
      {/* 渐变背景 */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-orange-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-700/20 via-transparent to-transparent" />
      </div>

      <div className="container-custom py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <h1 className="text-4xl font-bold">
              <span className="text-gradient">NFT Gallery</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/mint">
              <button className="btn-primary">
                Mint NFT
              </button>
            </Link>
            <ConnectButton />
          </div>
        </header>

        {/* 未连接钱包状态 */}
        {!isConnected && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-purple-500/20 mb-6 animate-pulse">
              <svg
                className="w-12 h-12 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Connect Your Wallet
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Connect your wallet to view your NFT collection
            </p>
            <ConnectButton />
          </div>
        )}

        {/* 已连接：显示 NFT */}
        {isConnected && (
          <>
            {/* 工具栏 */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <ViewToggle />
                
                <div className="text-sm text-gray-400">
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="loading-spinner" />
                      Loading NFTs...
                    </span>
                  ) : (
                    <span>
                      {nfts.length} NFT{nfts.length !== 1 ? 's' : ''} found
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={refetch}
                disabled={isLoading}
                className="btn-secondary flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>

            {/* NFT 网格 */}
            <NFTGrid />

            {/* NFT 详情弹窗 */}
            <NFTDetail />
          </>
        )}
      </div>
    </div>
  )
}