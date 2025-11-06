import { getDefaultConfig } from '@rainbow-me/rainbowkit'

import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    sepolia,
  } from 'wagmi/chains'


export const config = getDefaultConfig({
    appName: 'My NFT Gallery',
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
    chains: [
        mainnet, polygon, optimism, arbitrum, sepolia,
    ],
    ssr: true,
})

// the display information of the chains
export const chainInfo = {
    [mainnet.id]: {
      name: 'Ethereum',
      icon: '⟠',
      color: '#627EEA',
    },
    [polygon.id]: {
      name: 'Polygon',
      icon: '⬣',
      color: '#8247E5',
    },
    [optimism.id]: {
      name: 'Optimism',
      icon: '🔴',
      color: '#FF0420',
    },
    [arbitrum.id]: {
      name: 'Arbitrum',
      icon: '🔵',
      color: '#28A0F0',
    },
    [sepolia.id]: {
      name: 'Sepolia',
      icon: '🧪',
      color: '#FFC107',
    },
  }
  