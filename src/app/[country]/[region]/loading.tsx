import GlobalHeader from '../../components/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';
import { SkeletonHero, SkeletonLocationGrid } from '../../components/Skeleton';

export default function RegionLoading() {
  return (
    <div className="min-h-screen bg-white">
      <GlobalHeader />
      <main>
        {/* Breadcrumb skeleton */}
        <nav className="bg-warm-50 py-3 border-b border-warm-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-12" />
              <span className="text-warm-400">/</span>
              <div className="h-4 bg-gray-200 rounded w-8" />
              <span className="text-warm-400">/</span>
              <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
          </div>
        </nav>

        <SkeletonHero />

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-80 mx-auto mb-4" />
              <div className="h-5 bg-gray-200 rounded w-48 mx-auto" />
            </div>
            <SkeletonLocationGrid count={6} />
          </div>
        </section>
      </main>
      <GlobalFooter />
    </div>
  );
}
