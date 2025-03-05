'use client';

import { useEffect, useState } from 'react';
import { useFlags } from 'launchdarkly-react-client-sdk';

interface VisitorCounterProps {
  className?: string;
}

export default function VisitorCounter({ className = '' }: VisitorCounterProps) {
  const [count, setCount] = useState<number>(0);
  const { visitorCounter } = useFlags();

  useEffect(() => {
    // Only fetch and update the count if the feature flag is enabled
    if (visitorCounter) {
      // Simple implementation that increments a counter in localStorage
      // In a real-world scenario, you'd likely use an API to track visitors
      const getAndIncrementCount = () => {
        const storedCount = localStorage.getItem('visitorCount');
        const currentCount = storedCount ? parseInt(storedCount, 10) : 0;
        const newCount = currentCount + 1;
        localStorage.setItem('visitorCount', newCount.toString());
        setCount(newCount);
      };

      getAndIncrementCount();
    }
  }, [visitorCounter]);

  // Don't render anything if the feature flag is disabled
  if (!visitorCounter) {
    return null;
  }

  return (
    <div className={`fixed bottom-4 right-4 bg-slate-800 text-white px-3 py-1 rounded-lg text-sm shadow-lg ${className}`}>
      Visitors: {count}
    </div>
  );
}