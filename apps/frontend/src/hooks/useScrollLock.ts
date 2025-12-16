import { useEffect, useRef } from 'react';

interface useScrollLockParams {
  enabled?: boolean;
}

export const useScrollLock = ({ enabled = false }: useScrollLockParams) => {
  const initialScrollStatus = useRef('');

  useEffect(() => {
    if (enabled) {
      initialScrollStatus.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = initialScrollStatus.current;
    };
  }, [enabled]);
};
