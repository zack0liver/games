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

3. **Asteroids - Maze Edition**  
   Direct link: [https://zack0liver.github.io/games/index_asteroids_maze.html](https://zack0liver.github.io/games/index_asteroids_maze.html)  
   Same asteroids flight controls, but each level is a vertical course: fly
   from the START pad up to the FINISH gate, bouncing off hard purple walls,
   shooting through cracked orange ones, and dodging drifting rocks. Your hull
   absorbs 3 wall bumps per life; grab a shield power-up for 5–10s of
   invulnerability (and to smash rocks). Seven progressively longer levels
   introduce L-shaped, T-shaped and mini-maze obstacles and, in the later
   stages, circular planetoids (some shootable) to orbit around — with incoming
   rocks telegraphed by edge arrows. Every full loop replays all seven faster
   and harder.

## Planned Enhancements

### Galaga

- **Per-stage enemy themes**: each stage gets its own enemy color scheme and
  behavior personality (e.g. faster divers, bigger squadrons, heavier fire),
  with a themed stage banner between levels.

### Asteroids — Maze Edition

Shipped from the playtest list: 7 progressively longer levels with a per-cycle
difficulty ramp, per-life hull damage (3 wall hits) with a HUD meter,
randomized 5–10s shield power-ups (placement randomized, mildly weighted
toward the front half of each level), telegraphed any-angle asteroid
approaches, L / T / mini-maze wall shapes, and circular obstacles (some
shootable) in the later stages.

Still open:

- **Bonus points for shooting**: award bonus points for destroying asteroids
  and cracked obstacles, and make the reward *obvious* — e.g. a floating "+N"
  popup at the hit location and/or a score-tick flourish, so it's clear the
  shot paid off.
- **Full-clear bonus**: if every cracked/shootable wall in a level is destroyed
  by the time you cross the finish line, grant a **double bonus** (with clear
  feedback that the level was fully cleared).
- **Speed / time bonus**: put a per-level countdown timer up; reach the finish
  before it hits zero for a bonus that scales with time remaining. Surface it
  in the HUD with a catchy label (e.g. "TIME LEFT TO BONUS").
- **Rename "planetoids" → "space obstacles"**: the circular obstacles are
  currently described as "planetoids" (intro text + code comments); switch the
  player-facing wording to something clearer like "space obstacles."
- **Bonus tunnel obstacle**: a larger circular space obstacle with a tunnel
  bored through the middle. The tunnel is sealed by cracked walls you have to
  shoot through; a point bonus sits in the center for players who bust in and
  grab it.
- **More 2D themes**: additional visual themes (color schemes / backdrops /
  wall + enemy styling), e.g. per-level or per-cycle theming so the course
  looks fresh as you advance. (Intentionally deferred — keeping the current
  aesthetic for now.)
