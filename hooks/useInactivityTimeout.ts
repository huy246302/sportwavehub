import { useEffect, useRef } from 'react';

const useInactivityTimeout = (callback: () => void, delay: number = 30000) => {
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleInactivity = () => {
      callback();
    };

    const resetInactivityTimeout = () => {
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
      inactivityTimeoutRef.current = setTimeout(handleInactivity, delay);
    };

    document.addEventListener('mousemove', resetInactivityTimeout);
    document.addEventListener('keypress', resetInactivityTimeout);
    document.addEventListener('click', resetInactivityTimeout);

    // Set initial timeout
    resetInactivityTimeout();

    return () => {
      document.removeEventListener('mousemove', resetInactivityTimeout);
      document.removeEventListener('keypress', resetInactivityTimeout);
      document.removeEventListener('click', resetInactivityTimeout);
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
    };
  }, [callback, delay]);
};

export default useInactivityTimeout;
