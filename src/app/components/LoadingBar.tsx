'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function LoadingBar() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const startLoading = useCallback(() => {
    setLoading(true);
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        // Slow down as it progresses
        const increment = Math.max(1, (90 - prev) / 10);
        return Math.min(90, prev + increment);
      });
    }, 100);

    return interval;
  }, []);

  const completeLoading = useCallback(() => {
    setProgress(100);
    setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 200);
  }, []);

  useEffect(() => {
    // Complete loading when route changes
    completeLoading();
  }, [pathname, searchParams, completeLoading]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (link) {
        const href = link.getAttribute('href');
        // Only show loading for internal navigation
        if (href && href.startsWith('/') && !href.startsWith('//')) {
          // Check if it's a different page
          const currentPath = window.location.pathname;
          const targetPath = href.split('?')[0].split('#')[0];

          if (targetPath !== currentPath) {
            interval = startLoading();
          }
        }
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
      if (interval) clearInterval(interval);
    };
  }, [startLoading]);

  if (!loading && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-1">
      {/* Background track */}
      <div className="absolute inset-0 bg-primary-100" />

      {/* Progress bar */}
      <div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 via-primary-400 to-secondary-500 transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          boxShadow: '0 0 10px rgba(230, 106, 77, 0.5), 0 0 5px rgba(230, 106, 77, 0.3)'
        }}
      />

      {/* Animated glow at the end */}
      {loading && (
        <div
          className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"
          style={{ left: `${Math.max(0, progress - 10)}%` }}
        />
      )}
    </div>
  );
}
