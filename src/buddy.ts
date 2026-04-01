import type { Buddy, BuddyStats, BuddyStatsWithPercentiles, Rarity, Species } from "./types.js";
import { generateSoul } from "./soul.js";

const SPECIES: Species[] = [
  "duck", "goose", "blob", "cat", "dragon",
  "octopus", "owl", "penguin", "turtle", "snail",
  "ghost", "axolotl", "capybara", "cactus", "robot",
  "rabbit", "mushroom", "chonk",
];

const RARITIES: { name: Rarity; weight: number }[] = [
  { name: "Common", weight: 50 },
  { name: "Uncommon", weight: 30 },
  { name: "Rare", weight: 15 },
  { name: "Epic", weight: 4 },
  { name: "Legendary", weight: 1 },
];

export function mulberry32(seed: number): () => number {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash;
}

function pickRarity(rand: () => number): Rarity {
  const roll = rand() * 100;
  let cumulative = 0;
  for (const r of RARITIES) {
    cumulative += r.weight;
    if (roll < cumulative) return r.name;
  }
  return "Common";
}

function generateStat(rand: () => number, rarity: Rarity): number {
  const base = Math.floor(rand() * 100) + 1;
  const bonus =
    rarity === "Legendary" ? 20
    : rarity === "Epic" ? 10
    : rarity === "Rare" ? 5
    : 0;
  return Math.min(100, base + bonus);
}

export function deriveBuddy(userId: string): Buddy {
  const seed = hashString(userId);
  const rand = mulberry32(seed);

  const species = SPECIES[Math.floor(rand() * SPECIES.length)];
  const rarity = pickRarity(rand);
  const shiny = rand() < 0.01;

  const stats: BuddyStats = {
    debugging: generateStat(rand, rarity),
    patience: generateStat(rand, rarity),
    chaos: generateStat(rand, rarity),
    wisdom: generateStat(rand, rarity),
    snark: generateStat(rand, rarity),
  };

  const soul = generateSoul(species, stats);

  return { species, rarity, shiny, stats, soul };
}

export function deriveBuddyFromSeed(seed: number): Buddy {
  const rand = mulberry32(seed);

  const species = SPECIES[Math.floor(rand() * SPECIES.length)];
  const rarity = pickRarity(rand);
  const shiny = rand() < 0.01;

  const stats: BuddyStats = {
    debugging: generateStat(rand, rarity),
    patience: generateStat(rand, rarity),
    chaos: generateStat(rand, rarity),
    wisdom: generateStat(rand, rarity),
    snark: generateStat(rand, rarity),
  };

  const soul = generateSoul(species, stats);

  return { species, rarity, shiny, stats, soul };
}

/**
 * Compute percentile rankings for stats.
 * Uses a simple model: uniform distribution baseline 1-100,
 * so a stat of N is roughly at the Nth percentile.
 */
export function getStatsWithPercentiles(stats: BuddyStats): BuddyStatsWithPercentiles {
  return {
    debugging: { value: stats.debugging, percentile: stats.debugging },
    patience: { value: stats.patience, percentile: stats.patience },
    chaos: { value: stats.chaos, percentile: stats.chaos },
    wisdom: { value: stats.wisdom, percentile: stats.wisdom },
    snark: { value: stats.snark, percentile: stats.snark },
  };
}
