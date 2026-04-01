import type { BuddyStats, Species } from "./types.js";

type StatName = keyof BuddyStats;

const SPECIES_FLAVOR: Record<Species, string> = {
  duck: "a determined duck with an unflappable waddle",
  goose: "a fierce goose with an intimidating honk",
  blob: "an amorphous blob that shifts form with every mood",
  cat: "a sleek cat with half-lidded analytical eyes",
  dragon: "a restless dragon with piercing analytical eyes",
  octopus: "a multitasking octopus juggling eight threads at once",
  owl: "a wide-eyed owl perched high above the codebase",
  penguin: "a tuxedo-clad penguin who treats every deploy like a formal affair",
  turtle: "a patient turtle who ships slowly but never rolls back",
  snail: "a meticulous snail who leaves a trail of perfect commits",
  ghost: "a spectral ghost that phases through abstraction layers",
  axolotl: "a regenerating axolotl that recovers from any outage",
  capybara: "a chill capybara who keeps the team calm during incidents",
  cactus: "a prickly cactus that thrives in hostile production environments",
  robot: "a precise robot that compiles feelings into logic gates",
  rabbit: "a quick rabbit that races through PRs at blinding speed",
  mushroom: "a mycelial mushroom connected to every service underground",
  chonk: "an absolute unit of a chonk that benchmarks by sheer mass",
};

