import { useToast as useToastContext } from '../contexts/ToastContext';

// Re-export for convenience and consistency
export const useToast = useToastContext;

// Helper functions for common toast types with AlertifyJS integration
export const useToastHelpers = () => {
  const { addToast} = useToastContext();

  return {
    // Original toast methods (using custom toast system)
    success: (message: string, options?: { duration?: number; action?: { label: string; onClick: () => void } }) => 
      addToast(message, 'success', options),
    
    error: (message: string, options?: { duration?: number; action?: { label: string; onClick: () => void } }) => 
      addToast(message, 'error', options),
    
    warning: (message: string, options?: { duration?: number; action?: { label: string; onClick: () => void } }) => 
      addToast(message, 'warning', options),
    
    info: (message: string, options?: { duration?: number; action?: { label: string; onClick: () => void } }) => 
      addToast(message, 'info', options),

  };
};