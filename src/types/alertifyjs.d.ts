declare module 'alertifyjs' {
    export function alert(Message: string): void;
    export function confirm(Message: string, onok: () => void, oncancel?: () => void): void;
    export function prompt(Message: string, value: string, onok: (str: string) => void, oncancel?: () => void): void;
    export function success(Message: string, delay?: number): void;
    export function error(Message: string, delay?: number): void;
    export function warning(Message: string, delay?: number): void;
    export function Message(Message: string, delay?: number): void;
  
    export function dismissAll(): void;
  
    export interface AlertifyOptions {
      delay?: number;
      label?: {
        ok?: string;
        cancel?: string;
      };
      buttonFocus?: 'ok' | 'cancel';
      transition?: 'pulse' | 'fade' | 'slide';
    }
  
    export function set(options: AlertifyOptions): void;
  
    const alertify: {
      alert: typeof alert;
      confirm: typeof confirm;
      prompt: typeof prompt;
      success: typeof success;
      error: typeof error;
      warning: typeof warning;
      Message: typeof Message;
      dismissAll: typeof dismissAll;
      set: typeof set;
    };
  
    export default alertify;
  }
  