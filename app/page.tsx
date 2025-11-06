import Image from "next/image";
import { Sparkles, Wallet, Image as ImageIcon, Grid3x3 } from "lucide-react";
import { ConnectButton } from "@/components/wallet/ConnectButton";
import { WalletInfo } from "@/components/wallet/WalletInfo";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 渐变背景 */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-orange-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-700/20 via-transparent to-transparent" />
      </div>

      <div className="container-custom py-16">
        {/* Header with Connect Button */}
        <header className="text-center mb-20">
          <div className="flex justify-end mb-8">
            <ConnectButton />
          </div>

          <div className="inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
            <h1 className="text-6xl md:text-7xl font-bold">
              <span className="text-gradient">My NFT Gallery</span>
            </h1>
            <Sparkles className="w-8 h-8 text-pink-400 animate-pulse" />
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Explore, Collect, and Mint Unique Digital Assets on the Blockchain
          </p>
        </header>

        {/* Wallet Info Card */}
        <div className="max-w-md mx-auto mb-12">
          <WalletInfo />
        </div>

        {/* Hero Card */}
        <div className="glass-strong rounded-3xl p-8 md:p-12 max-w-5xl mx-auto mb-20">
          <div className="text-center space-y-8">
            {/* Animated Icon */}
            <div className="inline-block">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl animate-float mx-auto flex items-center justify-center">
                  <ImageIcon className="w-16 h-16 text-white" strokeWidth={1.5} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-50 animate-glow" />
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Welcome to the Future of Digital Ownership
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                This is a cutting-edge Web3 application powered by{" "}
                <span className="text-purple-400 font-semibold">Next.js 15</span>,{" "}
                <span className="text-pink-400 font-semibold">TypeScript</span>, and{" "}
                <span className="text-orange-400 font-semibold">wagmi</span>.
                Connect your wallet to start exploring and creating NFTs.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold text-gradient">10K+</div>
                <div className="text-gray-400 text-sm mt-1">NFTs Minted</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient">5K+</div>
                <div className="text-gray-400 text-sm mt-1">Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient">50+</div>
                <div className="text-gray-400 text-sm mt-1">Collections</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={<Wallet className="w-8 h-8" />}
            title="Multi-Chain Support"
            description="Connect to Ethereum, Polygon, Arbitrum, and more networks seamlessly"
            color="purple"
          />
          <FeatureCard
            icon={<ImageIcon className="w-8 h-8" />}
            title="Mint Your NFTs"
            description="Create and mint your own unique digital assets with just a few clicks"
            color="pink"
          />
          <FeatureCard
            icon={<Grid3x3 className="w-8 h-8" />}
            title="Beautiful Gallery"
            description="Showcase your collection with stunning grid and list view layouts"
            color="orange"
          />
        </div>

        {/* Tech Stack */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-8 text-gray-200">
            Built With Modern Tech Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Next.js 15',
              'React 19',
              'TypeScript',
              'Zustand',
              'wagmi v2',
              'viem',
              'RainbowKit',
              'Tailwind CSS',
              'Framer Motion',
            ].map((tech) => (
              <span key={tech} className="tag hover:scale-105 transition-transform">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-gray-400 text-sm">
          <p>Built with ❤️ for the Web3 community</p>
          <p className="mt-2">
            Powered by Next.js 15 • November 2025
          </p>
        </footer>
      </div>
    </div>
  );
}

// Feature Card Component
function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'purple' | 'pink' | 'orange';
}) {
  const colorClasses = {
    purple: 'from-purple-500/20 to-purple-600/5 border-purple-500/30',
    pink: 'from-pink-500/20 to-pink-600/5 border-pink-500/30',
    orange: 'from-orange-500/20 to-orange-600/5 border-orange-500/30',
  };

  const iconColorClasses = {
    purple: 'bg-purple-500/20 text-purple-400',
    pink: 'bg-pink-500/20 text-pink-400',
    orange: 'bg-orange-500/20 text-orange-400',
  };

  return (
    <div className={`glass-strong rounded-2xl p-8 hover-lift hover-glow border bg-gradient-to-br ${colorClasses[color]}`}>
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${iconColorClasses[color]}`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}