import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import 'alertifyjs/build/css/themes/default.css';

// Configure AlertifyJS defaults
alertify.defaults = {
  ...alertify.defaults,
  theme: {
    input: 'ajs-input',
    ok: 'ajs-ok',
    cancel: 'ajs-cancel'
  },
  transition: 'slide',
  resizable: true,
  maximizable: true,
  pinnable: true,
  pinned: false,
  padding: true,
  modal: true,
  basic: false,
  frameless: false,
  defaultFocusOff: false,
  maintainFocus: true,
  maximizeSpeed: 300,
  glossy: false,
  closable: true,
  closableByDimmer: true,
  invokeOnCloseOff: false,
  autoReset: true,
  notifier: {
    delay: 5,
    position: 'top-right',
    closeButton: true
  },
  moveBounded: true,
  moveSpeed: 300
};

// Custom styling for AlertifyJS to match our design system
const initializeAlertifyStyles = () => {
  // Inject custom CSS for AlertifyJS
  const style = document.createElement('style');
  style.textContent = `
    /* AlertifyJS Custom Styling */
    .alertify .ajs-dialog {
      background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .alertify .ajs-header {
      background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
      border-bottom: 2px solid #e2e8f0;
      border-radius: 10px 10px 0 0;
      padding: 16px 24px;
      font-weight: 600;
      color: #1e293b;
      font-size: 18px;
    }

    .alertify .ajs-body {
      padding: 24px;
      color: #475569;
      font-size: 16px;
      line-height: 1.6;
    }

    .alertify .ajs-footer {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border-top: 1px solid #e2e8f0;
      border-radius: 0 0 10px 10px;
      padding: 16px 24px;
      text-align: right;
    }

    .alertify .ajs-button {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      border: none;
      border-radius: 8px;
      color: white;
      font-weight: 600;
      padding: 10px 20px;
      margin-left: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.3);
      transform: translateY(0);
    }

    .alertify .ajs-button:hover {
      background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
      box-shadow: 0 6px 20px 0 rgba(59, 130, 246, 0.4);
      transform: translateY(-1px);
    }

    .alertify .ajs-button.ajs-cancel {
      background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
      box-shadow: 0 4px 14px 0 rgba(107, 114, 128, 0.3);
    }

    .alertify .ajs-button.ajs-cancel:hover {
      background: linear-gradient(135deg, #4b5563 0%, #374151 100%);
      box-shadow: 0 6px 20px 0 rgba(107, 114, 128, 0.4);
    }

    .alertify .ajs-button.ajs-destructive {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      box-shadow: 0 4px 14px 0 rgba(239, 68, 68, 0.3);
    }

    .alertify .ajs-button.ajs-destructive:hover {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      box-shadow: 0 6px 20px 0 rgba(239, 68, 68, 0.4);
    }

    /* Notification Styling */
    .alertify-notifier .ajs-message {
      background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
      color: #1e293b;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 16px 20px;
      margin-bottom: 8px;
      min-width: 300px;
      max-width: 400px;
    }

    .alertify-notifier .ajs-message.ajs-success {
      background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
      border-left: 4px solid #10b981;
      color: #166534;
    }

    .alertify-notifier .ajs-message.ajs-error {
      background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
      border-left: 4px solid #ef4444;
      color: #991b1b;
    }

    .alertify-notifier .ajs-message.ajs-warning {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      border-left: 4px solid #f59e0b;
      color: #92400e;
    }

    .alertify-notifier .ajs-message.ajs-info {
      background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
      border-left: 4px solid #3b82f6;
      color: #1e40af;
    }

    /* Dimmer styling */
    .alertify .ajs-dimmer {
      background-color: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(4px);
    }

    /* Animation improvements */
    .alertify.ajs-slide.ajs-in {
      animation: ajs-slide-in 0.3s ease-out;
    }

    .alertify.ajs-slide.ajs-out {
      animation: ajs-slide-out 0.3s ease-in;
    }

    @keyframes ajs-slide-in {
      0% {
        transform: translateY(-100px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @keyframes ajs-slide-out {
      0% {
        transform: translateY(0);
        opacity: 1;
      }
      100% {
        transform: translateY(-100px);
        opacity: 0;
      }
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .alertify .ajs-dialog {
        width: 90% !important;
        max-width: 400px !important;
      }
      
      .alertify-notifier .ajs-message {
        min-width: 280px;
        max-width: 320px;
      }
    }
      
  `;
  document.head.appendChild(style);
};

