// components/auth/AuthGuard.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean; // If false, redirects authenticated users (for login/signup pages)
  fallback?: React.ReactNode;
}

export default function AuthGuard({ 
  children, 
  requireAuth = true,
  fallback = <div className="flex items-center justify-center min-h-screen">Loading...</div>
}: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !user) {
        // User needs to be authenticated but isn't
        router.push('/signin');
      } else if (!requireAuth && user) {
        // User is authenticated but shouldn't be (on login/signup page)
        router.push('/dashboard');
      }
    }
  }, [user, isLoading, requireAuth, router]);

  if (isLoading) {
    return <>{fallback}</>;
  }

  if (requireAuth && !user) {
    return <>{fallback}</>;
  }

  if (!requireAuth && user) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Higher Order Component version
export function withAuthGuard<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: { requireAuth?: boolean } = {}
) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  
  const WithAuthGuardComponent = (props: P) => {
    return (
      <AuthGuard requireAuth={options.requireAuth}>
        <WrappedComponent {...props} />
      </AuthGuard>
    );
  };

  WithAuthGuardComponent.displayName = `withAuthGuard(${displayName})`;
  return WithAuthGuardComponent;
}