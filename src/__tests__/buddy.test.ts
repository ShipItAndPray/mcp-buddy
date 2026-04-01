import { describe, it, expect } from "vitest";
import { deriveBuddy, deriveBuddyFromSeed, hashString, mulberry32, getStatsWithPercentiles } from "../buddy.js";

describe("mulberry32", () => {
  it("produces deterministic output for the same seed", () => {
    const rng1 = mulberry32(42);
    const rng2 = mulberry32(42);
    const results1 = Array.from({ length: 10 }, () => rng1());
    const results2 = Array.from({ length: 10 }, () => rng2());
    expect(results1).toEqual(results2);
  });

  it("produces values between 0 and 1", () => {
    const rng = mulberry32(12345);
    for (let i = 0; i < 100; i++) {
      const val = rng();
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThan(1);
    }
  });

  it("different seeds produce different sequences", () => {
    const rng1 = mulberry32(1);
    const rng2 = mulberry32(2);
    const val1 = rng1();
    const val2 = rng2();
    expect(val1).not.toEqual(val2);
  });
});

describe("hashString", () => {
  it("produces deterministic hash", () => {
    expect(hashString("test")).toEqual(hashString("test"));
  });

  it("produces different hashes for different strings", () => {
    expect(hashString("alice")).not.toEqual(hashString("bob"));
  });

  it("handles empty string", () => {
    expect(hashString("")).toEqual(0);
  });
});

describe("deriveBuddy", () => {
  it("is deterministic — same user ID always gives same buddy", () => {
    const buddy1 = deriveBuddy("testuser123");
    const buddy2 = deriveBuddy("testuser123");
    expect(buddy1).toEqual(buddy2);
  });

  it("different user IDs produce different buddies", () => {
    const buddyA = deriveBuddy("alice");
    const buddyB = deriveBuddy("bob");
    // Very unlikely to be identical
    expect(buddyA.species === buddyB.species && buddyA.stats.debugging === buddyB.stats.debugging).toBe(false);
  });

  it("returns a valid buddy object", () => {
    const buddy = deriveBuddy("testuser");
    expect(buddy).toHaveProperty("species");
    expect(buddy).toHaveProperty("rarity");
    expect(buddy).toHaveProperty("shiny");
    expect(buddy).toHaveProperty("stats");
    expect(buddy).toHaveProperty("soul");
    expect(typeof buddy.species).toBe("string");
    expect(["Common", "Uncommon", "Rare", "Epic", "Legendary"]).toContain(buddy.rarity);
    expect(typeof buddy.shiny).toBe("boolean");
    expect(buddy.stats.debugging).toBeGreaterThanOrEqual(1);
    expect(buddy.stats.debugging).toBeLessThanOrEqual(100);
    expect(buddy.stats.patience).toBeGreaterThanOrEqual(1);
    expect(buddy.stats.patience).toBeLessThanOrEqual(100);
    expect(buddy.stats.chaos).toBeGreaterThanOrEqual(1);
    expect(buddy.stats.chaos).toBeLessThanOrEqual(100);
    expect(buddy.stats.wisdom).toBeGreaterThanOrEqual(1);
    expect(buddy.stats.wisdom).toBeLessThanOrEqual(100);
    expect(buddy.stats.snark).toBeGreaterThanOrEqual(1);
    expect(buddy.stats.snark).toBeLessThanOrEqual(100);
    expect(typeof buddy.soul).toBe("string");
    expect(buddy.soul.length).toBeGreaterThan(0);
  });

  it("soul description contains the species name", () => {
    const buddy = deriveBuddy("soultest");
    expect(buddy.soul.toLowerCase()).toContain(buddy.species);
  });
});

describe("deriveBuddyFromSeed", () => {
  it("is deterministic for the same seed", () => {
    const buddy1 = deriveBuddyFromSeed(99999);
    const buddy2 = deriveBuddyFromSeed(99999);
    expect(buddy1).toEqual(buddy2);
  });

  it("returns a valid buddy", () => {
    const buddy = deriveBuddyFromSeed(42);
    expect(buddy).toHaveProperty("species");
    expect(buddy).toHaveProperty("soul");
  });
});

describe("getStatsWithPercentiles", () => {
  it("returns percentile data for each stat", () => {
    const buddy = deriveBuddy("percentile-test");
    const result = getStatsWithPercentiles(buddy.stats);
    expect(result.debugging.value).toBe(buddy.stats.debugging);
    expect(result.debugging.percentile).toBe(buddy.stats.debugging);
    expect(result.patience.value).toBe(buddy.stats.patience);
    expect(result.chaos.value).toBe(buddy.stats.chaos);
    expect(result.wisdom.value).toBe(buddy.stats.wisdom);
    expect(result.snark.value).toBe(buddy.stats.snark);
  });
});
