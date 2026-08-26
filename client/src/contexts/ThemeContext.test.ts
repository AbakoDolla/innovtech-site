import { describe, expect, it } from "vitest";
import { resolveInitialTheme } from "./ThemeContext";

describe("resolveInitialTheme", () => {
  it("prioritizes an explicit valid theme preview over the remembered visitor preference", () => {
    expect(
      resolveInitialTheme({
        defaultTheme: "light",
        switchable: true,
        search: "?theme=dark",
        storedTheme: "light",
      }),
    ).toBe("dark");
  });

  it("uses a valid remembered preference when no preview parameter is present", () => {
    expect(
      resolveInitialTheme({
        defaultTheme: "light",
        switchable: true,
        search: "",
        storedTheme: "dark",
      }),
    ).toBe("dark");
  });

  it("falls back safely for invalid values or a fixed theme", () => {
    expect(
      resolveInitialTheme({
        defaultTheme: "light",
        switchable: true,
        search: "?theme=neon",
        storedTheme: "unknown",
      }),
    ).toBe("light");
    expect(
      resolveInitialTheme({
        defaultTheme: "dark",
        switchable: false,
        search: "?theme=light",
        storedTheme: "light",
      }),
    ).toBe("dark");
  });
});
