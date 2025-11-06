'use client'

import { useMint } from '@/hooks/useMint'
import { useMintStore } from '@/stores/mintStore'
import { ImageUpload } from '@/components/ui/ImageUpload'
import { AttributeEditor } from '@/components/mint/AttributeEditor'
import { MintProgress } from '@/components/mint/MintProgress'
import { ConnectButton } from '@/components/wallet/ConnectButton'
import { useAccount } from 'wagmi'
import { Sparkles, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function MintPage() {
  const { isConnected } = useAccount()
  const { name, description, image, setFormData } = useMintStore()
  const { mint, step, isUploading, isMinting, isSuccess, txHash } = useMint()

  const canMint = isConnected && name && image && !isUploading && !isMinting

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
          <div className="flex items-center gap-4">
            <Link href="/gallery">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <ArrowLeft className="w-6 h-6 text-gray-400" />
              </button>
            </Link>
            
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <h1 className="text-4xl font-bold">
                <span className="text-gradient">Mint NFT</span>
              </h1>
            </div>
          </div>
          
          <ConnectButton />
        </header>

        {/* 未连接钱包 */}
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
              Connect your wallet to start minting NFTs
            </p>
            <ConnectButton />
          </div>
        )}

        {/* 已连接：显示铸造表单 */}
        {isConnected && (
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* 左侧：表单 */}
            <div className="space-y-6">
              <div className="glass-strong rounded-2xl p-6 space-y-6">
                <h2 className="text-2xl font-bold text-white">NFT Details</h2>

                {/* 图片上传 */}
                <ImageUpload
                  value={image}
                  onChange={(file) => setFormData({ image: file })}
                />

                {/* 名称 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-3">
                    NFT Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cool Cat #42"
                    value={name}
                    onChange={(e) => setFormData({ name: e.target.value })}
                    className="input-primary"
                    maxLength={50}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {name.length}/50 characters
                  </p>
                </div>

                {/* 描述 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-3">
                    Description
                  </label>
                  <textarea
                    placeholder="Describe your NFT..."
                    value={description}
                    onChange={(e) => setFormData({ description: e.target.value })}
                    className="input-primary resize-none"
                    rows={4}
                    maxLength={500}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {description.length}/500 characters
                  </p>
                </div>

                {/* 属性编辑器 */}
                <AttributeEditor />
              </div>

              {/* 铸造按钮 */}
              <button
                onClick={mint}
                disabled={!canMint}
                className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading && 'Uploading to IPFS...'}
                {isMinting && 'Minting NFT...'}
                {!isUploading && !isMinting && 'Mint NFT'}
              </button>

              {/* 提示信息 */}
              {!canMint && isConnected && (
                <p className="text-center text-sm text-gray-400">
                  {!name && 'Please enter a name'}
                  {name && !image && 'Please upload an image'}
                </p>
              )}
            </div>

            {/* 右侧：预览和进度 */}
            <div className="space-y-6">
              {/* 进度显示 */}
              {step !== 'idle' && (
                <MintProgress step={step} txHash={txHash} />
              )}

              {/* 预览卡片 */}
              {step === 'idle' && (
                <div className="glass-strong rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Preview</h3>
                  
                  {image ? (
                    <div className="space-y-4">
                      {/* 图片预览 */}
                      <div className="aspect-square rounded-xl overflow-hidden">
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* 信息预览 */}
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-lg font-bold text-white">
                            {name || 'Untitled NFT'}
                          </h4>
                          {description && (
                            <p className="text-sm text-gray-400 mt-1">
                              {description}
                            </p>
                          )}
                        </div>

                        {/* 属性预览 */}
                        {useMintStore.getState().attributes.length > 0 && (
                          <div>
                            <p className="text-sm font-semibold text-gray-300 mb-2">
                              Attributes
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              {useMintStore.getState().attributes
                                .filter(attr => attr.trait_type && attr.value)
                                .map((attr, i) => (
                                  <div
                                    key={i}
                                    className="glass rounded-lg p-2 text-center"
                                  >
                                    <p className="text-xs text-purple-400 font-semibold uppercase">
                                      {attr.trait_type}
                                    </p>
                                    <p className="text-sm text-white mt-0.5">
                                      {attr.value}
                                    </p>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-square rounded-xl glass flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-3">
                          <Sparkles className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-400">Upload an image to preview</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 成功状态 */}
              {isSuccess && (
                <div className="glass-strong rounded-2xl p-6 text-center">
                  <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-10 h-10 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">
                    NFT Minted Successfully!
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Your NFT has been created on the blockchain
                  </p>

                  <div className="flex gap-3">
                    <Link href="/gallery" className="flex-1">
                      <button className="w-full btn-primary">
                        View in Gallery
                      </button>
                    </Link>
                    <button
                      onClick={() => window.location.reload()}
                      className="flex-1 btn-secondary"
                    >
                      Mint Another
                    </button>
                  </div>
                </div>
              )}

              {/* 说明卡片 */}
              {step === 'idle' && !image && (
                <div className="glass rounded-2xl p-6">
                  <h4 className="font-bold text-white mb-3">
                    💡 How to Mint
                  </h4>
                  <ol className="space-y-2 text-sm text-gray-400">
                    <li className="flex gap-2">
                      <span className="text-purple-400">1.</span>
                      Upload your NFT image
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-400">2.</span>
                      Enter name and description
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-400">3.</span>
                      Add attributes (optional)
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-400">4.</span>
                      Click "Mint NFT" and confirm
                    </li>
                    <li className="flex gap-2">
                      <span className="text-purple-400">5.</span>
                      Wait for blockchain confirmation
                    </li>
                  </ol>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}