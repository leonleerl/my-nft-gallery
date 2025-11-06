'use client'

import Image from 'next/image'
import { useNFTStore } from '@/stores/nftStore'
import { Dialog } from '@/components/ui/Dialog'
import { ExternalLink, Copy, Check } from 'lucide-react'
import { getRarityColor } from '@/lib/nft-api'
import { useState } from 'react'
import toast from 'react-hot-toast'

export function NFTDetail() {
  const { selectedNFT, selectNFT } = useNFTStore()
  const [copied, setCopied] = useState(false)

  if (!selectedNFT) return null

  const copyAddress = () => {
    navigator.clipboard.writeText(selectedNFT.contractAddress)
    setCopied(true)
    toast.success('Contract address copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  const openEtherscan = () => {
    window.open(
      `https://etherscan.io/token/${selectedNFT.contractAddress}?a=${selectedNFT.tokenId}`,
      '_blank'
    )
  }

  const rarityAttr = selectedNFT.attributes.find(attr => 
    attr.trait_type.toLowerCase() === 'rarity'
  )

  return (
    <Dialog 
      open={!!selectedNFT} 
      onOpenChange={() => selectNFT(null)}
      title={selectedNFT.name}
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* 左侧：图片 */}
        <div className="relative aspect-square rounded-2xl overflow-hidden">
          <Image
            src={selectedNFT.image}
            alt={selectedNFT.name}
            fill
            className="object-cover"
            priority
          />
          
          {rarityAttr && (
            <div className="absolute top-4 right-4">
              <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getRarityColor(rarityAttr.value as string)}`}>
                {rarityAttr.value}
              </span>
            </div>
          )}
        </div>

        {/* 右侧：信息 */}
        <div className="space-y-6">
          {/* 标题 */}
          <div>
            <p className="text-purple-400 text-sm font-semibold mb-1">
              {selectedNFT.collection}
            </p>
            <h2 className="text-4xl font-bold text-white mb-2">
              {selectedNFT.name}
            </h2>
            <p className="text-gray-400 leading-relaxed">
              {selectedNFT.description || 'No description available'}
            </p>
          </div>

          {/* 合约信息 */}
          <div className="glass rounded-xl p-4">
            <p className="text-sm text-gray-400 mb-2">Contract Address</p>
            <div className="flex items-center gap-2">
              <code className="text-purple-400 font-mono text-sm flex-1 truncate">
                {selectedNFT.contractAddress}
              </code>
              <button
                onClick={copyAddress}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
              <button
                onClick={openEtherscan}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Token ID */}
          <div className="glass rounded-xl p-4">
            <p className="text-sm text-gray-400 mb-1">Token ID</p>
            <p className="text-xl font-bold text-white">#{selectedNFT.tokenId}</p>
          </div>

          {/* 属性 */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Attributes</h3>
            <div className="grid grid-cols-2 gap-3">
              {selectedNFT.attributes.map((attr, index) => (
                <div
                  key={index}
                  className="glass rounded-xl p-4 text-center hover:glass-strong transition-all"
                >
                  <p className="text-xs text-purple-400 font-semibold uppercase tracking-wide mb-1">
                    {attr.trait_type}
                  </p>
                  <p className="text-white font-bold">{attr.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-3 pt-4">
            <button className="btn-primary flex-1">
              View on OpenSea
            </button>
            <button className="btn-secondary">
              Share
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}