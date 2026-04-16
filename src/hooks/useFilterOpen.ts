import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Manages the filter-modal open state, auto-opening it when the URL
 * contains `?openFilters=true` (set by cross-page deal-type navigation).
 */
export function useFilterOpen(): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [searchParams, setSearchParams] = useSearchParams();
  const shouldOpen = searchParams.get('openFilters') === 'true';

  const [filterOpen, setFilterOpen] = useState(shouldOpen);

  useEffect(() => {
    if (shouldOpen) {
      setFilterOpen(true);
      searchParams.delete('openFilters');
      setSearchParams(searchParams, { replace: true });
    }
  }, [shouldOpen, searchParams, setSearchParams]);

  return [filterOpen, setFilterOpen];
}
