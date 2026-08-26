import { describe, expect, it } from "vitest";
import { resolveHmrPort } from "./vite";

describe("resolveHmrPort", () => {
  it("uses the preview port supplied by the development environment", () => {
    expect(resolveHmrPort("3000")).toBe(3000);
  });

  it("falls back safely when a port is missing or invalid", () => {
    expect(resolveHmrPort(undefined)).toBe(3000);
    expect(resolveHmrPort("0")).toBe(3000);
    expect(resolveHmrPort("70000")).toBe(3000);
    expect(resolveHmrPort("not-a-port")).toBe(3000);
  });
});
