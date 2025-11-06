import { create } from 'zustand'
import type { MintState, MintFormData, MintStatus, NFTAttribute } from '@/types'

export const useMintStore = create<MintState>((set) => ({
  // 初始状态
  name: '',
  description: '',
  image: null,
  attributes: [],
  isUploading: false,
  isMinting: false,
  txHash: null,
  error: null,

  // 设置表单数据
  setFormData: (data: Partial<MintFormData>) =>
    set((state) => ({ ...state, ...data })),

  // 添加属性
  addAttribute: () =>
    set((state) => ({
      attributes: [
        ...state.attributes,
        { trait_type: '', value: '' },
      ],
    })),

  // 删除属性
  removeAttribute: (index: number) =>
    set((state) => ({
      attributes: state.attributes.filter((_, i) => i !== index),
    })),

  // 更新属性
  updateAttribute: (index: number, field: keyof NFTAttribute, value: string) =>
    set((state) => ({
      attributes: state.attributes.map((attr, i) =>
        i === index ? { ...attr, [field]: value } : attr
      ),
    })),

  // 设置铸造状态
  setMintStatus: (status: MintStatus) =>
    set((state) => ({ ...state, ...status })),

  // 重置表单
  reset: () =>
    set({
      name: '',
      description: '',
      image: null,
      attributes: [],
      isUploading: false,
      isMinting: false,
      txHash: null,
      error: null,
    }),
}))