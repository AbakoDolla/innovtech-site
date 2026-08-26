import { describe, expect, it, vi } from "vitest";
import { revealPageSections } from "./pageVisibility";

describe("revealPageSections", () => {
  it("reveals every page section after a route change", () => {
    const addFirst = vi.fn();
    const addSecond = vi.fn();
    const root = {
      querySelectorAll: vi.fn(() => [
        { classList: { add: addFirst } },
        { classList: { add: addSecond } },
      ]),
    } as unknown as Pick<Document, "querySelectorAll">;

    revealPageSections(root);

    expect(root.querySelectorAll).toHaveBeenCalledWith("main section, main article");
    expect(addFirst).toHaveBeenCalledWith("is-visible");
    expect(addSecond).toHaveBeenCalledWith("is-visible");
  });
});
