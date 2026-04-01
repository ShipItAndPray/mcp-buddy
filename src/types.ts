export interface BuddyStats {
  debugging: number;
  patience: number;
  chaos: number;
  wisdom: number;
  snark: number;
}

export type Rarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";

export type Species =
  | "duck" | "goose" | "blob" | "cat" | "dragon"
  | "octopus" | "owl" | "penguin" | "turtle" | "snail"
  | "ghost" | "axolotl" | "capybara" | "cactus" | "robot"
  | "rabbit" | "mushroom" | "chonk";

export interface Buddy {
  species: Species;
  rarity: Rarity;
  shiny: boolean;
  stats: BuddyStats;
  soul: string;
}

export interface BuddyStatsWithPercentiles {
  debugging: { value: number; percentile: number };
  patience: { value: number; percentile: number };
  chaos: { value: number; percentile: number };
  wisdom: { value: number; percentile: number };
  snark: { value: number; percentile: number };
}

export interface CompatibilityResult {
  score: number;
  analysis: string;
  synergies: string[];
  conflicts: string[];
  buddyA: Buddy;
  buddyB: Buddy;
}
