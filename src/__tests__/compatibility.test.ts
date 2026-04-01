import { describe, it, expect } from "vitest";
import { calculateCompatibility } from "../compatibility.js";

describe("calculateCompatibility", () => {
  it("is deterministic for the same user pair", () => {
    const result1 = calculateCompatibility("alice", "bob");
    const result2 = calculateCompatibility("alice", "bob");
    expect(result1.score).toEqual(result2.score);
    expect(result1.analysis).toEqual(result2.analysis);
    expect(result1.synergies).toEqual(result2.synergies);
    expect(result1.conflicts).toEqual(result2.conflicts);
  });

  it("returns a score between 0 and 100", () => {
    const result = calculateCompatibility("user1", "user2");
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it("returns full buddy objects for both users", () => {
    const result = calculateCompatibility("alpha", "beta");
    expect(result.buddyA).toHaveProperty("species");
    expect(result.buddyA).toHaveProperty("stats");
    expect(result.buddyB).toHaveProperty("species");
    expect(result.buddyB).toHaveProperty("stats");
  });

  it("self-compatibility is high", () => {
    const result = calculateCompatibility("same_user", "same_user");
    // Same buddy should have high bond scores
    expect(result.score).toBeGreaterThanOrEqual(50);
  });

  it("returns analysis string", () => {
    const result = calculateCompatibility("test1", "test2");
    expect(typeof result.analysis).toBe("string");
    expect(result.analysis.length).toBeGreaterThan(0);
  });

  it("synergies and conflicts are arrays", () => {
    const result = calculateCompatibility("x", "y");
    expect(Array.isArray(result.synergies)).toBe(true);
    expect(Array.isArray(result.conflicts)).toBe(true);
  });
});
