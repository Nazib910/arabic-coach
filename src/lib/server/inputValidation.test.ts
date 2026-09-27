import { test } from "node:test";
import assert from "node:assert/strict";
import { validateAdminLogin, formatValidationError, createSafeErrorResponse } from "./inputValidation";
import { z } from "zod";

test("validateAdminLogin accepts valid credentials", () => {
  const result = validateAdminLogin({
    username: "admin",
    password: "securepassword123",
  });
  assert.equal(result.username, "admin");
  assert.equal(result.password, "securepassword123");
});

test("validateAdminLogin rejects missing fields", () => {
  assert.throws(
    () => validateAdminLogin({ username: "admin" }),
    z.ZodError,
  );
  assert.throws(
    () => validateAdminLogin({ password: "pass" }),
    z.ZodError,
  );
});

test("validateAdminLogin trims usernames but preserves passwords", () => {
  const result = validateAdminLogin({
    username: "  admin  ",
    password: "  pass  ",
  });
  assert.equal(result.username, "admin");
  assert.equal(result.password, "  pass  ");
});

test("validateAdminLogin rejects empty strings after trim", () => {
  assert.throws(()=>validateAdminLogin({username:"admin",password:"   "}),z.ZodError);
  assert.throws(
    () => validateAdminLogin({ username: "   ", password: "pass" }),
    z.ZodError,
  );
});

test("validateAdminLogin enforces username max length", () => {
  const longUsername = "a".repeat(129);
  assert.throws(
    () => validateAdminLogin({ username: longUsername, password: "pass" }),
    z.ZodError,
  );
});

test("validateAdminLogin enforces password max length", () => {
  const longPassword = "a".repeat(257);
  assert.throws(
    () => validateAdminLogin({ username: "admin", password: longPassword }),
    z.ZodError,
  );
});

test("formatValidationError produces readable error objects", () => {
  try {
    validateAdminLogin({ username: "   ", password: "pass" });
    assert.fail("Expected ZodError to be thrown");
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formatted = formatValidationError(error);
      assert.ok(Array.isArray(formatted));
      assert.ok(formatted.length > 0);
      assert.ok(formatted[0].field);
      assert.ok(formatted[0].message);
    } else {
      throw error;
    }
  }
});

test("createSafeErrorResponse returns clean error object", () => {
  const response = createSafeErrorResponse("Invalid input");
  assert.deepEqual(response, { error: "Invalid input" });
  assert.ok(!("username" in response));
  assert.ok(!("password" in response));
});
