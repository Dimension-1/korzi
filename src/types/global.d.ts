// src/global.d.ts
export {};

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      action: string | Date,
      params?: Record<string, unknown>
    ) => void;
  }
}
