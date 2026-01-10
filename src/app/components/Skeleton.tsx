'use client';

// Reusable skeleton components for loading states

export function SkeletonText({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden border border-warm-200 p-6">
      <div className="animate-pulse">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
          <div className="h-8 w-12 bg-gray-200 rounded-lg ml-2" />
        </div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2" />
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-gray-200 rounded-full w-20" />
          <div className="h-6 bg-gray-200 rounded-full w-16" />
        </div>
        <div className="h-10 bg-gray-200 rounded-lg w-full" />
      </div>
    </div>
  );
}

export function SkeletonLocationGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonHero() {
  return (
    <section className="bg-gradient-to-br from-primary-50 via-secondary-50 to-warm-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-pulse">
          <div className="h-10 bg-gray-200/50 rounded w-2/3 mx-auto mb-6" />
          <div className="h-6 bg-gray-200/50 rounded w-1/2 mx-auto mb-8" />
          <div className="h-12 bg-gray-200/50 rounded-lg w-40 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/50 p-6 rounded-2xl">
              <div className="h-8 bg-gray-200 rounded w-16 mx-auto mb-2" />
              <div className="h-4 bg-gray-200 rounded w-24 mx-auto" />
            </div>
            <div className="bg-white/50 p-6 rounded-2xl">
              <div className="h-8 bg-gray-200 rounded w-16 mx-auto mb-2" />
              <div className="h-4 bg-gray-200 rounded w-24 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SkeletonMap() {
  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="p-4 border-b bg-gray-50">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-64" />
        </div>
      </div>
      <div className="h-[600px] bg-gray-100 animate-pulse flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading map...</p>
        </div>
      </div>
    </div>
  );
}

export function SkeletonPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb skeleton */}
      <nav className="bg-warm-50 py-3 border-b border-warm-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-2 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-12" />
            <div className="h-4 bg-gray-200 rounded w-4" />
            <div className="h-4 bg-gray-200 rounded w-16" />
            <div className="h-4 bg-gray-200 rounded w-4" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>
        </div>
      </nav>

      <SkeletonHero />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto" />
          </div>
          <SkeletonLocationGrid count={6} />
        </div>
      </section>
    </div>
  );
}
