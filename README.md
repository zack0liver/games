# Games
Games I'm vibe coding with Gemini and other LLMs.

## Play Now
Visit the arcade: [https://zack0liver.github.io/games/](https://zack0liver.github.io/games/)
Drag a cartridge into the console (or tap one) to play.

## Available Games

1. **Asteroids - Jungle Aces**  
   Direct link: [https://zack0liver.github.io/games/index_asteroids_monkeys.html](https://zack0liver.github.io/games/index_asteroids_monkeys.html)

2. **Galaga Style Game v1**  
   Direct link: [https://zack0liver.github.io/games/index_galaga_v1.html](https://zack0liver.github.io/games/index_galaga_v1.html)

## Planned Enhancements

- **Galaga — per-stage enemy themes**: each stage cycles through a themed
  enemy set with its own palette and personality, announced with a stage
  banner (e.g. "STAGE 4 — INFERNO") when it starts. Themes repeat and
  intensify as stages climb.
  1. **Swarm** *(current default)* — yellow bees, red/white butterflies,
     green/blue bosses. Balanced baseline pace.
  2. **Ice Squadron** — icy blue/white palette; enemies move a bit slower
     but are tankier (butterflies take 2 hits too); shatter into ice-shard
     particles on death instead of the usual burst.
  3. **Inferno** — red/orange palette; faster dives, more squadron attacks
     than solo dives, higher fire rate.
  4. **Void Swarm** — purple/black palette; erratic/jittery dive paths;
     enemies flicker in instead of a clean swoop-in entry.
  5. **Mech Legion** — metallic gray/yellow; slower formation movement but
     heavier bullet spam per dive (multiple shots per pass).
  6. **Boss Rush** — every row is a boss-tier enemy: no bees or butterflies,
     just a full stage of high-value targets. Visually redesigned to read
     as clearly more powerful than a normal boss — rock/armor-plated or
     shielded sprite (chunky stone-textured or hexagonal-shield look,
     heavier silhouette, brighter/harder outline glow) rather than just a
     recolor, so the player immediately recognizes "this one hits harder."
     Fewer enemies total but a real difficulty spike; good as an occasional
     "every Nth stage" gauntlet rather than part of the regular cycle.

- **Galaga — extra life score bonuses**: award a bonus life the first time
  score crosses each doubling threshold — 10,000, 20,000, 40,000, 80,000,
  160,000, and so on indefinitely. Needs a "next threshold" tracker (e.g. an
  index or the last-awarded value) so each doubling only fires once, even if
  a big single-kill score jump skips past a threshold. Should show a classic
  "EXTRA SHIP!" style banner/message and update the reserve-ships display
  when it triggers. Worth deciding whether reserve lives are capped (classic
  arcades often cap around 5-6 to keep the display from overflowing).

- **Galaga — slower enemy dive speed**: current dive speed (scaling up with
  stage) feels too fast; ease it back to a more readable/fair pace, likely
  by lowering the base dive speed and/or its per-stage scaling factor, then
  re-tuning against the group-attack frequency so squadrons don't feel
  overwhelming at the new, slower speed.

## Easter Eggs & Delightful Surprises

Ideas to sprinkle in once the core enhancements above are done:

- **Konami Code** (↑↑↓↓←→←→BA) on the landing page or in-game unlocks
  something — a temporary rainbow ship, infinite lives for one run, or a
  secret 7th "???" cartridge.
- **Named high score ranks** — score tiers pop a rank title ("SPACE CADET"
  → "ACE PILOT" → "GALAGA LEGEND") instead of just a number.
- **Rare golden enemy** — a very low-chance (~1-in-500) glitched/golden bee
  worth 10x points that zooms erratically instead of diving normally — a
  "shiny" to hunt for.
- **Perfect-wave bonus** — clear a stage without losing a life or missing a
  shot: "FLAWLESS!" banner and bonus points.
- **Idle attract-mode** — if the intro screen sits untouched for ~20s, an
  AI-controlled demo plays itself dodging/shooting, like real arcade
  cabinets did to lure players.
- **Boss taunt lines** — Boss Rush enemies occasionally flash a short taunt
  ("IS THAT ALL?") when they survive a hit.
- **Cartridge blow-into-it gag** — tap-and-hold a cartridge (or shake on
  mobile) triggers the old "blow on the cartridge" animation/sound before
  it loads.
- **Secret cartridge** — a hidden slot that appears after some trigger
  (Konami code, or triggering every "coming soon" joke at least once) and
  links to a bonus surprise.
- **Power LED tap gag** — 5 quick taps on the console's power LED triggers
  a brief fake "power surge" CRT-glitch across the whole page.
- **Rotating coming-soon jokes** — each "coming soon" cartridge picks
  randomly from 2-3 jokes per insert instead of always showing the same one,
  rewarding repeat pokers.
- **Idle console ambiance** — after a while with no cartridge inserted, the
  power LED pulses slower, like the console is "waiting."
- **Date-based seasonal skins** — cheap palette swaps for the console (e.g.
  pumpkin/spooky in October, snow in December) for repeat visitors.
