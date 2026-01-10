import { Home, Search, MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import GlobalHeader from './components/GlobalHeader';
import GlobalFooter from './components/GlobalFooter';

export default function NotFound() {
  return (
    <>
      <GlobalHeader />

      <main className="min-h-[70vh] bg-gradient-to-br from-primary-50 via-secondary-50 to-warm-100 flex items-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* 404 Visual */}
          <div className="mb-8">
            <span className="text-8xl md:text-9xl font-bold text-primary-500/20">404</span>
          </div>

          {/* Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-warm-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-warm-600 mb-8 max-w-md mx-auto">
            Looks like this page took a wrong turn. Don't worry, we'll help you find your way back to clean facilities.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center justify-center btn-primary"
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <Link
              href="/map/"
              className="inline-flex items-center justify-center btn-secondary"
            >
              <MapPin className="h-5 w-5 mr-2" />
              Find Showers
            </Link>
          </div>

          {/* Quick Links */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 max-w-lg mx-auto">
            <h2 className="text-lg font-semibold text-warm-900 mb-4">
              Popular Pages
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/about/"
                className="flex items-center p-3 rounded-xl bg-warm-50 hover:bg-primary-50
                         text-warm-700 hover:text-primary-600 transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2 rotate-[135deg]" />
                About Us
              </Link>
              <Link
                href="/guidelines/"
                className="flex items-center p-3 rounded-xl bg-warm-50 hover:bg-primary-50
                         text-warm-700 hover:text-primary-600 transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2 rotate-[135deg]" />
                Guidelines
              </Link>
              <Link
                href="/contact/"
                className="flex items-center p-3 rounded-xl bg-warm-50 hover:bg-primary-50
                         text-warm-700 hover:text-primary-600 transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2 rotate-[135deg]" />
                Contact
              </Link>
              <Link
                href="/privacy/"
                className="flex items-center p-3 rounded-xl bg-warm-50 hover:bg-primary-50
                         text-warm-700 hover:text-primary-600 transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2 rotate-[135deg]" />
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </main>

      <GlobalFooter />
    </>
  );
}
