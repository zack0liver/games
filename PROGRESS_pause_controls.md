# WIP — Pause + on-screen Controls keyboard view

Branch: `claude/arcade-pause-controls` (do NOT merge until verified). Nothing
here is on `main` yet.

## Where we are

### ✅ Done (this branch, syntax-checked, not yet playtested)

- Built the shared `installArcadeUI()` helper — a middle-right ⌨ CONTROLS
  button that opens an on-screen keyboard diagram (the game's keys lit up + a
  legend + a mobile-controls hint), plus P-key / ⏸-button pause with a PAUSED
  overlay.
- Wired it into all 5 real-time games: both Asteroids, Galaga (added a pause
  flag), Neon Breakout (added `state.paused`), and Snake Duel (hooked to its
  existing paused phase, with a sync loop so Space-pausing also updates the
  overlay).

### ⬜ Left for next session (tasks tracked)

- Add the controls keyboard view (no pause) to Candy Checkers and Tank Wars.
- Playwright-verify all 7 (controls overlay opens; pause actually
  freezes/resumes; no console errors; the ⌨ button is reachable over the setup
  screens).
- Update README/SESSION_LOG, then commit and merge to main.

## Note to eyeball on resume

I moved the ⌨/⏸ buttons to the middle-right edge (to avoid colliding with
games' own top-right mute/settings buttons on mobile) — want to eyeball that it
doesn't feel like it's in the way of gameplay.

## Implementation notes

- The `installArcadeUI(opts)` function is pasted (self-contained, injects its
  own `#aui-style`) near the end of each game's script. `opts = { accent,
  keys:[{k:[...],a:'label'}], mobile:'hint', pause: null | { canPause(),
  isPaused(), setPaused(v) } }`. Turn-based games pass `pause: null`.
- Reference copy of the snippet:
  `/tmp/.../scratchpad/arcade-ui-snippet.js` (may be gone after session reset —
  it's identical to the block already pasted in the 5 real-time games; copy from
  any of them, e.g. `index_neon_breakout.html`).
- Per-game pause hooks used: monkeys/maze `game.isPaused`; galaga module-level
  `paused` flag + loop guard; breakout `state.paused` + loop guard; snake
  `state.phase === 'paused'` + a `requestAnimationFrame` sync loop.
- Delete this file before the final merge to main.
