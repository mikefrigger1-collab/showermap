import GlobalHeader from '../../../components/GlobalHeader';
import GlobalFooter from '../../../components/GlobalFooter';

export default function LocationLoading() {
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
              <div className="h-4 bg-gray-200 rounded w-20" />
              <span className="text-warm-400">/</span>
              <div className="h-4 bg-gray-200 rounded w-32" />
            </div>
          </div>
        </nav>

        {/* Hero skeleton */}
        <section className="bg-gradient-to-br from-primary-50 via-secondary-50 to-warm-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left column - details */}
              <div className="animate-pulse">
                <div className="h-10 bg-gray-200/50 rounded w-3/4 mb-4" />
                <div className="h-6 bg-gray-200/50 rounded w-1/2 mb-6" />

                <div className="bg-white rounded-2xl p-6 shadow-card mb-6">
                  <div className="h-6 bg-gray-200 rounded w-32 mb-4" />
                  <div className="space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-full" />
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-5 bg-gray-200 rounded w-2/3" />
                    <div className="h-5 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-12 bg-gray-200/50 rounded-lg flex-1" />
                  <div className="h-12 bg-gray-200/50 rounded-lg flex-1" />
                </div>
              </div>

              {/* Right column - map placeholder */}
              <div className="animate-pulse">
                <div className="h-80 bg-gray-200/50 rounded-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Content skeleton */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-gray-200 rounded w-48 mb-6" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
        </section>
      </main>
      <GlobalFooter />
    </div>
  );
}
