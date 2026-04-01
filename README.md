# mcp-buddy

MCP server exposing your Claude Code `/buddy` stats and personality as tools. Your buddy influences Claude's personality.

**[Live Demo](https://shipitandpray.github.io/mcp-buddy/)**

## Installation

```bash
claude mcp add @shipitandpray/mcp-buddy -- npx -y @shipitandpray/mcp-buddy
```

Or add to your Claude Code config manually:

```json
{
  "mcpServers": {
    "buddy": {
      "command": "npx",
      "args": ["-y", "@shipitandpray/mcp-buddy"]
    }
  }
}
```

## Tools

### `get_buddy`

Get the full buddy object for a user ID.

**Input:** `{ "user_id": "alice" }`

**Returns:** Species, rarity, shiny status, all 5 stats, and a soul description.

```json
{
  "species": "dragon",
  "rarity": "Epic",
  "shiny": false,
  "stats": { "debugging": 87, "patience": 23, "chaos": 91, "wisdom": 45, "snark": 78 },
  "soul": "A restless dragon with piercing analytical eyes, prone to chaotic coding sessions..."
}
```

### `get_buddy_stats`

Get the 5 stats with percentile rankings.

**Input:** `{ "user_id": "alice" }`

**Returns:** debugging, patience, chaos, wisdom, snark — each with value and percentile.

### `get_buddy_soul`

Get the deterministic soul description generated from species + stats.

**Input:** `{ "user_id": "alice" }`

**Returns:** Species, rarity, and the soul text.

### `roll_encounter`

Generate a random buddy encounter from a random seed. No input required.

**Returns:** A full buddy object with the seed used, for "what if" scenarios.

### `buddy_compatibility`

Check compatibility between two users' buddies.

**Input:** `{ "user_id_a": "alice", "user_id_b": "bob" }`

**Returns:** Compatibility score (0-100), analysis, synergies, conflicts, and both buddy objects.

## Example Conversations

**User:** What's my buddy?

**Claude:** *(calls get_buddy with your username)*

> You've got an **Epic dragon** (not shiny). Your standout stat is **chaos at 91** — you're a restless dragon with piercing analytical eyes, prone to chaotic debugging marathons. Your patience is... 23. We won't talk about that.

---

**User:** Are me and @bob compatible?

**Claude:** *(calls buddy_compatibility)*

> Score: **78/100** — Strong compatibility! Your dragon's chaos (91) compensates for bob's turtle's order (34), and you both share high debugging (87 & 82). The only tension: your patience gap (23 vs 89) might cause some friction during long code reviews.

---

**User:** Roll me a random buddy!

**Claude:** *(calls roll_encounter)*

> You encountered a **Legendary shiny axolotl**! Stats: debugging 95, patience 88, chaos 12, wisdom 99, snark 67. "A regenerating axolotl that recovers from any outage, prone to methodical coding sessions."

## How It Works

Your username is hashed and fed into a [Mulberry32 PRNG](https://gist.github.com/tommyettinger/46a874533244883189143505d203312c) to deterministically generate your buddy's species, rarity, stats, and soul description. Same input always produces the same buddy.

### Species (18)

duck, goose, blob, cat, dragon, octopus, owl, penguin, turtle, snail, ghost, axolotl, capybara, cactus, robot, rabbit, mushroom, chonk

### Rarity Distribution

| Rarity | Chance | Stat Bonus |
|---|---|---|
| Common | 50% | +0 |
| Uncommon | 30% | +0 |
| Rare | 15% | +5 |
| Epic | 4% | +10 |
| Legendary | 1% | +20 |

### Stats

- **Debugging** — How ruthlessly your buddy hunts bugs
- **Patience** — How long your buddy waits before flipping the table
- **Chaos** — How much entropy your buddy introduces
- **Wisdom** — How deep your buddy's architectural knowledge goes
- **Snark** — How savage your buddy's code reviews are

## Development

```bash
npm install
npm run build
npm test
```

## License

MIT
