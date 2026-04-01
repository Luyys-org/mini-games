# Routing System Documentation

This document describes the type-safe routing system set up in this Next.js application.

## Overview

The routing system provides:
- **Type-safe route definitions** using TypeScript
- **Centralized route configuration** in a single file
- **Helper utilities** for navigation and route validation
- **Custom hooks** for type-safe navigation from components

## File Structure

```
app/
├── routes.ts                 # Central route definitions
├── hooks/
│   └── useNavigation.ts      # Custom navigation hook
├── utils/
│   └── routeHelpers.ts       # Route utility functions
├── error.tsx                 # Global error boundary
├── not-found.tsx             # 404 page
└── ...
```

## Core Concepts

### 1. Route Configuration (`routes.ts`)

All routes are defined in a single, type-safe location:

```typescript
export const ROUTES: RoutesConfig = {
  home: {
    name: 'home',
    path: '/',
    label: 'Home',
  },
};
```

### 2. Type-Safe Navigation

Use the `useNavigation` hook in your components for type-safe navigation:

```typescript
'use client';

import { useNavigation } from '@/app/hooks/useNavigation';

export default function MyComponent() {
  const { navigateTo, push } = useNavigation();

  return (
    <button onClick={() => navigateTo('home')}>
      Go Home (Type-safe)
    </button>
  );
}
```

### 3. Route Helpers

Use the `getValidRoutePath` function with Next.js Link component:

```typescript
import Link from 'next/link';
import { getValidRoutePath } from '@/app/utils/routeHelpers';

export function Navigation() {
  return (
    <Link href={getValidRoutePath('home')}>
      Home
    </Link>
  );
}
```

## Best Practices

### ✅ Do

- **Use `ROUTES` constant** instead of hardcoding paths
- **Use `useNavigation` hook** for programmatic navigation
- **Type route names** as `keyof RoutesConfig` for autocomplete
- **Use Link component** from Next.js for static routes
- **Validate routes** before navigation

### ❌ Don't

- **Hardcode paths** like `/home` or `/about`
- **Use `<a>` tags** for internal navigation (use `<Link>` instead)
- **Perform navigation** in route change listeners without validation

## Adding New Routes

### Step 1: Define the Route in `routes.ts`

```typescript
export type RoutesConfig = {
  readonly root: Route;
  readonly home: Route;
  readonly dashboard: Route;  // Add new route
  readonly notFound: Route;
};

export const ROUTES: RoutesConfig = {
  root: { /* ... */ },
  home: { /* ... */ },
  dashboard: {              // Add route definition
    name: 'dashboard',
    path: '/dashboard',
    label: 'Dashboard',
  },
  notFound: { /* ... */ },
};
```

### Step 2: Create the Page Component

```bash
# Create the page directory
mkdir -p app/pages/dashboard

# Create page.tsx in that directory
```

## Navigation Examples

### Programmatic Navigation (Client Components)

```typescript
'use client';

import { useNavigation } from '@/app/hooks/useNavigation';

export function DashboardButton() {
  const { navigateTo } = useNavigation();

  return (
    <button onClick={() => navigateTo('dashboard')}>
      Go to Dashboard
    </button>
  );
}
```

### With Query Parameters

```typescript
const { navigateTo } = useNavigation();

navigateTo('dashboard', { tab: 'overview', sort: 'recent' });
// Navigates to: /dashboard?tab=overview&sort=recent
```

### Using Link Component (Server & Client)

```typescript
import Link from 'next/link';
import { getValidRoutePath } from '@/app/utils/routeHelpers';

export function Navigation() {
  return (
    <nav>
      <Link href={getValidRoutePath('home')}>Home</Link>
      <Link href={getValidRoutePath('dashboard')}>Dashboard</Link>
    </nav>
  );
}
```

## Error Handling

The application includes:

- **`error.tsx`**: Global error boundary for handling runtime errors
- **`not-found.tsx`**: Custom 404 page for undefined routes

Both pages use the routing system to link back to valid routes, ensuring users can always navigate.

## Type Safety Benefits

With this setup, you get:

1. **Autocomplete** for route names in your IDE
2. **Compile-time errors** if you reference non-existent routes
3. **Centralized route changes** - update paths in one place
4. **Refactoring confidence** - rename routes without breaking links

## Next Steps

1. Add more routes to `routes.ts` as your application grows
2. Create corresponding page components in `app/pages/`
3. Use `useNavigation` and `getValidRoutePath` throughout your components
4. Keep route names in sync with your page structure
