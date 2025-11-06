export function NFTSkeleton() {
    return (
        <div className="nft-card p-0 overflow-hidden">
        {/* 图片骨架 */}
        <div className="aspect-square skeleton" />
        
        {/* 信息骨架 */}
        <div className="p-4 space-y-3">
            <div className="skeleton h-6 w-3/4" />
            <div className="skeleton h-4 w-1/2" />
            
            {/* 属性骨架 */}
            <div className="flex gap-2">
            <div className="skeleton h-6 w-16 rounded-full" />
            <div className="skeleton h-6 w-20 rounded-full" />
            </div>
        </div>
        </div>
    )
}

export function NFTSkeletonGrid() {
    return (
      <div className="nft-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <NFTSkeleton key={i} />
        ))}
      </div>
    )
  }