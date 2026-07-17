# Session Log

Archive of notable development sessions on this repo. Newest entries at the
top.

---

## 2026-07-16 — Asteroids: Gauntlet (new game)

**Branch:** `feat/asteroids-gauntlet`

New single-player, 20-level time-trial game `index_asteroids_gauntlet.html`,
built on the Duel engine.

- **Reuse:** ship physics, `Bullet`/`Rocket`, overheat + bazooka firing,
  powerups + `drawPowerupIcon`, obstacle geometry/collision
  (`resolveCircleRect/Circle/Tunnel`), particles and the `tone()`/`sfx` audio
  are all lifted from `index_asteroids_duel.html` (single-player: P2 stripped).
  Hull-3 damage model and touch drag-to-steer come from Maze; brick pattern
  masks (`. x X E S`, SMILEY/FORTRESS/DIAMOND) from Neon Breakout.
- **New systems:** per-level countdown + gold/silver/bronze medals (all derived
  from one `gold` par per level), 3 lives/run, an objective registry
  (beacons / breakables / gate / turrets / storm / bricks / finale), `Turret`
  (sweep/track/burst, telegraphed projectiles), `TargetBeacon`, `Gate`,
  cursed-pickup `storm` (REVERSE/STALL/DRAIN) with core collection, and a
  brick-grid adapter driven by ship bullets + bazooka AoE.
- **Scoring:** time-remaining ×10 + medal bonus + no-damage bonus → shared
  `highscores.js` board (slug `asteroids-gauntlet`). Per-level best
  time/medal persisted to `ag_medals` and shown as a start-screen medal case.
