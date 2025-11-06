'use client'

import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance, useEnsName } from 'wagmi'
import { useWalletStore } from '@/stores/walletStore'
import { useEffect } from 'react'
import { formatEther } from 'viem'

export function ConnectButton() {
  const { address, chainId } = useAccount()
  const { data: balance } = useBalance({ address })
  const { data: ensName } = useEnsName({ address })
  
  const setWallet = useWalletStore((state) => state.setWallet)
  const disconnect = useWalletStore((state) => state.disconnect)

  // 同步 wagmi 状态到 Zustand
  useEffect(() => {
    if (address && chainId) {
      setWallet({
        address,
        chainId,
        balance: balance ? formatEther(balance.value) : undefined,
        ensName: ensName || undefined,
      })
    } else {
      disconnect()
    }
  }, [address, chainId, balance, ensName, setWallet, disconnect])

  return (
    <RainbowConnectButton
      showBalance={false}
      chainStatus="icon"
      accountStatus="address"
    />
  )
}