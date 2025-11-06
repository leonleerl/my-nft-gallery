'use client'

import { useWalletStore } from '@/stores/walletStore'
import { chainInfo } from '@/lib/wagmi'
import { Copy, ExternalLink, Check } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export function WalletInfo() {
  const { address, chainId, balance, ensName, isConnected } = useWalletStore()
  const [copied, setCopied] = useState(false)

  if (!isConnected || !address) {
    return null
  }

  const chain = chainId && chainId in chainInfo ? chainInfo[chainId as keyof typeof chainInfo] : null

  const copyAddress = () => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    toast.success('Address copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  const openEtherscan = () => {
    const baseUrl = chainId === 1 
      ? 'https://etherscan.io' 
      : `https://${chain?.name.toLowerCase()}.etherscan.io`
    window.open(`${baseUrl}/address/${address}`, '_blank')
  }

  return (
    <div className="glass-strong rounded-2xl p-6 space-y-4">
      <h3 className="text-xl font-bold text-white">Wallet Info</h3>

      {/* 地址 */}
      <div>
        <p className="text-sm text-gray-400 mb-2">Address</p>
        <div className="flex items-center gap-2">
          <code className="text-purple-400 font-mono text-sm">
            {ensName || `${address.slice(0, 6)}...${address.slice(-4)}`}
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

      {/* 网络 */}
      {chain && (
        <div>
          <p className="text-sm text-gray-400 mb-2">Network</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{chain.icon}</span>
            <span className="text-white font-semibold">{chain.name}</span>
          </div>
        </div>
      )}

      {/* 余额 */}
      {balance && (
        <div>
          <p className="text-sm text-gray-400 mb-2">Balance</p>
          <p className="text-2xl font-bold text-white">
            {parseFloat(balance).toFixed(4)} ETH
          </p>
        </div>
      )}
    </div>
  )
}