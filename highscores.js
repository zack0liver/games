// Shared high-score storage + initials-entry overlay for the arcade's
// single-player, score-based games. Loaded via <script src="highscores.js">
// in each game file and in index.html.
(function () {
    const KEY_PREFIX = 'arcade_hs_';
    const MAX_ROWS = 10;

    function today() {
        return new Date().toISOString().slice(0, 10);
    }

    function emptyBoard() {
        return { top10: [], personalBest: { score: 0, date: null } };
    }

    function load(slug) {
        try {
            const raw = localStorage.getItem(KEY_PREFIX + slug);
            if (raw) return JSON.parse(raw);
        } catch (e) { /* corrupt data, fall through to migration/empty */ }
        return null;
    }

    function save(slug, board) {
        localStorage.setItem(KEY_PREFIX + slug, JSON.stringify(board));
    }

    // Seeds arcade_hs_<slug> from a game's old single-value localStorage key,
    // the first time this runs after the shared board format shipped.
    function migrate(slug, legacyKey) {
        const legacyValue = legacyKey ? parseInt(localStorage.getItem(legacyKey) || '0', 10) : 0;
        const board = emptyBoard();
        if (legacyValue > 0) {
            board.top10 = [{ name: 'YOU', score: legacyValue, date: null }];
            board.personalBest = { score: legacyValue, date: null };
        }
        save(slug, board);
        return board;
    }

    function getBoard(slug, legacyKey) {
        return load(slug) || migrate(slug, legacyKey);
    }

    function checkQualifies(slug, score, legacyKey) {
        const board = getBoard(slug, legacyKey);
        if (score > board.personalBest.score) return true;
        if (board.top10.length < MAX_ROWS) return true;
        return score > board.top10[board.top10.length - 1].score;
    }

    function recordScore(slug, name, score) {
        const board = getBoard(slug);
        board.top10.push({ name, score, date: today() });
        board.top10.sort((a, b) => b.score - a.score);
        board.top10 = board.top10.slice(0, MAX_ROWS);
        if (score > board.personalBest.score) {
            board.personalBest = { score, date: today() };
        }
        save(slug, board);
        return board;
    }

    // ---- Initials entry overlay ----

    let stylesInjected = false;
    function injectStyles() {
        if (stylesInjected) return;
        stylesInjected = true;

        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap';
        document.head.appendChild(fontLink);

        const style = document.createElement('style');
        style.textContent = `
            #hs-overlay {
                position: fixed;
                inset: 0;
                z-index: 9999;
                background: #000000cc;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'VT323', monospace;
            }
            #hs-overlay .hs-panel {
                background: #17141f;
                border: 3px solid #4a3f6b;
                border-radius: 14px;
                padding: 30px 40px;
                text-align: center;
                box-shadow: 0 20px 50px #000c;
            }
            #hs-overlay .hs-title {
                font-family: 'Press Start 2P', monospace;
                font-size: 16px;
                color: #ff3b6b;
                text-shadow: 0 0 8px #ff3b6b;
                letter-spacing: 2px;
                margin-bottom: 22px;
            }
            #hs-overlay .hs-slots {
                display: flex;
                gap: 16px;
                justify-content: center;
                margin-bottom: 20px;
            }
            #hs-overlay .hs-slot {
                width: 40px;
                font-size: 40px;
                color: #00cc6e;
                border-bottom: 3px solid #0f4a2c;
            }
            #hs-overlay .hs-slot.active {
                color: #e8fff2;
                text-shadow: 0 0 10px #00ff88;
                border-bottom-color: #00ff88;
            }
            #hs-overlay .hs-hint {
                font-size: 16px;
                color: #00ff8899;
            }
        `;
        document.head.appendChild(style);
    }

    function showInitialsOverlay(opts) {
        injectStyles();
        const slots = ['A', 'A', 'A'];
        let active = 0;

        const overlay = document.createElement('div');
        overlay.id = 'hs-overlay';
        overlay.innerHTML = `
            <div class="hs-panel">
                <div class="hs-title">NEW HIGH SCORE</div>
                <div class="hs-slots">
                    <span class="hs-slot" data-i="0"></span>
                    <span class="hs-slot" data-i="1"></span>
                    <span class="hs-slot" data-i="2"></span>
                </div>
                <div class="hs-hint">&uarr;&darr; LETTER &middot; &rarr; NEXT &middot; &larr; BACK &middot; ENTER DONE</div>
            </div>
        `;
        document.body.appendChild(overlay);
        const slotEls = overlay.querySelectorAll('.hs-slot');

        function render() {
            slotEls.forEach((el, i) => {
                el.textContent = slots[i];
                el.classList.toggle('active', i === active);
            });
        }

        function submit() {
            window.removeEventListener('keydown', onKey, true);
            overlay.remove();
            opts.onSubmit(slots.join(''));
        }

        function onKey(e) {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                slots[active] = String.fromCharCode(((slots[active].charCodeAt(0) - 65 + 1) % 26) + 65);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                slots[active] = String.fromCharCode(((slots[active].charCodeAt(0) - 65 + 25) % 26) + 65);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                active = Math.min(2, active + 1);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                active = Math.max(0, active - 1);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (active === 2) { submit(); return; }
                active += 1;
            } else {
                return;
            }
            render();
        }

        overlay.addEventListener('click', (e) => {
            const slotEl = e.target.closest('.hs-slot');
            if (slotEl) active = parseInt(slotEl.dataset.i, 10);
            render();
        });

        window.addEventListener('keydown', onKey, true);
        render();
    }

    window.HS = { getBoard, checkQualifies, recordScore, showInitialsOverlay };
})();