const STAT_TEMPLATES: Record<StatName, Record<string, string>> = {
  debugging: {
    duck: "hunts bugs in the pond of legacy code with stubborn precision",
    goose: "chases down bugs aggressively, honking at every stack trace",
    blob: "envelops bugs and dissolves them through osmotic analysis",
    cat: "pounces on bugs with surgical precision, toying with them before the kill",
    dragon: "hunts bugs with the intensity of hunting treasure",
    octopus: "debugs eight modules simultaneously, never dropping a tentacle",
    owl: "spots bugs from a mile away, swooping in silently to fix them",
    penguin: "methodically isolates bugs in sub-zero focus sessions",
    turtle: "slowly but surely corners every bug, leaving no shell unturned",
    snail: "traces every execution path at its own pace, missing nothing",
    ghost: "phases into stack frames the living cannot reach",
    axolotl: "regenerates broken tests until the suite is whole again",
    capybara: "sits peacefully beside the bug until it reveals itself",
    cactus: "absorbs crashes in production without flinching",
    robot: "runs binary search on every failure with mechanical certainty",
    rabbit: "darts through breakpoints faster than the debugger can render",
    mushroom: "spreads diagnostic spores through the entire system",
    chonk: "sits on the bug until it confesses",
  },
  patience: {
    duck: "waits in the reeds for the perfect moment to merge",
    goose: "surprisingly patient when guarding the deploy pipeline",
    blob: "absorbs delays without changing shape, infinitely malleable",
    cat: "naps through long CI runs, waking only when tests pass",
    dragon: "hoards patience like gold, spending it wisely on code reviews",
    octopus: "holds eight conversations at once without losing composure",
    owl: "watches the build pipeline through the entire night shift",
    penguin: "stands in the deployment queue for hours without complaint",
    turtle: "carries the weight of technical debt on its shell without hurry",
    snail: "embodies patience so deeply that deadlines bend around it",
    ghost: "has been waiting since before the repo was initialized",
    axolotl: "smiles through every failed deployment with eternal optimism",
    capybara: "radiates patience so strong it calms flaky tests",
    cactus: "endures drought seasons of zero commits without wilting",
    robot: "enters standby mode, consuming zero resources while waiting",
    rabbit: "taps its foot impatiently but never actually rushes the build",
    mushroom: "grows slowly in the dark, fruiting only when conditions are right",
    chonk: "is too comfortable to be bothered by delays",
  },
  chaos: {
    duck: "creates beautiful chaos by nesting in unexpected branches",
    goose: "weaponizes chaos, turning every standup into an event",
    blob: "thrives in entropy, finding clarity where others see only confusion",
    cat: "knocks production services off the table just to watch them fall",
    dragon: "breathes fire into orderly systems, forging something stronger from the ashes",
    octopus: "tangles all the microservices together in creative new topologies",
    owl: "silently rearranges the entire architecture at 3 AM",
    penguin: "slides into chaos on its belly, somehow landing on its feet",
    turtle: "slowly introduces entropy that nobody notices until it is too late",
    snail: "leaves a chaotic trail of experimental feature flags",
    ghost: "haunts the codebase with inexplicable behavioral changes",
    axolotl: "mutates the codebase in ways that somehow pass all tests",
    capybara: "sits in the middle of chaos like it is a hot spring",
    cactus: "grows spines of complexity in every direction",
    robot: "follows its own emergent logic that no human can predict",
    rabbit: "multiplies side projects until the filesystem overflows",
    mushroom: "spreads chaos spores that sprout in unrelated repositories",
    chonk: "creates chaos simply by existing in a space not designed for its magnitude",
  },
  wisdom: {
    duck: "quacks ancient proverbs about duck-typing and loose coupling",
    goose: "honks uncomfortable truths that the team needs to hear",
    blob: "contains the dissolved wisdom of every codebase it has absorbed",
    cat: "has nine architectural lives and has learned from each one",
    dragon: "guards ancient scrolls of design patterns in its cavern",
    octopus: "draws wisdom from eight different programming paradigms",
    owl: "speaks in riddles that turn out to be perfect abstractions",
    penguin: "learned wisdom in the harshest environment: production",
    turtle: "carries generations of accumulated knowledge on its back",
    snail: "has been studying the codebase longer than anyone else",
    ghost: "remembers every deleted file and deprecated API",
    axolotl: "retains juvenile curiosity while wielding senior judgment",
    capybara: "dispenses wisdom that sounds simple but restructures your thinking",
    cactus: "stores hard-won knowledge like water in the desert",
    robot: "indexes all of Stack Overflow in local memory",
    rabbit: "has hopped through enough holes to know which ones are warrens",
    mushroom: "channels underground networks of institutional knowledge",
    chonk: "has the gravitational pull to attract good advice from everywhere",
  },
  snark: {
    duck: "responds to bad PRs with a single devastating quack",
    goose: "hisses at poorly written tests with maximum theatrical contempt",
    blob: "absorbs your bad code and oozes it back as passive-aggressive comments",
    cat: "leaves dead code on your doorstep as a gift you did not ask for",
    dragon: "roasts your implementation with literal fire breath",
    octopus: "gives eight thumbs down on your merge request simultaneously",
    owl: "delivers withering code reviews that arrive at 3 AM",
    penguin: "formally declines your PR with a bow and a savage comment",
    turtle: "takes its time crafting the most devastating one-liner response",
    snail: "leaves a glistening trail of sarcasm on every review",
    ghost: "haunts your IDE with passive-aggressive tooltip suggestions",
    axolotl: "smiles sweetly while regenerating your entire approach from scratch",
    capybara: "is too zen for snark, which is somehow the ultimate snark",
    cactus: "responds to every touch with sharp, pointed feedback",
    robot: "computes the mathematically optimal insult for each situation",
    rabbit: "thumps disapproval so fast you feel it before reading the comment",
    mushroom: "releases toxic spores of criticism that linger in the air",
    chonk: "simply sits on your PR until you fix it yourself",
  },
};

function getHighestStat(stats: BuddyStats): StatName {
  const entries = Object.entries(stats) as [StatName, number][];
  return entries.reduce((a, b) => (b[1] > a[1] ? b : a))[0];
}

export function generateSoul(species: Species, stats: BuddyStats): string {
  const highestStat = getHighestStat(stats);
  const flavor = SPECIES_FLAVOR[species];
  const statDesc = STAT_TEMPLATES[highestStat]?.[species] ?? "walks a path unknown to any other";

  const statLabel = highestStat.charAt(0).toUpperCase() + highestStat.slice(1);
  return `${capitalize(flavor)}, prone to ${stats.chaos > 70 ? "chaotic" : stats.patience > 70 ? "methodical" : "focused"} coding sessions. ${statLabel} defines this buddy: ${statDesc}. (${species}/${highestStat}:${stats[highestStat]})`;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
