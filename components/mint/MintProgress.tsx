'use client'

import { CheckCircle, Loader2, Upload, Hammer } from 'lucide-react'
import { motion } from 'framer-motion'

interface MintProgressProps {
  step: 'idle' | 'uploading' | 'minting' | 'success'
  txHash?: string | null
}

export function MintProgress({ step, txHash }: MintProgressProps) {
  if (step === 'idle') return null

  const steps = [
    {
      id: 'uploading',
      label: 'Uploading to IPFS',
      icon: Upload,
      description: 'Storing image and metadata...',
    },
    {
      id: 'minting',
      label: 'Minting NFT',
      icon: Hammer,
      description: 'Creating your NFT on-chain...',
    },
    {
      id: 'success',
      label: 'Success!',
      icon: CheckCircle,
      description: 'Your NFT has been minted',
    },
  ]

  const currentStepIndex = steps.findIndex(s => s.id === step)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-strong rounded-2xl p-6 space-y-6"
    >
      <h3 className="text-xl font-bold text-white">Minting Progress</h3>

      <div className="space-y-4">
        {steps.map((stepItem, index) => {
          const Icon = stepItem.icon
          const isActive = index === currentStepIndex
          const isCompleted = index < currentStepIndex
          const isCurrent = stepItem.id === step

          return (
            <div key={stepItem.id} className="flex items-start gap-4">
              {/* Icon */}
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isCompleted
                    ? 'bg-green-500/20 text-green-400'
                    : isActive
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'bg-white/5 text-gray-500'
                }`}
              >
                {isActive && step !== 'success' ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <Icon className="w-6 h-6" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p
                  className={`font-semibold ${
                    isCompleted || isActive ? 'text-white' : 'text-gray-500'
                  }`}
                >
                  {stepItem.label}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {stepItem.description}
                </p>
                
                {/* Progress bar */}
                {isActive && (
                  <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Transaction Hash */}
      {step === 'success' && txHash && (
        <div className="pt-4 border-t border-white/10">
          <p className="text-sm text-gray-400 mb-2">Transaction Hash</p>
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 font-mono text-sm break-all transition-colors"
          >
            {txHash}
          </a>
        </div>
      )}
    </motion.div>
  )
}