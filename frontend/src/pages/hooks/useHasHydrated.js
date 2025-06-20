import { useState, useEffect } from 'react';

/**
 * A custom hook that returns true once the component has been hydrated on the client.
 * This is useful for avoiding server-client mismatches and hydration errors when
 * using persisted state (e.g., from Zustand with local storage).
 */
export const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after the initial render.
    // By setting hasHydrated to true, we signal that the client-side
    // logic is now in control and any persisted state should be available.
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};