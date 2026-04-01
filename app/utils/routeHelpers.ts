/**
 * Route utility functions for common operations
 * These functions provide helpers for route management and navigation
 */

import type { RoutesConfig } from '@/app/routes';
import { ROUTES } from '@/app/routes';

/**
 * Check if a given path matches any defined route
 */
export function isRouteActive(currentPath: string, routePath: string): boolean {
  return currentPath === routePath;
}

/**
 * Get all available routes as an array
 * Useful for generating navigation menus
 */
export function getAllRoutes(): Array<{
  name: string;
  path: string;
  label: string;
}> {
  return Object.values(ROUTES).filter((route) => route.name !== 'notFound');
}

/**
 * Parse URL parameters from a query string
 */
export function parseQueryParams(
  searchParams: URLSearchParams
): Record<string, string> {
  const params: Record<string, string> = {};

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
}

/**
 * Type-safe wrapper for Next.js Link component route validation
 */
export function getValidRoutePath(routeName: keyof RoutesConfig): string {
  const route = ROUTES[routeName];

  if (!route) {
    throw new Error(`Invalid route name: ${String(routeName)}`);
  }

  return route.path;
}
