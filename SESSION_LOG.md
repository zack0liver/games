# Session Log

Archive of notable development sessions on this repo. Newest entries at the
top.

---

## 2026-07-10 — Tank Wars (built from scratch to v1)

**Branch:** `claude/tank-wars-game`

Built the last arcade cartridge — a turn-based artillery duel — from concept to
shipped v1. One self-contained file in the house style (inline CSS/JS, single
canvas + rAF, Press Start 2P, no assets).

### What shipped

- **The game** (`index_tank_wars.html`, ~1490 lines) — Scorched-Earth-style
  artillery for **2-4 players**, any mix of hotseat humans and CPU opponents.
  Rendered in a **monochrome green-phosphor CRT** look (chosen over the pixel-
  sprite style deliberately to keep it retro and light): dithered terrain mass
  with a bright heightline, silhouette tanks distinguished by fill pattern
  (solid/stripes/checker/dots), line-drawn UI, and a CSS scanline overlay.
- **Core loop** — set turret angle (arrows / on-screen ◀▶), **hold to charge**
  a power meter that ping-pongs at max, release to fire. Shells fly under
  gravity + **wind** (per-turn, HUD meter), collide with a destructible column-
  heightmap that **craters** on impact; tanks fall and take fall damage, and
  the Sky Island theme's void is lethal. Last tank standing wins the round;
  best-of-N match with a fresh battlefield each round.
- **Four battlefields by difficulty** — Hills (easy) → Mountains → Canyon
  (gorge to arc over) → Sky Island (separate floating plateaus, void kills),
  plus Random. Midpoint-displacement generator with per-theme post-passes.
- **Weapons + power-up economy** — standard SHELL (infinite; the only shot that
  earns a perfect-shot bonus) plus TWIN TURRET (2 shells), TRIPLE SHOT, BIG
  BLAST and DIGGER. Power-ups arrive three ways: one granted per player each
  round, a bonus for a direct standard-shell hit on an enemy ("PERFECT SHOT!"),
  and crates scattered ≥90px from tanks that arm whoever's blast cracks them
  open. Per-player inventory chip row, keys 1-5 or tap.
- **CPU AI** — closed-form ballistic guess refined by silent trajectory
  simulation (which includes wind), with difficulty-scaled aim noise (Easy
  loose → Hard tight) and a paced turret sweep + charge so its turns read
  clearly. Simple weapon heuristic.
- **Setup screen** — CRT menu: player count, per-slot HUMAN/CPU·EASY/MED/HARD,
  battlefield, match length; config + mute persisted in localStorage. Full
  keyboard + mobile-button control, Escape back to the arcade.
- **Integration** — hub cartridge flipped from coming-soon to live
  (`ARTILLERY DUEL 2-4P`), README entry with direct link.

### Verification

21-check Playwright suite (scratchpad) driving the real page: terrain carve,
hold-charge fire, wind deflection (both directions), perfect-shot award,
crate pickup, twin-turret double shell, a CPU taking its turn unassisted,
round→match flow with score + modal, 3-player skip-dead turn order, mute/
config persistence across reload, and portrait/landscape mobile layouts. All
passing; all four terrain themes + setup + match-end screens eyeballed.

Two real bugs fixed during verification: the CPU's dry-run trajectory used a
coarser timestep than real flight (so "solved" shots drifted and missed) —
now matched to the flight substep and given the same self-tank grace period;
and crates were only collectible by a pixel-perfect fly-through, now also
cracked open by any blast landing within the explosion's splash radius.

---

## 2026-07-10 — Candy Checkers v2 (customization + optional captures)

**Branch:** `claude/candy-checkers-game-clm7jp`

Second pass on Candy Checkers, from a playtest wishlist. Same single
self-contained file.

### What shipped

