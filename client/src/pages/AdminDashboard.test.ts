import { describe, expect, it } from "vitest";
import { seedPayload } from "./AdminDashboard";

describe("seedPayload", () => {
  it("prépare le catalogue existant pour un import Supabase bilingue", () => {
    const first = seedPayload()[0];
    expect(first).toMatchObject({ status: "published", availability_status: "on_request" });
    expect(first.price_label_en).toBeTruthy();
  });
});
