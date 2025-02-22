// src/utils/sanitize.ts
export function sanitizeInput(value: string): string {
  // Basic HTML sanitization
  return value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
