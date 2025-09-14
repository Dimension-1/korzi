export default function Loading() {
  return (
    <>
      <div className="min-h-screen bg-[var(--background)]">
        <div className="mx-auto px-6 md:px-24 py-16 md:py-24">
          {/* Header Image Skeleton */}
          <div className="w-full h-[406px] md:h-[530px] mb-6 rounded-none bg-gray-300 animate-pulse"></div>

          {/* Date Skeleton */}
          <div className="flex justify-end mb-2">
            <div className="h-4 w-24 bg-gray-300 animate-pulse rounded"></div>
          </div>

          {/* Title Skeleton */}
          <div className="h-8 md:h-12 bg-gray-300 animate-pulse rounded mb-8 max-w-4xl"></div>

          {/* Content Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-300 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-300 animate-pulse rounded w-3/4"></div>
            </div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-300 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-300 animate-pulse rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
