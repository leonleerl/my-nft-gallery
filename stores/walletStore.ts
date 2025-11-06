import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { WalletState, WalletData } from '@/types'

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      // 初始状态
      address: null,
      chainId: null,
      balance: null,
      ensName: null,
      isConnected: false,
      isConnecting: false,

      // 设置钱包信息
      setWallet: (data: WalletData) =>
        set({
          address: data.address,
          chainId: data.chainId,
          balance: data.balance || null,
          ensName: data.ensName || null,
          isConnected: true,
          isConnecting: false,
        }),

      // 断开连接
      disconnect: () =>
        set({
          address: null,
          chainId: null,
          balance: null,
          ensName: null,
          isConnected: false,
          isConnecting: false,
        }),

      // 更新余额
      updateBalance: (balance: string) => set({ balance }),

      // 设置连接状态
      setConnecting: (isConnecting: boolean) => set({ isConnecting }),
    }),
    {
      name: 'wallet-storage', // localStorage 的 key
      storage: createJSONStorage(() => localStorage), // 使用 localStorage
      partialize: (state) => ({
        // 只持久化这些字段
        address: state.address,
        chainId: state.chainId,
        isConnected: state.isConnected,
      }),
    }
  )
)