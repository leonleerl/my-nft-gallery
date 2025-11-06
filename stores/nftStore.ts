import { create } from 'zustand'
import type { NFTState, NFT, NFTFilter } from '@/types'

export const useNFTStore = create<NFTState>((set) => ({
  // 初始状态
  nfts: [],
  isLoading: false,
  error: null,
  viewMode: 'grid',
  selectedNFT: null,
  filter: {},

  // 设置 NFT 列表
  setNFTs: (nfts: NFT[]) =>
    set({ nfts, isLoading: false, error: null }),

  // 设置加载状态
  setLoading: (isLoading: boolean) =>
    set({ isLoading }),

  // 设置错误
  setError: (error: string | null) =>
    set({ error, isLoading: false }),

  // 切换视图模式
  toggleViewMode: () =>
    set((state) => ({
      viewMode: state.viewMode === 'grid' ? 'list' : 'grid',
    })),

  // 选择 NFT
  selectNFT: (nft: NFT | null) =>
    set({ selectedNFT: nft }),

  // 设置筛选
  setFilter: (filter: Partial<NFTFilter>) =>
    set((state) => ({
      filter: { ...state.filter, ...filter },
    })),

  // 添加新 NFT
  addNFT: (nft: NFT) =>
    set((state) => ({
      nfts: [nft, ...state.nfts],
    })),

  // 清空 NFT
  clearNFTs: () =>
    set({ nfts: [], selectedNFT: null, error: null }),
}))