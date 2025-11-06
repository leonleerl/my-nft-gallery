import { NFTStorage, File } from 'nft.storage'
import type { NFTMetadata } from '@/types'

// 初始化 NFT.Storage 客户端
const client = new NFTStorage({ 
  token: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN || '' 
})

// 上传图片到 IPFS
export async function uploadImageToIPFS(imageFile: File): Promise<string> {
  try {
    console.log('📤 Uploading image to IPFS...')
    
    const cid = await client.storeBlob(imageFile)
    const imageUrl = `https://nftstorage.link/ipfs/${cid}`
    
    console.log('✅ Image uploaded:', imageUrl)
    return imageUrl
  } catch (error) {
    console.error('❌ Error uploading image:', error)
    throw new Error('Failed to upload image to IPFS')
  }
}

// 上传元数据到 IPFS
export async function uploadMetadataToIPFS(
  metadata: NFTMetadata
): Promise<string> {
  try {
    console.log('📤 Uploading metadata to IPFS...')
    
    // 将元数据转换为 Blob
    const metadataBlob = new Blob([JSON.stringify(metadata)], {
      type: 'application/json',
    })
    
    const cid = await client.storeBlob(metadataBlob)
    const metadataUrl = `https://nftstorage.link/ipfs/${cid}`
    
    console.log('✅ Metadata uploaded:', metadataUrl)
    return metadataUrl
  } catch (error) {
    console.error('❌ Error uploading metadata:', error)
    throw new Error('Failed to upload metadata to IPFS')
  }
}

// 完整的 NFT 上传流程
export async function uploadNFT(
  imageFile: File,
  name: string,
  description: string,
  attributes: Array<{ trait_type: string; value: string | number }>
): Promise<{ imageUrl: string; metadataUrl: string }> {
  try {
    // 1. 上传图片
    const imageUrl = await uploadImageToIPFS(imageFile)
    
    // 2. 创建元数据
    const metadata: NFTMetadata = {
      name,
      description,
      image: imageUrl,
      attributes,
    }
    
    // 3. 上传元数据
    const metadataUrl = await uploadMetadataToIPFS(metadata)
    
    return { imageUrl, metadataUrl }
  } catch (error) {
    console.error('❌ Error uploading NFT:', error)
    throw error
  }
}