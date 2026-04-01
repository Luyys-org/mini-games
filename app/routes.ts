/**
 * Central routing configuration for type-safe route management.
 * Provides a single source of truth for all application routes.
 */

export type Route = {
  readonly name: string;
  readonly path: string;
  readonly label: string;
};

export type RoutesConfig = {
  readonly root: Route;
  readonly home: Route;
  readonly notFound: Route;
};

/**
 * Type-safe route definitions
 * Use these constants instead of hardcoding path strings throughout the app
 */
export const ROUTES: RoutesConfig = {
  root: {
    name: "root",
    path: "/",
    label: "Home",
  },
  home: {
    name: "home",
    path: "/",
    label: "Home",
  },
  notFound: {
    name: "notFound",
    path: "/not-found",
    label: "Not Found",
  },
} as const;

/**
 * Helper function to construct paths with query parameters
 * @param path - The route path
 * @param params - Optional query parameters
 * @returns Formatted URL string
 */
export function buildRoute(
  path: string,
  params?: Record<string, string | number | boolean>
): string {
  if (!params || Object.keys(params).length === 0) {
    return path;
  }

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, String(value));
  });

  return `${path}?${searchParams.toString()}`;
}

/**
 * Type guard to check if a route is valid
 * @param routeName - The route name to validate
 * @returns boolean indicating if the route exists
 */
export function isValidRoute(routeName: string): boolean {
  return Object.values(ROUTES).some((route) => route.name === routeName);
}

/**
 * Get a route by name with type safety
 * @param routeName - The name of the route
 * @returns The route configuration or undefined
 */
export function getRouteByName(
  routeName: keyof RoutesConfig
): Route | undefined {
  return ROUTES[routeName];
}