// Initialize styles when component is imported
initializeAlertifyStyles();

export interface ConfirmationOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'default' | 'destructive' | 'warning';
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
}

export class ConfirmationModal {
  static show({
    title = 'Confirm Action',
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'default',
    onConfirm,
    onCancel
  }: ConfirmationOptions): Promise<boolean> {
    return new Promise((resolve) => {
      // Force AlertifyJS to create a fresh instance
      alertify.confirm().destroy();
      
      const dialog = alertify.confirm(title, message);
      
      // Customize button text
      dialog.set('labels', { ok: confirmText, cancel: cancelText });
      
      // Use setTimeout to ensure DOM is ready and prevent race conditions
      dialog.set('onshow', function(this: any) {
        setTimeout(() => {
          try {
            // Get the dialog element
            const dialogElement = this.elements.dialog;
            
            // Remove any existing duplicate buttons
            const existingButtons = dialogElement.querySelectorAll('.ajs-button');
            existingButtons.forEach((btn: Element, index: number) => {
              if (index >= 2) { // Keep only first 2 buttons
                btn.remove();
              }
            });
            
            // Get the buttons after cleanup
            const buttons = dialogElement.querySelectorAll('.ajs-button');
            const okButton = buttons[0] as HTMLElement; // First button is OK
            const cancelButton = buttons[1] as HTMLElement; // Second button is Cancel
            
            if (okButton && cancelButton) {
              // Reset button classes completely
              okButton.className = 'ajs-button ajs-ok';
              cancelButton.className = 'ajs-button ajs-cancel';
              
              // Set button text
              okButton.textContent = confirmText;
              cancelButton.textContent = cancelText;
              
              // Add type-specific classes
              if (type === 'destructive') {
                okButton.classList.add('ajs-destructive');
              }
              
              // Mark as processed to prevent re-processing
              okButton.setAttribute('data-processed', 'true');
              cancelButton.setAttribute('data-processed', 'true');
            }
          } catch (error) {
            console.error('Error styling AlertifyJS buttons:', error);
          }
        }, 10); // Small delay to ensure DOM is ready
      });
      
      // Clean up on close
      dialog.set('onclose', function(this: any) {
        try {
          const dialogElement = this.elements.dialog;
          const buttons = dialogElement.querySelectorAll('.ajs-button');
          buttons.forEach((btn: Element) => {
            btn.removeAttribute('data-processed');
          });
        } catch (error) {
          console.error('Error cleaning up AlertifyJS:', error);
        }
      });
      
      dialog.set('onok', async function() {
        try {
          if (onConfirm) {
            await onConfirm();
          }
          resolve(true);
        } catch (error) {
          console.error('Error in confirmation callback:', error);
          resolve(false);
        }
      });
      
      dialog.set('oncancel', function() {
        if (onCancel) {
          onCancel();
        }
        resolve(false);
      });
    });
  }

  static showDestructive(options: Omit<ConfirmationOptions, 'type'>): Promise<boolean> {
    return this.show({
      ...options,
      type: 'destructive',
      confirmText: options.confirmText || 'Delete',
      title: options.title || 'Confirm Deletion'
    });
  }

  static showWarning(options: Omit<ConfirmationOptions, 'type'>): Promise<boolean> {
    return this.show({
      ...options,
      type: 'warning',
      confirmText: options.confirmText || 'Proceed',
      title: options.title || 'Warning'
    });
  }
}

// Export for backward compatibility
export default ConfirmationModal;