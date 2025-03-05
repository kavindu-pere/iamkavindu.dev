'use client';

import React from 'react';
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';
import { ReactNode } from 'react';

interface LaunchDarklyProviderProps {
  children: ReactNode;
}

export function LaunchDarklyProvider({ children }: LaunchDarklyProviderProps) {
  // We need to use React.useState instead of the useState hook here
  // since this component gets rendered on the server first
  const [LDProvider, setLDProvider] = React.useState<React.ComponentType<{ children: ReactNode }> | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    // Initialize Launch Darkly asynchronously
    let isMounted = true;
    
    const initLD = async () => {
      try {
        // Use environment variable for client ID
        const clientSideID = process.env.NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID || '';
        
        if (!clientSideID) {
          console.warn('LaunchDarkly client ID not found in environment variables');
        }
        
        const LDProviderWithConfig = await asyncWithLDProvider({
          clientSideID,
          options: {
            // Set initial flags if needed
            bootstrap: {
              visitorCounter: false
            }
          },
          reactOptions: {
            useCamelCaseFlagKeys: true,
          }
        });
        
        if (isMounted) {
          setLDProvider(() => LDProviderWithConfig);
        }
      } catch (err) {
        console.error('Failed to initialize LaunchDarkly', err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to initialize LaunchDarkly'));
        }
      }
    };

    initLD();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle loading state
  if (!LDProvider) {
    return <>{children}</>;
  }

  // Handle error state
  if (error) {
    console.error('LaunchDarkly initialization failed:', error);
    return <>{children}</>;
  }

  return <LDProvider>{children}</LDProvider>;
}