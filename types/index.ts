// ==================== NFT 相关类型 ====================

export interface NFTAttribute {
  trait_type: string
  value: string | number
  display_type?: string
}

export interface NFTMetadata {
  name: string
  description: string
  image: string
  attributes: NFTAttribute[]
  external_url?: string
  background_color?: string
  animation_url?: string
}

export interface NFT {
  tokenId: string
  name: string
  description?: string
  image: string
  collection: string
  contractAddress: string
  owner: string
  attributes: NFTAttribute[]
  metadata?: NFTMetadata
}

// ==================== 钱包相关类型 ====================

export interface WalletData {
  address: string
  chainId: number
  balance?: string
  ensName?: string | null
}

export interface WalletState {
  address: string | null
  chainId: number | null
  balance: string | null
  ensName: string | null
  isConnected: boolean
  isConnecting: boolean
  setWallet: (data: WalletData) => void
  disconnect: () => void
  updateBalance: (balance: string) => void
  setConnecting: (isConnecting: boolean) => void
}

// ==================== NFT Store 类型 ====================

export interface NFTFilter {
  collection?: string
  search?: string
}

export interface NFTState {
  nfts: NFT[]
  isLoading: boolean
  error: string | null
  viewMode: 'grid' | 'list'
  selectedNFT: NFT | null
  filter: NFTFilter
  
  // Actions
  setNFTs: (nfts: NFT[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  toggleViewMode: () => void
  selectNFT: (nft: NFT | null) => void
  setFilter: (filter: Partial<NFTFilter>) => void
  addNFT: (nft: NFT) => void
  clearNFTs: () => void
}

// ==================== Mint 相关类型 ====================

export interface MintFormData {
  name: string
  description: string
  image: File | null
  attributes: NFTAttribute[]
}

export interface MintStatus {
  isUploading?: boolean
  isMinting?: boolean
  txHash?: string | null
  error?: string | null
}

export interface MintState extends MintFormData {
  isUploading: boolean
  isMinting: boolean
  txHash: string | null
  error: string | null
  
  // Actions
  setFormData: (data: Partial<MintFormData>) => void
  addAttribute: () => void
  removeAttribute: (index: number) => void
  updateAttribute: (index: number, field: keyof NFTAttribute, value: string) => void
  setMintStatus: (status: MintStatus) => void
  reset: () => void
}

// ==================== 交易相关类型 ====================

export type TransactionStatus = 
  | 'idle' 
  | 'preparing' 
  | 'pending' 
  | 'success' 
  | 'error'

export interface Transaction {
  hash: string
  status: TransactionStatus
  timestamp: number
  type: 'mint' | 'transfer' | 'approve'
}

// ==================== 网络配置类型 ====================

export interface NetworkConfig {
  chainId: number
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls: string[]
}

// ==================== UI 组件类型 ====================

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}