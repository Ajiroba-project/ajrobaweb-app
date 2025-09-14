'use client'
import React from 'react'

// Skeleton for auction cards
export const AuctionCardSkeleton = () => {
  return (
    <div className="rounded-lg bg-[#fdfdfd] border border-[#F6F6F6] shadow-md animate-pulse overflow-hidden">
      {/* Header section */}
      <div className="border-b-4 pb-4">
        <div className="flex justify-between items-center py-2 px-4">
          <div className="h-3 bg-gray-200 rounded-full w-16"></div>
          <div className="h-6 bg-gray-200 rounded-md w-10"></div>
        </div>
        
        {/* Image placeholder */}
        <div className="flex justify-center items-center my-4">
          <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* Content section */}
      <div>
        <div className="bg-[#F6F6F6] px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="h-3 bg-gray-200 rounded-full w-24"></div>
            <div className="h-3 bg-gray-200 rounded-full w-16"></div>
          </div>
        </div>

        {/* Stars and countdown */}
        <div className="bg-[#f6f6f6] px-4 py-3">
          <div className="flex justify-end gap-1 mb-3">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-200 rounded-full"></div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-gray-200 rounded-full w-20"></div>
            <div className="h-1.5 bg-gray-200 rounded-full w-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Skeleton for product cards
export const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col h-full shadow-lg animate-pulse overflow-hidden">
      {/* Image section */}
      <div className="bg-[#F6F6F6] p-4 rounded-t-lg relative">
        <div className="flex justify-end mb-2">
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        </div>
        
        <div className="flex justify-center items-center">
          <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* Content section */}
      <div className="rounded-b-lg border-t-4 bg-[#FFFFFF] flex-1 flex flex-col">
        <div className="p-4 flex-1">
          <div className="h-3 bg-gray-200 rounded-full w-28 mb-3"></div>
        </div>

        <div className="p-4 flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded-full w-16"></div>
            <div className="h-3 bg-gray-200 rounded-full w-12"></div>
          </div>

          <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-200 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Skeleton for category cards
export const CategoryCardSkeleton = () => {
  return (
    <div className="flex flex-col h-full shadow-lg animate-pulse overflow-hidden">
      {/* Image section */}
      <div className="bg-[#F6F6F6] rounded-t-lg relative">
        <div className="flex justify-center items-center h-48">
          <div className="w-full h-full bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* Content section */}
      <div className="rounded-b-2xl border-t-4 bg-[#FCFCFC] flex flex-col justify-between h-full">
        <div className="p-4 flex-grow">
          <div className="h-4 bg-gray-200 rounded-full w-20 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded-full w-28"></div>
        </div>

        <div className="px-4 mb-4">
          <div className="h-10 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}

// Grid skeleton wrapper
export const GridSkeleton = ({ 
  type = 'auction', 
  count = 4, 
  className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" 
}: { 
  type?: 'auction' | 'product' | 'category'
  count?: number
  className?: string
}) => {
  const SkeletonComponent = type === 'auction' ? AuctionCardSkeleton : 
                           type === 'product' ? ProductCardSkeleton : 
                           CategoryCardSkeleton

  return (
    <div className={className}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="w-full">
          <SkeletonComponent />
        </div>
      ))}
    </div>
  )
}

// Loading overlay for modals
export const LoadingOverlay = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 shadow-xl flex flex-col items-center min-w-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-200 border-t-[#F25E26] mb-4"></div>
        <p className="text-gray-700 font-Poppins text-sm text-center">{message}</p>
      </div>
    </div>
  )
}

// Inline loading spinner
export const LoadingSpinner = ({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg', className?: string }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  }

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-200 border-t-[#F25E26] ${sizeClasses[size]} ${className}`}></div>
  )
}

// Section loading placeholder
export const SectionLoadingSkeleton = ({ title, count = 4 }: { title?: string, count?: number }) => {
  return (
    <div className="w-full">
      {title && (
        <div className="mb-6">
          <div className="h-6 bg-gray-200 rounded-full w-32 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded-full w-48 animate-pulse"></div>
        </div>
      )}
      <GridSkeleton type="product" count={count} />
    </div>
  )
}

// SideMenu skeleton
export const SideMenuSkeleton = () => {
  return (
    <div className="pl-[4rem] animate-pulse">
      <ul className="relative py-6 space-y-2">
        {Array.from({ length: 6 }, (_, i) => (
          <li key={i} className="flex items-center gap-2 py-2">
            <div className="h-4 bg-gray-200 rounded-full w-24"></div>
            <div className="h-3 w-3 bg-gray-200 rounded"></div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Mobile SideMenu skeleton
export const MobileSideMenuSkeleton = () => {
  return (
    <div className="bg-[#F6F6F6] p-6 animate-pulse">
      <ul className="relative space-y-2">
        {Array.from({ length: 6 }, (_, i) => (
          <li key={i} className="flex items-center gap-2 py-2">
            <div className="h-4 bg-gray-200 rounded-full w-20"></div>
            <div className="h-3 w-3 bg-gray-200 rounded"></div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Carousel skeleton
export const CarouselSkeleton = () => {
  return (
    <div className="relative animate-pulse">
      <div className="w-full aspect-[16/6] bg-gray-200 rounded-lg"></div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 w-8 h-8 bg-gray-300 rounded-full"></div>
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 w-8 h-8 bg-gray-300 rounded-full"></div>
    </div>
  )
}

// Marquee skeleton
export const MarqueeSkeleton = () => {
  return (
    <div className="bg-[#F25E26] p-4 animate-pulse">
      <div className="p-2 px-5">
        <div className="h-4 bg-orange-200 rounded-full w-full"></div>
      </div>
    </div>
  )
}