- **Registered** in the arcade `GAMES` array and README (#10).
- **Verified** in-browser (served over http): all 20 levels load and run
  error-free; firing→hit, hull-breach→fail→life-loss, time-out→fail,
  completion→scoring/medal-save, and the finale stage sequence all pass
  deterministic update-loop tests; brick/turret levels confirmed visually.
  Note: real-time-feel playtest and par tuning still pending — Chrome throttles
  the backgrounded automation tab (rAF), so live timing can't be exercised
  under automation. Pars ship on the loose side; tune with `?dev=1`.

---

## 2026-07-10 — Asteroids Jungle Aces: shield power-up + Snake food fix

**Branches:** `claude/jungle-aces-shields`, `claude/snake-food-fix`

Two small requested tweaks.

### Jungle Aces shield power-up (ported from Maze Edition)

- Added the `ShieldPickup` class and the ship's `shieldTimer` / `shielded`
  getter / bubble render, lifted from `index_asteroids_maze.html` and adapted
  to the wave-based Jungle Aces game (the maze spawns shields per level; here a
  timer drops one every ~16-26s, max one on screen).
- Collecting a pickup grants 5-10s of invulnerability; while shielded, flying
  into an asteroid/monkey smashes it (score, no life lost) instead of dying.
  Unshielded contact still costs a life. A cyan shield bubble, "SHIELD UP!"
  banner, and a bottom-left "◇ SHIELD Ns" readout show the state. The maze's
  other "power-up" (the permanent +1-hull ship upgrade) is tied to that game's
  hull system and tunnel-ring obstacles, so it wasn't applicable to the
  lives-based Jungle Aces.
- Verified with a 7-check Playwright suite (pickup spawn, collection → shield,
  shielded smash with no life loss, unshielded still costs a life, expiry, no
  errors).

### Snake Duel food fix

- `spawnFood` now insets pellets one cell from every edge so food never sits
  flush against the wall (confirmed over 2000 samples).

---

## 2026-07-10 — Neon Breakout (built from scratch to v1)

**Branch:** `claude/neon-breakout-game`

Second game from the concept-sheet round (Neon Breakout, following Snake Duel).
Single self-contained file, neon-glow aesthetic matching the arcade hub.

### What shipped

- **The game** (`index_neon_breakout.html`) — classic single-player brick
  breaker on a fixed 600×720 portrait field, letterboxed. Glowing bricks,
  a cyan paddle, a white ball with substepped circle-vs-AABB collision
  (axis-of-least-penetration reflection, no tunneling), and a paddle-angle
  bounce based on contact point.
- **Progression** — procedural levels that get taller and more gap-riddled
  each round; multi-hit bricks (up to 3 HP, brighter tint per HP) start
  appearing at higher levels; ball speed ramps per level. Score, 3 lives,
  and a persistent high score (`nb_highscore`).
- **Power-ups** — broken bricks may drop a falling capsule you catch with the
  paddle: WIDE paddle, MULTIBALL (splits every ball into three), SLOW ball,
  LASER (paddle fires bolts on Space/tap), and EXTRA LIFE. Timed effects
  expire; a legend is shown on the start screen.
- **Controls** — mouse or ←/→ (or A/D) to move; drag on touch; Space or
  tap to launch the ball and fire the laser. Start screen with a difficulty
  picker (Casual/Normal/Hard affecting ball speed, ramp, and drop rate);
  mute + difficulty persisted; Escape returns to the arcade. Neon shards on
  brick breaks and a small screen shake on losing a ball.
- **Integration** — new arcade cartridge (`BRICK BREAKER`, cyan/magenta),
  README entry.

### Verification

12-check Playwright suite (start screen, game start state, ball launch,
brick-break scoring over a short auto-rally, level-advance with tougher
bricks, multiball/extra-life/wide power-ups, last-ball-at-1-life game over +
high-score save, high-score and mute persistence across reload, and the mobile
layout) — all passing; start/play/mobile screens eyeballed.

---

## 2026-07-10 — Snake Duel: solo survival mode

**Branch:** `claude/snake-duel-game`

Follow-up on Snake Duel adding a single-player mode.

### What shipped

- **Solo survival** — a new MODE toggle (Duel / Solo) in setup. Solo is one
  snake, endless: grow by eating, don't crash. A persistent high score
  (`sd_highscore`, shown as BEST length) tracks how far you get.
- **Levels + obstacles** — every few pellets (4) you level up; each level
  scatters more obstacle blocks across the arena (crashing one is fatal) and
  nudges the speed up. Obstacles avoid spawning on the snake or right in front
  of the head, and a "LEVEL n" banner + jingle marks each promotion.
- **UX** — HUD switches to LEN / LEVEL / BEST in solo; arrow keys also steer
  the single snake (either hand); the setup hides the Player-2 and match-length
  rows in solo. Switching back to Duel clears obstacles cleanly.

### Verification

10-check Playwright suite (solo start state, eat-to-grow scoring, level-up
obstacle spawn, obstacle-crash game over, high-score save + persist + no
overwrite by a lower run, solo steering, and clean duel/solo switching) — all
passing, plus a re-run of the original 13-check duel suite for regressions.

---

## 2026-07-10 — Snake Duel (built from scratch to v1)

**Branch:** `claude/snake-duel-game`

New game picked from a concept-sheet mockup round (Snake Duel chosen; Neon
Breakout earmarked for later). Single self-contained file, green-CRT look that
pairs with Tank Wars.

### What shipped

- **The game** (`index_snake_duel.html`) — two snakes share a 30×20 grid
  arena. Grow by eating pellets; die on any collision with a wall, your own
  body, or the rival. Last snake alive wins the round; best-of-N match. Glowing
  green (P1) and magenta (P2) snakes with directional eyes, gold pellets, faint
  grid + scanline overlay.
- **Simultaneous-tick engine** — all snakes advance one cell per tick with
  buffered turns (no 180° reversal into your own neck); collisions resolve
  against the post-move board so head-to-head ties kill both (a draw replays the
  round), and a snake may safely follow into the cell a tail is vacating.
- **Controls** — desktop: P1 WASD, P2 arrow keys, Space to ready/pause. Mobile:
  multi-touch swipe, where each player swipes their half of the screen (split
  left/right in landscape, bottom/top in portrait; solo play steers P1 from
  anywhere). On-screen legend for each.
- **CPU snake** — greedy pathing toward the nearest pellet with collision
  avoidance; difficulty scales from sloppy (Easy) to a flood-fill open-space
  check that avoids boxing itself in (Hard).
- **Setup + options** — opponent (2-player or CPU Easy/Med/Hard), speed
  (Chill/Normal/Fast), walls (Solid or Wrap-around), and match length;
  config + mute persisted in localStorage. Escape returns to the arcade.
- **Integration** — new arcade cartridge (`2P GROW & TRAP`, green/magenta),
  README entry.

### Verification

13-check Playwright suite (scratchpad) driving the real page with a
deterministic single-tick hook: food growth + respawn, solid-wall death,
wrap-around, head-to-head double-KO draw, round scoring, 180°-reversal guard,
an unattended CPU snake surviving and growing, mute/config persistence across
reload, and the mobile swipe layout. All passing; setup/board/mobile eyeballed.

---

## 2026-07-10 — Tank Wars v2 (movement, shields, richer combat)

**Branch:** `claude/tank-wars-game`

Enhancement pass on Tank Wars from a playtest wishlist. Same self-contained
file, same green-CRT look.

### What shipped

- **Two-tier blasts** — every explosion now has a hard inner core (carves
  terrain + full damage) and a wider outer ring (no terrain damage, a lighter
  health hit), so near-misses graze. Blasts are slightly larger on easy
  battlefields and tighter on expert (`blastScale()`).
- **Shrapnel bomb** — a new power-up that bursts into a fan of ~7 fragment
  shells raining down in different directions, each with its own small blast.
- **More power-ups to start** — the roster is now Twin/Triple/Big/Digger/
  Shrapnel, and each player is granted two distinct ones at round start.
- **Tank movement** — drive left/right during your aiming turn on a per-round
  energy budget worth ~one screen width of flat ground; steep uphill climbs
  cost extra (never impossible), and when the treads run out you stop. An
  orange fuel bar rides above the active tank.
- **One-per-round shield** — raise a shield that absorbs the next hit entirely
  then pops; can't be re-raised until next round. Drawn as a pulsing bubble.
- **360° aiming** — the turret rotates a full circle (wrap, no clamp), so you
  can point straight down and deliberately blow a pit under yourself; shells
  now spawn from the muzzle tip so near-horizontal shots clear the hull.
- **Last-shot marker** — the power meter shows a dashed marker at the current
  player's previous shot strength for reference.
- **Controls** — desktop: arrows aim, ↑↓ fine, A/D drive, S shield, Space
  hold-to-fire, 1-6 weapons (with an on-screen key legend). Mobile: a
  redesigned two-row pad — AIM ◀▶, DRIVE ◀▶ (orange), SHIELD, and a big HOLD
  TO FIRE — plus the existing weapon chips. New sfx for driving and shields.
- Power-up illustrations on click were deliberately deferred to v3.

### Verification

15-check Playwright suite (scratchpad) on top of the original 21: shrapnel
fragment burst, two-tier damage, easy-vs-expert blast width, shield absorb +
one-use guard, driving/energy drain + exhaustion, 360 straight-down dig, the
last-shot marker, and the six-button mobile layout — all passing, with the
full v1 suite re-run to guard against regressions.

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
