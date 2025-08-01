/// <reference types="vite/client" />

export { };

declare global {
  interface Window {
    hljs: {
      highlightElement: (el: HTMLElement) => void;
    };
  }
}