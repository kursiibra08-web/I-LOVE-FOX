(() => {
    "use strict";

    // ---------- Content ----------

    const FACTS = [
        "Rubah merah memiliki persebaran luas di belahan bumi utara.",
        "Rubah fennec adalah spesies terkecil dalam keluarga anjing (Canidae).",
        "Telinga besar rubah fennec membantu melepaskan panas tubuh di gurun.",
        "Rubah merah menggunakan ekornya untuk membantu menjaga keseimbangan.",
        "Telapak kaki rubah fennec ditutupi bulu yang membantu melindunginya dari pasir panas.",
    ];

    // Chapter N is linked from the N-th item of the ".list-1" list at the top.
    const CHAPTERS = [
        { selector: ".penjelasan-1", id: "rubah-merah" },
        { selector: ".penjelasan-2", id: "rubah-fennec" },
    ];

    // ---------- Styles for everything this script creates ----------
    // style.css has no rule for plain links or for buttons, so without these
    // the browser's default blue/purple links are almost invisible on the dark
    // theme. The colours below reuse the tokens and the glow from style.css.

    const STYLE_ID = "fox-script-styles";

    const STYLES = `
        .fox-anchor {
            scroll-margin-top: 20px;
        }

        .fox-link {
            color: var(--accent-2, #22d3ee);
            font-weight: 700;
            text-decoration: none;
            transition: color 0.25s ease, text-shadow 0.25s ease;
        }

        .fox-link:hover {
            color: #67e8f9;
            text-shadow: 0 0 12px rgba(34, 211, 238, 0.8);
        }

        .fox-link:focus-visible,
        #fakta-rubah button:focus-visible {
            outline: 2px solid var(--accent-2, #22d3ee);
            outline-offset: 3px;
        }

        /* Make the whole list card clickable, not just the words inside it. */
        .list-1 li > .fox-link {
            display: block;
            margin: -14px -20px;
            padding: 14px 20px;
            border-radius: 12px;
        }

        #kembali-ke-atas {
            text-align: center;
        }

        #fakta-rubah button {
            font: inherit;
            padding: 10px 18px;
            border-radius: 12px;
            border: 1px solid var(--accent-2, #22d3ee);
            background: var(--bg-2, #190933);
            color: var(--text, #f3f0ff);
            cursor: pointer;
            transition: background 0.25s ease, box-shadow 0.25s ease;
        }

        #fakta-rubah button:hover {
            background: rgba(34, 211, 238, 0.15);
            box-shadow: 0 0 16px rgba(34, 211, 238, 0.35);
        }

        @media (prefers-reduced-motion: reduce) {
            .fox-link,
            #fakta-rubah button {
                transition: none;
            }
        }
    `;

    // ---------- Helpers ----------

    function addStyles() {
        if (document.getElementById(STYLE_ID)) return;

        const style = document.createElement("style");
        style.id = STYLE_ID;
        style.textContent = STYLES;
        document.head.append(style);
    }

    // Gives an element an id so it can be linked to, and makes it focusable so
    // keyboard and screen-reader users land on it after following the link.
    function makeLinkTarget(element, fallbackId) {
        element.id = element.id || fallbackId;
        element.tabIndex = -1;
        element.classList.add("fox-anchor");
        return element.id;
    }

    // ---------- Features (each one works on its own) ----------

    function addChapterLinks() {
        const items = document.querySelectorAll(".list-1 li");

        CHAPTERS.forEach(({ selector, id }, index) => {
            const heading = document.querySelector(selector);
            const item = items[index];
            // Skip if the heading/item is missing, or if this item is already a link.
            if (!heading || !item || item.querySelector("a")) return;

            const targetId = makeLinkTarget(heading, id);
            const link = document.createElement("a");
            link.className = "fox-link";
            link.href = `#${targetId}`;
            link.textContent = item.textContent.trim();
            item.replaceChildren(link);
        });
    }

    function addFoxFacts() {
        const intro = document.querySelector("body > section");
        if (!intro || document.getElementById("fakta-rubah")) return;

        let currentIndex = 0;

        const panel = document.createElement("section");
        panel.id = "fakta-rubah";
        panel.className = "why"; // reuse the glass-card look from style.css
        panel.setAttribute("aria-labelledby", "judul-fakta-rubah");

        const heading = document.createElement("h2");
        heading.id = "judul-fakta-rubah";
        heading.textContent = "Tahukah kamu?";

        const text = document.createElement("p");
        text.id = "teks-fakta-rubah";
        text.setAttribute("aria-live", "polite");
        text.setAttribute("aria-atomic", "true");
        text.textContent = FACTS[currentIndex];

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Fakta rubah lainnya";
        button.setAttribute("aria-controls", text.id);
        button.addEventListener("click", () => {
            // Step forward by 1..(n-1) places so the fact always changes,
            // without any retry loop.
            const offset = 1 + Math.floor(Math.random() * (FACTS.length - 1));
            currentIndex = (currentIndex + offset) % FACTS.length;
            text.textContent = FACTS[currentIndex];
        });

        panel.append(heading, text, button);
        intro.after(panel);
    }

    function addBackToTop() {
        const title = document.querySelector(".judul-1");
        if (!title || document.getElementById("kembali-ke-atas")) return;

        const link = document.createElement("a");
        link.className = "fox-link";
        link.href = `#${makeLinkTarget(title, "atas")}`;
        link.textContent = "Kembali ke atas ↑";

        const container = document.createElement("p");
        container.id = "kembali-ke-atas";
        container.append(link);
        document.body.append(container);
    }

    function initialize() {
        addStyles();
        addChapterLinks();
        addFoxFacts();
        addBackToTop();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize, { once: true });
    } else {
        initialize();
    }
})();