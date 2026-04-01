import Link from 'next/link';
import { ROUTES } from '@/app/routes';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg text-gray-600">Page not found</p>
      <p className="text-sm text-gray-500 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href={ROUTES.home.path}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go back home
      </Link>
    </div>
  );
}
