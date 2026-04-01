'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ROUTES } from '@/app/routes';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error details for debugging (omit in production if needed)
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p className="text-lg text-gray-600">Something went wrong</p>
      <p className="text-sm text-gray-500 text-center max-w-md">
        {error.message || 'An unexpected error occurred. Try refreshing the page.'}
      </p>
      {error.digest && (
        <p className="text-xs text-gray-400 font-mono mt-2">
          Error ID: {error.digest}
        </p>
      )}
      <div className="flex gap-3 mt-6">
        <button
          onClick={reset}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
        <Link
          href={ROUTES.home.path}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
