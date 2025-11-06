'use client'

import { useState, useEffect, useRef } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useMintStore } from '@/stores/mintStore'
import { uploadNFT } from '@/lib/ipfs'
import { NFT_CONTRACT } from '@/lib/contract'
import toast from 'react-hot-toast'

export function useMint() {
  const [step, setStep] = useState<'idle' | 'uploading' | 'minting' | 'success'>('idle')
  const successHandled = useRef(false)
  
  const { name, description, image, attributes, setMintStatus, reset } = useMintStore()

  // 准备合约写入 (wagmi v2)
  const { 
    writeContract, 
    data: hash, 
    isError: isWriteError,
    error: writeError
  } = useWriteContract()

  // 等待交易确认 (wagmi v2)
  const { 
    isLoading: isConfirming, 
    isSuccess,
    isError: isTransactionError,
    error: transactionError
  } = useWaitForTransactionReceipt({
    hash,
  })

  // 完整的铸造流程
  const mint = async () => {
    if (!image || !name) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      // 步骤 1: 上传到 IPFS
      setStep('uploading')
      setMintStatus({ isUploading: true, error: null })
      toast.loading('Uploading to IPFS...', { id: 'ipfs' })

      const { metadataUrl } = await uploadNFT(
        image,
        name,
        description,
        attributes.filter(attr => attr.trait_type && attr.value) // 只保留有效属性
      )

      toast.success('Uploaded to IPFS!', { id: 'ipfs' })
      setMintStatus({ isUploading: false })

      // 步骤 2: 调用合约铸造
      setStep('minting')
      setMintStatus({ isMinting: true })
      toast.loading('Minting NFT...', { id: 'mint' })

      // 调用智能合约 (wagmi v2 方式)
      await writeContract({
        ...NFT_CONTRACT,
        functionName: 'mint',
        args: [metadataUrl],
      })

      // 注意：交易哈希会设置，useWaitForTransactionReceipt 会自动监听确认
    } catch (error) {
      console.error('Mint error:', error)
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to mint NFT'
      
      // 处理用户拒绝交易的情况
      if (errorMessage.includes('User rejected') || errorMessage.includes('user rejected')) {
        toast.error('Transaction rejected', { id: 'mint' })
      } else {
        toast.error(errorMessage, { id: 'mint' })
      }
      
      setMintStatus({ 
        isUploading: false, 
        isMinting: false, 
        error: errorMessage
      })
      setStep('idle')
      toast.dismiss('ipfs')
    }
  }

  // 监听交易成功
  useEffect(() => {
    if (isSuccess && hash && !successHandled.current) {
      successHandled.current = true
      
      // 使用 setTimeout 来避免在 effect 中直接设置状态
      setTimeout(() => {
        setStep('success')
        setMintStatus({ 
          isMinting: false, 
          txHash: hash 
        })
        toast.success('NFT Minted Successfully!', { id: 'mint' })

        // 添加到 NFT 列表（可选）
        // 实际项目中应该从链上读取新铸造的 NFT
        
        // 5 秒后重置表单
        setTimeout(() => {
          reset()
          setStep('idle')
          successHandled.current = false
        }, 5000)
      }, 0)
    }
  }, [isSuccess, hash, setMintStatus, reset])

  // 重置成功处理标志
  useEffect(() => {
    if (!hash && successHandled.current) {
      successHandled.current = false
    }
  }, [hash])

  // 监听写入错误
  useEffect(() => {
    if (isWriteError && writeError) {
      const errorMessage = writeError.message || 'Transaction failed'
      
      setTimeout(() => {
        setMintStatus({ 
          isMinting: false, 
          error: errorMessage
        })
        setStep('idle')
        
        if (errorMessage.includes('User rejected') || errorMessage.includes('user rejected')) {
          toast.error('Transaction rejected', { id: 'mint' })
        } else {
          toast.error('Transaction failed', { id: 'mint' })
        }
      }, 0)
    }
  }, [isWriteError, writeError, setMintStatus])

  // 监听交易确认错误
  useEffect(() => {
    if (isTransactionError && transactionError) {
      const errorMessage = transactionError.message || 'Transaction confirmation failed'
      
      setTimeout(() => {
        setMintStatus({ 
          isMinting: false, 
          error: errorMessage
        })
        setStep('idle')
        toast.error('Transaction confirmation failed', { id: 'mint' })
      }, 0)
    }
  }, [isTransactionError, transactionError, setMintStatus])

  return {
    mint,
    step,
    isUploading: step === 'uploading',
    isMinting: step === 'minting' || isConfirming,
    isSuccess: step === 'success',
    txHash: hash,
    reset: () => {
      reset()
      setStep('idle')
    },
  }
}