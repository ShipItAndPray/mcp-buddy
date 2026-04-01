#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { deriveBuddy, deriveBuddyFromSeed, getStatsWithPercentiles } from "./buddy.js";
import { generateSoul } from "./soul.js";
import { calculateCompatibility } from "./compatibility.js";

const server = new McpServer({
  name: "mcp-buddy",
  version: "0.1.0",
});

// Tool 1: get_buddy
server.tool(
  "get_buddy",
  "Get the full buddy object for a user ID — species, rarity, shiny status, stats, and soul description. Your buddy influences Claude's personality.",
  { user_id: z.string().describe("The user ID to derive a buddy from (e.g. their username)") },
  async ({ user_id }) => {
    const buddy = deriveBuddy(user_id);
    return {
      content: [{ type: "text" as const, text: JSON.stringify(buddy, null, 2) }],
    };
  }
);

// Tool 2: get_buddy_stats
server.tool(
  "get_buddy_stats",
  "Get the 5 stats with percentile rankings for a user's buddy. Stats: debugging, patience, chaos, wisdom, snark.",
  { user_id: z.string().describe("The user ID to get buddy stats for") },
  async ({ user_id }) => {
    const buddy = deriveBuddy(user_id);
    const statsWithPercentiles = getStatsWithPercentiles(buddy.stats);
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            { species: buddy.species, rarity: buddy.rarity, stats: statsWithPercentiles },
            null,
            2
          ),
        },
      ],
    };
  }
);

// Tool 3: get_buddy_soul
server.tool(
  "get_buddy_soul",
  "Get the deterministic soul description for a user's buddy, generated from species + stats combination.",
  { user_id: z.string().describe("The user ID to get the buddy soul for") },
  async ({ user_id }) => {
    const buddy = deriveBuddy(user_id);
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            { species: buddy.species, rarity: buddy.rarity, soul: buddy.soul },
            null,
            2
          ),
        },
      ],
    };
  }
);

// Tool 4: roll_encounter
server.tool(
  "roll_encounter",
  "Generate a random buddy encounter — a new buddy from a random seed. Fun for 'what if' scenarios.",
  {},
  async () => {
    const seed = Math.floor(Math.random() * 2147483647);
    const buddy = deriveBuddyFromSeed(seed);
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({ seed, ...buddy }, null, 2),
        },
      ],
    };
  }
);

// Tool 5: buddy_compatibility
server.tool(
  "buddy_compatibility",
  "Check compatibility between two users' buddies. Returns a score, analysis, synergies, and conflicts.",
  {
    user_id_a: z.string().describe("First user ID"),
    user_id_b: z.string().describe("Second user ID"),
  },
  async ({ user_id_a, user_id_b }) => {
    const result = calculateCompatibility(user_id_a, user_id_b);
    return {
      content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
