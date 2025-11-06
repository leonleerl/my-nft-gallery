'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { config } from '@/lib/wagmi'
import '@rainbow-me/rainbowkit/styles.css'
import { Toaster } from 'react-hot-toast'
import { useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  // QueryClient 必须在组件内部创建，避免服务端/客户端状态不一致
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config}> {/* 提供 Wagmi 配置 */}
      <QueryClientProvider client={queryClient}> {/* 提供数据缓存和请求管理 */}
        <RainbowKitProvider 
          theme={darkTheme({
            accentColor: '#a855f7', // 紫色主题
            accentColorForeground: 'white',
            borderRadius: 'large',
            fontStack: 'system',
          })}
          showRecentTransactions={true}
        > {/* 提供钱包UI*/}
          {children}
          
          {/* Toast 通知组件 */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1f2937',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}