// 合约 ABI（简化版，只包含 mint 函数）
export const NFT_ABI = [
    {
      inputs: [{ internalType: 'string', name: 'tokenURI', type: 'string' }],
      name: 'mint',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getCurrentTokenId',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: 'address', name: 'to', type: 'address' },
        { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        { indexed: false, internalType: 'string', name: 'tokenURI', type: 'string' },
      ],
      name: 'NFTMinted',
      type: 'event',
    },
  ] as const
  
  // 合约地址（部署后填入）
  // Sepolia 测试网
  export const NFT_CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000' // TODO: 部署后替换
  
  // 合约配置
  export const NFT_CONTRACT = {
    address: NFT_CONTRACT_ADDRESS as `0x${string}`,
    abi: NFT_ABI,
  }