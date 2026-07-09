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
   shooting through cracked orange ones, and dodging drifting rocks. Five
   levels cycle; every full loop replays them faster and harder. Levels 1 & 2
   are built out — 3–5 are on the way.

## Planned Enhancements

### Galaga

- **Per-stage enemy themes**: each stage gets its own enemy color scheme and
  behavior personality (e.g. faster divers, bigger squadrons, heavier fire),
  with a themed stage banner between levels.

### Asteroids — Maze Edition

Ideas captured from playtesting levels 1 & 2. Not yet built.

- **More levels**: build out levels 3–5 so the full 5-level cycle is real
  before it loops back to level 1 faster/harder. Keep the per-cycle difficulty
  ramp.
- **Much longer levels**: extend each course significantly (more `screens`,
  more walls) so a level is a real journey rather than a quick sprint.
- **Lives + damage levels**: give each life a small health pool — allow **3
  wall hits per life** before the life is lost — instead of walls being purely
  harmless bounces. Show a per-life damage meter in the HUD.
- **Shield power-ups**: collectible shields that make the ship invulnerable for
  a **randomized 5–10 seconds**. Randomize both spawn location and duration,
  and generally weight them toward **later stages** where they're most needed
  (save-it-for-later feel).
- **Smarter asteroid approaches**: spawn/route asteroids so they force real
  navigation decisions — come at the player from **any angle**, and arrive at
  spots where you must weave around them or spot them early and slow down
  (telegraphed approaches, not cheap surprise hits).
- **New wall shapes (progressive complexity)**: beyond straight bars, introduce
  **L-shaped**, **T-shaped**, **mini-maze** clusters, and other interesting
  structures. Gate them by progress so navigation gets harder the more levels
  you win.
- **More 2D themes**: additional visual themes (color schemes / backdrops /
  wall + enemy styling), e.g. per-level or per-cycle theming so the course
  looks fresh as you advance.
