'use client';

import { useRouter as useNextRouter } from 'next/navigation';
import type { RoutesConfig } from '@/app/routes';
import { ROUTES, buildRoute } from '@/app/routes';

/**
 * Custom hook for type-safe navigation
 * Wraps Next.js router with route type safety
 */
export function useNavigation() {
  const router = useNextRouter();

  return {
    push: (path: string) => router.push(path),
    replace: (path: string) => router.replace(path),
    refresh: () => router.refresh(),
    back: () => router.back(),
    forward: () => router.forward(),
    prefetch: (path: string) => router.prefetch(path),
    navigateTo: (routeName: keyof RoutesConfig, params?: Record<string, string | number | boolean>) => {
      const route = ROUTES[routeName];
      if (!route) {
        console.warn(`Route '${String(routeName)}' not found`);
        return;
      }
      const path = buildRoute(route.path, params);
      router.push(path);
    },
  };
}
