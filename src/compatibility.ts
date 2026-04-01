import type { Buddy, BuddyStats, CompatibilityResult } from "./types.js";
import { deriveBuddy } from "./buddy.js";

type StatName = keyof BuddyStats;
const STAT_NAMES: StatName[] = ["debugging", "patience", "chaos", "wisdom", "snark"];

/**
 * Compatibility is based on stat complementarity:
 * - Complementary stats (one high where other is low) create synergy
 * - Similar extreme stats create bonds
 * - Opposing chaos levels create conflict
 */
export function calculateCompatibility(userIdA: string, userIdB: string): CompatibilityResult {
  const buddyA = deriveBuddy(userIdA);
  const buddyB = deriveBuddy(userIdB);

  const synergies: string[] = [];
  const conflicts: string[] = [];

  let complementScore = 0;
  let bondScore = 0;

  for (const stat of STAT_NAMES) {
    const a = buddyA.stats[stat];
    const b = buddyB.stats[stat];
    const diff = Math.abs(a - b);

    // Complementary: one covers the other's weakness
    if (diff > 40) {
      const high = a > b ? userIdA : userIdB;
      const low = a > b ? userIdB : userIdA;
      synergies.push(
        `${high}'s ${buddyA.species} compensates for ${low}'s ${buddyB.species} in ${stat} (${Math.max(a, b)} vs ${Math.min(a, b)})`
      );
      complementScore += diff * 0.5;
    }

    // Bond: both are strong in the same stat
    if (a > 70 && b > 70) {
      synergies.push(
        `Both buddies share high ${stat} (${a} & ${b}) — a powerful resonance`
      );
      bondScore += Math.min(a, b) * 0.3;
    }

    // Conflict: both extreme but opposite
    if ((a > 80 && b < 30) || (b > 80 && a < 30)) {
      conflicts.push(
        `Tension in ${stat}: one buddy has ${Math.max(a, b)} while the other has ${Math.min(a, b)}`
      );
    }
  }

  // Species synergy bonus
  const speciesMatch = buddyA.species === buddyB.species;
  if (speciesMatch) {
    synergies.push(`Same species (${buddyA.species})! Instant kinship.`);
    bondScore += 15;
  }

  // Rarity difference penalty/bonus
  const rarityOrder = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];
  const rarityDiff = Math.abs(
    rarityOrder.indexOf(buddyA.rarity) - rarityOrder.indexOf(buddyB.rarity)
  );
  if (rarityDiff >= 3) {
    conflicts.push(
      `Rarity gap (${buddyA.rarity} vs ${buddyB.rarity}) — different worlds`
    );
  }

  // Chaos compatibility
  const chaosDiff = Math.abs(buddyA.stats.chaos - buddyB.stats.chaos);
  if (chaosDiff > 60) {
    conflicts.push(
      `Chaos mismatch (${buddyA.stats.chaos} vs ${buddyB.stats.chaos}) — one thrives in disorder while the other craves structure`
    );
  }

  // Calculate final score (0-100)
  const rawScore = Math.min(100, Math.max(0,
    50 + complementScore * 0.15 + bondScore * 0.2 - conflicts.length * 8 + synergies.length * 5
  ));
  const score = Math.round(rawScore);

  let analysis: string;
  if (score >= 85) {
    analysis = `Exceptional compatibility! These two buddies (${buddyA.species} & ${buddyB.species}) form a legendary duo. Their strengths interlock perfectly.`;
  } else if (score >= 70) {
    analysis = `Strong compatibility. The ${buddyA.species} and ${buddyB.species} complement each other well, with a few creative tensions that keep things interesting.`;
  } else if (score >= 50) {
    analysis = `Decent compatibility. The ${buddyA.species} and ${buddyB.species} can work together, though they will need to navigate some friction points.`;
  } else if (score >= 30) {
    analysis = `Rocky compatibility. The ${buddyA.species} and ${buddyB.species} have fundamental differences that could cause friction, but adversity breeds growth.`;
  } else {
    analysis = `Volatile pairing. The ${buddyA.species} and ${buddyB.species} are practically opposites — either they will destroy each other or create something nobody expected.`;
  }

  return { score, analysis, synergies, conflicts, buddyA, buddyB };
}
