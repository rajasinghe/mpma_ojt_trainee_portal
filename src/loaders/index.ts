// Loader utilities and types
export interface LoaderData<T = any> {
  data: T;
  loading: boolean;
  error?: string;
}

// Simulate API delay for realistic loading experience
export const simulateApiDelay = (ms: number = 1000) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Generic loader wrapper for consistent loading states
export const createLoader = <T>(
  loadFn: () => Promise<T>,
  minLoadTime: number = 500
) => {
  return async (): Promise<LoaderData<T>> => {
    const startTime = Date.now();
    
    try {
      const data = await loadFn();
      const elapsed = Date.now() - startTime;
      
      // Ensure minimum loading time for better UX
      if (elapsed < minLoadTime) {
        await new Promise(resolve => setTimeout(resolve, minLoadTime - elapsed));
      }
      
      return { data, loading: false };
    } catch (error) {
      return { 
        data: null as T, 
        loading: false, 
        error: error instanceof Error ? error.message : 'An error occurred' 
      };
    }
  };
};