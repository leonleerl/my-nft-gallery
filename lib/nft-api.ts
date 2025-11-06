import type { NFT } from '@/types'

// 模拟 NFT 数据（实际项目中应该从 API 获取）
// 生产环境可以使用 Alchemy、Moralis 等服务
export async function fetchNFTs(address: string): Promise<NFT[]> {
  // 模拟 API 延迟
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // 模拟数据
  const mockNFTs: NFT[] = [
    {
      tokenId: '1',
      name: 'Cool Cat #1',
      description: 'A cool cat NFT with unique traits',
      image: 'https://picsum.photos/1600/1200',
      collection: 'Cool Cats',
      contractAddress: '0x1a92f7381b9f03921564a437210bb9396471050c',
      owner: address,
      attributes: [
        { trait_type: 'Background', value: 'Purple' },
        { trait_type: 'Eyes', value: 'Laser' },
        { trait_type: 'Hat', value: 'Crown' },
        { trait_type: 'Rarity', value: 'Legendary' },
      ],
    },
    {
      tokenId: '2',
      name: 'Cyber Punk #42',
      description: 'Futuristic cyber punk character',
      image: 'https://picsum.photos/1600/1200',
      collection: 'Cyber Punks',
      contractAddress: '0x2a92f7381b9f03921564a437210bb9396471050d',
      owner: address,
      attributes: [
        { trait_type: 'Background', value: 'Neon City' },
        { trait_type: 'Outfit', value: 'Leather Jacket' },
        { trait_type: 'Accessory', value: 'VR Headset' },
        { trait_type: 'Rarity', value: 'Epic' },
      ],
    },
    {
      tokenId: '3',
      name: 'Space Ape #777',
      description: 'An ape exploring the cosmos',
      image: 'https://picsum.photos/1600/1200',
      collection: 'Space Apes',
      contractAddress: '0x3a92f7381b9f03921564a437210bb9396471050e',
      owner: address,
      attributes: [
        { trait_type: 'Background', value: 'Galaxy' },
        { trait_type: 'Suit', value: 'Astronaut' },
        { trait_type: 'Tool', value: 'Laser Gun' },
        { trait_type: 'Rarity', value: 'Rare' },
      ],
    },
    {
      tokenId: '4',
      name: 'Pixel Wizard #13',
      description: 'A mystical pixel art wizard',
      image: 'https://picsum.photos/1600/1200',
      collection: 'Pixel Wizards',
      contractAddress: '0x4a92f7381b9f03921564a437210bb9396471050f',
      owner: address,
      attributes: [
        { trait_type: 'Background', value: 'Enchanted Forest' },
        { trait_type: 'Staff', value: 'Crystal' },
        { trait_type: 'Spell', value: 'Fire' },
        { trait_type: 'Rarity', value: 'Common' },
      ],
    },
    {
      tokenId: '5',
      name: 'Dragon Lord #999',
      description: 'The legendary dragon lord',
      image: 'https://picsum.photos/1600/1200',
      collection: 'Dragon Lords',
      contractAddress: '0x5a92f7381b9f03921564a437210bb9396471050g',
      owner: address,
      attributes: [
        { trait_type: 'Background', value: 'Volcano' },
        { trait_type: 'Wings', value: 'Fire' },
        { trait_type: 'Breath', value: 'Plasma' },
        { trait_type: 'Rarity', value: 'Mythic' },
      ],
    },
    {
      tokenId: '6',
      name: 'Ocean Guardian #55',
      description: 'Protector of the seven seas',
      image: 'https://picsum.photos/1600/1200',
      collection: 'Ocean Guardians',
      contractAddress: '0x6a92f7381b9f03921564a437210bb9396471050h',
      owner: address,
      attributes: [
        { trait_type: 'Background', value: 'Deep Ocean' },
        { trait_type: 'Weapon', value: 'Trident' },
        { trait_type: 'Companion', value: 'Dolphin' },
        { trait_type: 'Rarity', value: 'Rare' },
      ],
    },
  ]

  return mockNFTs
}

// 获取单个 NFT 详情
export async function fetchNFT(contractAddress: string, tokenId: string): Promise<NFT | null> {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // 实际应该调用区块链或 API
  // 这里返回 null 表示未找到
  return null
}

// 辅助函数：根据稀有度获取颜色
export function getRarityColor(rarity: string): string {
  const rarityMap: Record<string, string> = {
    'Common': 'text-gray-400 bg-gray-400/20 border-gray-400/30',
    'Rare': 'text-blue-400 bg-blue-400/20 border-blue-400/30',
    'Epic': 'text-purple-400 bg-purple-400/20 border-purple-400/30',
    'Legendary': 'text-orange-400 bg-orange-400/20 border-orange-400/30',
    'Mythic': 'text-red-400 bg-red-400/20 border-red-400/30',
  }
  
  return rarityMap[rarity] || rarityMap['Common']
}