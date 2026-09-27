/**
 * Server-side input validation and sanitization.
 * Prevents unbounded inputs, validates types, and enforces bounds.
 */

import { z } from "zod";

/**
 * Admin login credentials must be bounded, non-empty strings.
 * Never echo credentials back to client.
 */
export const AdminLoginSchema = z.object({
  username: z.string().trim().min(1).max(128),
  password: z.string().min(1).max(256).refine(value => value.trim().length > 0, "Password is required"),
});

export type AdminLoginInput = z.infer<typeof AdminLoginSchema>;

/**
 * Validate and parse admin login input.
 * Throws on invalid structure or bounds violation.
 */
export function validateAdminLogin(input: unknown): AdminLoginInput {
  return AdminLoginSchema.parse(input);
}

/**
 * Format Zod validation errors without exposing internal structure details.
 */
export function formatValidationError(error: unknown): { field: string; message: string }[] {
  if (error instanceof z.ZodError) {
    return error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
  }
  return [];
}

/**
 * Create a safe error response that never leaks credentials or internal structure.
 */
export function createSafeErrorResponse(message: string): Record<string, unknown> {
  return { error: message };
}