- **Optional captures** — the forced-jump rule is gone. Every slide and jump
  is legal; you're never compelled into a move. After a jump you *may* keep
  chaining with the same piece or stop via a new pulsing **END TURN ✓** button
  (multi-jumps are fully player-driven now). Crowning still ends the turn.
  Move-hints reworked to match: with nothing selected, pieces that *can*
  capture get a soft flag (a suggestion, not an order); capture destinations
  are marked with a bolder ring than plain moves.
- **Candy shop** — the pre-game screen is now a shop: each player picks a candy
  off a wooden shelf of jars (gumdrop, twist, peppermint, jawbreaker, lollipop)
  and a flavor color, with a live preview. The opponent's chosen color is
  greyed out so the two sides always stay distinct. Reachable any time via a
  SHOP button and the win modal's "NEW CANDIES".
- **Pixel-art pieces** — candies are now drawn as cached pixel-art sprites
  (16px offscreen, nearest-neighbor upscaled) in the Galaga/Asteroids 2D
  aesthetic, recolored per player from the chosen color; kings wear a pixel
  crown with a soft gold glow.
- **Drag controls** — pieces can be dragged (pointer capture, ghost under the
  cursor, snap-back on illegal drop) in addition to the existing tap-to-select
  / tap-to-move, on desktop and mobile.
- **King-kill bonus sound** — capturing a king adds a fat descending jingle on
  top of the crunch, plus extra gold particles.

### Follow-up (same day): glossy-toon art pass

Mocked up four piece-art directions (current baseline, HD 24px remaster,
glossy toon, new candy shapes) as a side-by-side sprite sheet; owner picked
**glossy toon**. All five candies redrawn at 24px as filled silhouettes with a
thick dark outline, flat color, one bottom shadow crescent and a big bubble
gloss (gumdrop got a real dome shape, twist real wrapper points + stripes,
peppermint/lollipop curved swirls, jawbreaker layered rings). Same sprite
pipeline, full 21-check suite still green.

### Verification

21-check Playwright suite (scratchpad) driving the real page: shop distinct-
color guard, style application, optional-capture legality (bystanders
selectable, jumps not forced), END-TURN early stop vs. chain continuation,
crowning-ends-chain, king-capture into tray, drag-to-move and illegal-drop
snap-back, win + modal buttons, per-player pref persistence across reload, and
portrait/landscape layout. All passing; sprites/shop/kings eyeballed.

---

## 2026-07-10 — Candy Checkers (built from scratch to v1)

**Branch:** `claude/candy-checkers-game-clm7jp`

Built the Candy Checkers cartridge from concept to shipped v1 in one session,
flipping the hub's coming-soon placeholder to a live game.

### What shipped

- **The game** (`index_candy_checkers.html`) — Two-player pass-and-play
  American checkers, one self-contained file in the house style (inline
  CSS/JS, single canvas + rAF, Press Start 2P, no assets). Pink gumdrops vs
  gold wrapped candies on a chocolate/cream board; kings are slowly spinning
  peppermint swirls with a little crown.
- **Rules enforced in full** — forced captures (if you can jump you must),
  mandatory multi-jump chains with locked selection (taps elsewhere are inert
  mid-chain), crowning ends the turn even mid-chain, win on zero legal moves
  (covers elimination and blockade in one check). No draw rule on purpose —
  hotseat players use RESET.
- **Per-player extras** — each player has their own HINTS toggle (movable
  pieces pulse, destinations glow; chain continuations glow regardless since
  they're rule-critical); captured candies pile into trays (top/bottom in
  portrait, sides in landscape); WebAudio-generated bleeps/crunches/fanfares
  with a persisted mute. Prefs live in localStorage.
- **Integration** — hub cartridge flipped from coming-soon to live
  (`2P SUGAR STRATEGY`), README entry with direct link.

### Verification

22-check Playwright suite (scratchpad, not committed) drove the real page:
forced-capture filtering, chain lock, crowning-ends-chain, backward king
capture, both win paths, per-player hint + mute persistence across reload,
and portrait/landscape layout (side trays fixed a 23px-cell squeeze in
phone landscape). All passing; screenshots eyeballed.

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
