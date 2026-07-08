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
