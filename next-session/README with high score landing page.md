# Handoff: Arcade Console Landing Page

## Overview
Main landing page for a kids' arcade game site (games list at https://zack0liver.github.io/games/). Replaces the current cartridge-grid layout with a single large arcade cabinet illustration whose CRT screen displays the game list. Users pick a game by clicking it on-screen or navigating with arrow keys + Enter.

## About the Design Files
The bundled file (`Arcade Landing.dc.html`) is a **design reference built in HTML** — a working prototype of the look and interaction, not production code to copy verbatim. Recreate this design in the target codebase's actual environment (plain HTML/CSS/JS, given the existing site is static GitHub Pages) following its existing conventions. If the site has no framework, keep it plain JS to match the existing repo.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and interaction behavior below should be matched closely.

## Screen: Landing / Game Select
**Purpose:** Single entry screen. Shows title, an illustrated arcade cabinet, and lets the user pick a game to launch (navigate to that game's page).

**Layout:**
- Full-viewport dark page, `radial-gradient(ellipse 120% 100% at 50% 0%, #1a1626 0%, #0a0a12 55%, #050508 100%)` background.
- Centered column, `padding: 56px 24px 40px`.
- Title, then cabinet (max-width 900px), then a helper caption below.

**Title:**
- Font: 'Press Start 2P' (Google Font), 34px, white, `text-shadow: 0 0 6px #ff3b6b, 0 0 18px #ff3b6b88, 3px 3px 0 #ff3b6b`, letter-spacing 2px, centered, line-height 1.6.
- Text: "HAYES & WILL'S ARCADE" (two lines).

**Cabinet — Marquee (top strip):**
- `linear-gradient(180deg, #2a2140, #1c1730)`, 3px solid `#4a3f6b` border (no bottom border), rounded top corners (18px), padding 14px 20px, centered text.
- Label "SELECT YOUR GAME" — 'Press Start 2P' 15px, `#7de8ff`, glow `text-shadow: 0 0 8px #7de8ff`, letter-spacing 3px.

**Cabinet — Body:**
- `linear-gradient(180deg, #4a4650 0%, #38343e 6%, #2a2731 100%)` (dark charcoal grey), 3px solid `#4a3f6b` border, no top border, padding 34px 40px 40px, drop shadow `0 30px 60px #000000aa`.

**Cabinet — Bezel + Screen:**
- Bezel: `#17141f` background, 14px border-radius, 22px padding, inset white-ish highlight + drop shadow to read as a physical bezel.
- Screen: near-black green-phosphor `#030a06`, 4px border-radius, inset shadows for CRT depth (`inset 0 0 60px #000, inset 0 0 20px #00ff8833`).
- A subtle repeating horizontal scanline overlay (1px lines, `#00000055`, repeating every 3px) sits above the content, animated to drift slowly (translate ~4px loop). No shake/flicker on the screen itself — keep it static aside from the scanline drift.
- Screen content padding: 26px 30px 30px.

**Screen — Header row:**
- Left: "GAME SELECT" — 'Press Start 2P' 12px, `#00ff88`, glow.
- Right: "01 / 14" style counter (current index / total), VT323 20px, `#00ff88aa`.
- 2px bottom border `#0f4a2c` under the header.

**Screen — Game list rows:**
- One row per game, VT323 font throughout.
- Row layout: flex row, gap 10px, padding `6px 10px`, negative side margins so the highlight bleeds to full width, 3px left border.
- **Unselected row:** left border transparent, background transparent, name text `#00cc6e`, tag text `#00994d88` (dim).
- **Selected row:** left border `#00ff88`, background `#00ff8822`, name text `#e8fff2` with `text-shadow: 0 0 8px #00ff88`, tag text `#00ff88cc`, cursor glyph `▸` shown at left (16px reserved width), arrow glyph `→` shown at right.
- Cursor/arrow glyphs are empty-string (reserved width, no glyph) on unselected rows so layout doesn't shift.
- Row content: game name (19px) + secondary tag/genre line (15px), same row, name flex-grows.
- List should scroll internally once it exceeds the visible screen height — build for 10–20+ games without growing the cabinet (fixed screen height, `overflow-y: auto` on the list, keep selected row scrolled into view).

**Screen — Footer row:**
- 2px top border `#0f4a2c`, padding-top 14px, margin-top 20px.
- Flex row, space-between, VT323 17px, `#00ff8899`: "↑↓ MOVE" · "ENTER SELECT". (No blinking "PRESS START" — removed by design.)

**Controls — Joystick (decorative):**
- Circular base, 130×130px, `radial-gradient(circle at 35% 30%, #333, #111 75%)`, drop shadow + inset highlight.
- Stick: 18×56px rounded bar, `linear-gradient(180deg, #999, #555)`, positioned rising from the base center.
- Ball top: 46×46px circle, `radial-gradient(circle at 35% 30%, #ff5577, #b8123f 75%)`, positioned at the top of the stick, with its own highlight + shadow.

**Controls — Buttons (decorative):**
- Two round buttons, 56×56px, labeled "A" (red, `#ff3b6b`) and "B" (orange, `#ffb454`), 'Press Start 2P' 14px white label, `radial-gradient(circle at 35% 30%, color, color-cc 70%)`, 3D via `box-shadow: 0 6px 0 #0006` (raised) that flattens to `inset 0 2px 6px #0009` + `translateY(4px)` when pressed.
- Button A visually "presses" (flash animation, ~180ms) whenever Enter is pressed or a game row is clicked, for tactile feedback.

**Caption below cabinet:**
- "Click a game, or use ↑↓ and ENTER" — VT323 19px, `#ffffff66`.

## Interactions & Behavior
- **Arrow Up/Down (keyboard, global):** move selection up/down through the game list, wraps at both ends.
- **Enter (keyboard, global):** launches the currently selected game (navigate to its URL/route).
- **Click on a row:** selects that row AND launches it immediately (same as Enter).
- **Launch feedback:** brief (~180ms) visual press on button A concurrent with navigation, so there's a beat of feedback before the page changes.
- **Scroll:** selected row must auto-scroll into view when changed via keyboard (list may be longer than the visible screen).
- No page-load animations, no screen shake, no blinking text elements.

## State Management
- `selectedIndex: number` — currently highlighted game.
- `games: { name, tag, url }[]` — data list, drives the on-screen rows.
- Navigation on select (`window.location.href = game.url` or router push, depending on target codebase).

## Design Tokens
**Colors:**
- Page background: `#0a0a12` → `#1a1626` radial gradient
- Cabinet marquee: `#2a2140` → `#1c1730`
- Cabinet body: `#4a4650` → `#2a2731` (charcoal grey)
- Cabinet/bezel border: `#4a3f6b`
- Screen background: `#030a06`
- Phosphor green (primary): `#00ff88`
- Phosphor green (dim/secondary): `#00cc6e`, `#00994d`
- Cyan accent: `#7de8ff`
- Magenta/red accent: `#ff3b6b`
- Orange accent: `#ffb454`

**Typography:**
- Display/labels: 'Press Start 2P' (pixel font) — title 34px, marquee label 15px, header labels 12px, button labels 14px
- Body/list text: 'VT323' (monospace pixel-style) — game names 19px, tags 15px, footer hints 17px, caption 19px, counter 20px

**Radius:** cabinet marquee top 18px, bezel 14px, screen 4px, buttons/joystick fully round.

**Shadows:** cabinet body `0 30px 60px #000000aa`; buttons raised `0 6px 0 #0006`; screen inset `inset 0 0 60px #000`.

## Assets
No image assets — everything is built from CSS gradients/shapes and the two Google Fonts (Press Start 2P, VT323), loaded via `fonts.googleapis.com`.

## Screen: High Scores
**Access:** From the Game Select screen, pressing → (right arrow) opens High Scores, defaulted to whichever game row is currently selected. ← (left arrow) returns to Game Select. While on High Scores, ↑/↓/→ all cycle through the game tabs (→ moves to next game; ↓ also moves next, ↑ moves previous) — this lets a controller with only arrows browse every game's board without a dedicated tab key.

**Layout (same cabinet chrome, screen content swaps):**
- Header row: "HIGH SCORES" label (left, Press Start 2P 12px, green glow) + "TOP 10" (right, VT323 20px, dim green).
- Game tabs: horizontal pill row, one per game (short label, truncated at first colon, e.g. "ASTEROIDS" from "ASTEROIDS: JUNGLE ACES"), wraps/scrolls if it overflows two lines (`max-height: 74px; overflow-y:auto`). Active tab: green border + tinted fill + bright text. Clickable to jump directly.
- Column headers: RANK / NAME / SCORE / DATE, dim green, 15px, thin bottom divider.
- 10 rows, one per rank. Top 3 rows get a subtle green tint background, orange rank number, brighter name/score text with soft glow. Ranks 4–10 are plain dim-green rows. Columns: rank (2-digit zero-padded), name, score (comma-formatted, right-aligned), date (right-aligned, dimmer/smaller).
- Personal best callout bar below the table: left-accented box (`#00ff8811` bg, `#00ff88` left border), "YOUR BEST: <score>" in cyan/white with glow, date right-aligned dim green.
- Footer hint row (same style as Game Select footer): "← BACK TO GAMES" / "↑↓→ SWITCH GAME".

**Data model:** each game has its own `top10: {name, score, date}[]` (pre-sorted desc) and a `personalBest: {score, date}`. All 14 games in the current mock have generated placeholder data — replace with real persisted scores.

## Screen: High Score Entry (overlay — not yet built in the prototype)
**Status:** Discussed but not implemented in this mockup pass. Recommended approach for whoever builds it next:
- No auth. This is a personal/family arcade, not a public leaderboard — don't gate score entry behind accounts/login.
- Standard entry prompt shared across all games (not per-game styling), rendered as an overlay on the arcade screen using the same VT323/phosphor visual language as the rest of the cabinet — classic "NEW HIGH SCORE — ENTER YOUR INITIALS" arcade pattern.
- Suggested interaction: 3-letter initials, one slot at a time, ↑/↓ cycles A–Z (or full name via on-screen keyboard if preferred), → / Enter confirms a letter and advances, ← steps back a slot; Enter on the last slot submits.
- Trigger condition: only shown when the just-finished game's score beats position 10 on that game's board (or beats the player's personal best, TBD — flag this decision to the user before building).
- This overlay needs its own follow-up mockup pass before implementation — flag to the user if starting fresh here.

## Files
- `Arcade Landing.dc.html` — the interactive HTML prototype (open directly in a browser to see the working keyboard/click nav across both Game Select and High Scores screens).
