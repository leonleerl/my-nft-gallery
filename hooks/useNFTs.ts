'use client'

import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useNFTStore } from '@/stores/nftStore'
import { fetchNFTs } from '@/lib/nft-api'
import toast from 'react-hot-toast'

export function useNFTs() {
  const { address, isConnected } = useAccount()
  const { nfts, isLoading, setNFTs, setLoading, setError } = useNFTStore()

  useEffect(() => {
    async function loadNFTs() {
      if (!address || !isConnected) {
        setNFTs([])
        return
      }

      try {
        setLoading(true)
        setError(null)
        
        const nftData = await fetchNFTs(address)
        setNFTs(nftData)
        
        if (nftData.length === 0) {
          toast('No NFTs found in this wallet', { icon: '🔍' })
        } else {
          toast.success(`Loaded ${nftData.length} NFTs`)
        }
      } catch (error) {
        console.error('Error fetching NFTs:', error)
        setError('Failed to load NFTs')
        toast.error('Failed to load NFTs')
      } finally {
        setLoading(false)
      }
    }

    loadNFTs()
  }, [address, isConnected, setNFTs, setLoading, setError])

  return {
    nfts,
    isLoading,
    refetch: () => {
      if (address) {
        fetchNFTs(address).then(setNFTs)
      }
    },
  }
}