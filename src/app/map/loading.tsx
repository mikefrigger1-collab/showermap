import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import { SkeletonMap } from '../components/Skeleton';

export default function MapLoading() {
  return (
    <>
      <GlobalHeader />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Region selector skeleton */}
          <div className="bg-white rounded-lg border p-6 mb-6">
            <div className="flex flex-col items-center text-center">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-64 mb-4" />
                <div className="flex gap-2 mb-4">
                  <div className="h-10 bg-gray-200 rounded-lg w-20" />
                  <div className="h-10 bg-gray-200 rounded-lg w-16" />
                  <div className="h-10 bg-gray-200 rounded-lg w-24" />
                </div>
                <div className="h-10 bg-gray-200 rounded w-64 mb-4" />
                <div className="h-10 bg-gray-200 rounded-lg w-40" />
              </div>
            </div>
          </div>

          {/* Map skeleton */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filter sidebar skeleton */}
            <div className="lg:w-80">
              <div className="bg-white rounded-lg border p-4">
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-24 mb-4" />
                  <div className="h-10 bg-gray-200 rounded w-full" />
                  <div className="h-10 bg-gray-200 rounded w-full" />
                  <div className="h-10 bg-gray-200 rounded w-full" />
                  <div className="h-6 bg-gray-200 rounded w-32" />
                </div>
              </div>
            </div>

            {/* Main content skeleton */}
            <div className="flex-1">
              <div className="bg-white rounded-lg border p-4 mb-6">
                <div className="animate-pulse flex justify-between items-center">
                  <div>
                    <div className="h-6 bg-gray-200 rounded w-48 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-32" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 w-8 bg-gray-200 rounded" />
                    <div className="h-8 w-8 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
              <SkeletonMap />
            </div>
          </div>
        </div>
      </main>
      <GlobalFooter />
    </>
  );
}
