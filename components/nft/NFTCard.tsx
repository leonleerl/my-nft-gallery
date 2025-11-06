'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { NFT } from '@/types'
import { useNFTStore } from '@/stores/nftStore'
import { getRarityColor } from '@/lib/nft-api'

interface NFTCardProps {
  nft: NFT
  index: number
}

export function NFTCard({ nft, index }: NFTCardProps) {
  const selectNFT = useNFTStore((state) => state.selectNFT)
  
  // 找到稀有度属性
  const rarityAttr = nft.attributes.find(attr => 
    attr.trait_type.toLowerCase() === 'rarity'
  )

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={() => selectNFT(nft)}
      className="nft-card cursor-pointer group"
    >
      {/* NFT 图片 */}
      <div className="relative aspect-square overflow-hidden rounded-t-2xl">
        <Image
          src={nft.image}
          alt={nft.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* 悬浮渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* 稀有度标签 */}
        {rarityAttr && (
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRarityColor(rarityAttr.value as string)}`}>
              {rarityAttr.value}
            </span>
          </div>
        )}
      </div>

      {/* NFT 信息 */}
      <div className="p-4 space-y-3">
        {/* 标题和集合 */}
        <div>
          <h3 className="font-bold text-lg text-white truncate group-hover:text-purple-400 transition-colors">
            {nft.name}
          </h3>
          <p className="text-sm text-gray-400 truncate">{nft.collection}</p>
        </div>

        {/* 属性标签 */}
        <div className="flex gap-2 flex-wrap">
          {nft.attributes.slice(0, 2).map((attr, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs rounded-lg bg-white/5 text-gray-300 border border-white/10"
            >
              {attr.trait_type}: {attr.value}
            </span>
          ))}
          {nft.attributes.length > 2 && (
            <span className="px-2 py-1 text-xs rounded-lg bg-white/5 text-gray-400">
              +{nft.attributes.length - 2} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}