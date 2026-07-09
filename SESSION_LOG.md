# Session Log

Archive of notable development sessions on this repo. Newest entries at the
top.

---

## 2026-07-09 — Asteroids: Maze Edition (built from scratch to v1)

**Branch:** `claude/asteroids-maze-game-ovvr59` (merged into `main` throughout)

Built a brand-new game from a concept brief, then iterated through several
rounds of playtest feedback in the same session.

### What shipped

1. **Concept → levels 1–2** (`86abf6c`) — New game reusing the Jungle Aces
   flight mechanics, reframed as a vertical maze course: fly from a START pad
   up to a FINISH gate, bouncing off oscillating purple walls, shooting
   through cracked orange ones, dodging drifting rocks. 5-level cycle
   scaffolding (loops back to level 1, faster/harder, each pass). Wired into
   the arcade's "Asteroids: Maze Edition" cartridge (was coming-soon).
2. **Roadmap capture** (`b971b20`) — Logged playtest ideas: more/longer
   levels, per-life hull damage, shield power-ups, smarter asteroids, new wall
   shapes, more 2D themes.
3. **Big feature batch** (`7dae862`) — Built out everything from the roadmap
   except themes: per-life hull damage (3 wall hits, HUD pips), randomized
   5–10s shield power-ups, telegraphed any-angle asteroid approaches (edge
   arrows), L/T/mini-maze wall shapes, levels 3–5 (full 5-level cycle), much
   longer courses.
   - *Note:* this commit's first GitHub Pages deploy failed (transient
     timeout); required a re-trigger and eventually an empty redeploy commit
     (`93d4f68`) to force a clean build.
4. **Circular obstacles + levels 6–7** (`bf66594`) — New circular obstacle
   type (bounce physics, some shootable), levels 6 "ASTEROID BELT" and 7
   "EVENT HORIZON", extending the cycle to 7 levels.
5. **More feedback captured** (`0ba7878`) — Bonus points for shooting
   asteroids/cracks (with obvious feedback), full-clear double bonus, a
   speed/time bonus, renaming "planetoids" → "space obstacles".
6. **Shield placement fix** (`6a3d102`) — The shield-spawn code's comment
   claimed a bias toward the finish, but it was never actually implemented
   (pure uniform random). Replaced with a real, verified bias toward the
   front half of each level.
7. **Tunnel-ring obstacles + ship upgrades** (`cb2b65b`) — Replaced the old
   fully-destructible crack-circle mechanic with a ring that's permanently
   indestructible except for one shootable orange arc (the tunnel). Shoot it
   open, fly into the hollow center, and collect a permanent ship upgrade:
   +1 max hull, +30% ship size, gold hull trim. Swapped into levels 6 & 7.
   Also renamed "planetoids" → "space obstacles" throughout.

### Still open (see README § Planned Enhancements)

- Bonus points for shooting (with obvious floating "+N" feedback)
- Full-clear double bonus
- Speed/time bonus with a "TIME LEFT TO BONUS" HUD readout
- More 2D themes (per-level/per-cycle visual variety) — intentionally
  deferred, current aesthetic kept as-is per explicit request

### State at end of session

Live at https://zack0liver.github.io/games/index_asteroids_maze.html — 7
levels, cycling with escalating difficulty. All work merged to `main` and
deployed (each deploy verified via the GitHub Actions Pages workflow, not
just the git push, after the one deploy failure above).
