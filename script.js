(() => {
    "use strict";

    function addChapterLinks() {
        const chapters = [
            { selector: ".penjelasan-1", id: "rubah-merah" },
            { selector: ".penjelasan-2", id: "rubah-fennec" },
        ];
        const items = document.querySelectorAll(".list-1 li");

        chapters.forEach(({ selector, id }, index) => {
            const heading = document.querySelector(selector);
            const item = items[index];
            if (!heading || !item) return;

            heading.id = heading.id || id;
            heading.tabIndex = -1;
            const link = document.createElement("a");
            link.href = `#${heading.id}`;
            link.textContent = item.textContent.trim();
            item.replaceChildren(link);
        });
    }

    function addFoxFacts(intro) {
        const facts = [
            "Rubah merah memiliki persebaran luas di belahan bumi utara.",
            "Rubah fennec adalah spesies terkecil dalam keluarga anjing (Canidae).",
            "Telinga besar rubah fennec membantu melepaskan panas tubuh di gurun.",
            "Rubah merah menggunakan ekornya untuk membantu menjaga keseimbangan.",
            "Telapak kaki rubah fennec ditutupi bulu yang membantu melindunginya dari pasir panas.",
        ];
        let currentIndex = 0;
        const panel = document.createElement("section");
        panel.id = "fakta-rubah";
        panel.className = "why";
        panel.style.textAlign = "center";
        panel.setAttribute("aria-labelledby", "judul-fakta-rubah");

        const heading = document.createElement("h2");
        heading.id = "judul-fakta-rubah";
        heading.textContent = "Tahukah kamu?";

        const text = document.createElement("p");
        text.id = "teks-fakta-rubah";
        text.setAttribute("aria-live", "polite");
        text.setAttribute("aria-atomic", "true");
        text.textContent = facts[currentIndex];

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Fakta rubah lainnya";
        button.setAttribute("aria-controls", text.id);
        Object.assign(button.style, {
            font: "inherit",
            padding: "10px 18px",
            borderRadius: "12px",
            border: "1px solid var(--accent-2, #22d3ee)",
            background: "var(--bg-2, #190933)",
            color: "var(--text, #f3f0ff)",
            cursor: "pointer",
        });
        button.addEventListener("click", () => {
            // Choose a different fact each time, without retry loops.
            const offset = 1 + Math.floor(Math.random() * (facts.length - 1));
            currentIndex = (currentIndex + offset) % facts.length;
            text.textContent = facts[currentIndex];
        });

        panel.append(heading, text, button);
        intro.after(panel);
    }

    function addBackToTop() {
        const title = document.querySelector(".judul-1");
        if (!title) return;

        title.id = title.id || "atas";
        title.tabIndex = -1;
        const container = document.createElement("p");
        container.style.textAlign = "center";
        const link = document.createElement("a");
        link.href = `#${title.id}`;
        link.textContent = "Kembali ke atas ↑";
        container.append(link);
        document.body.append(container);
    }

    function initialize() {
        const intro = document.querySelector("body > section");
        if (!intro || document.getElementById("fakta-rubah")) return;

        addChapterLinks();
        addFoxFacts(intro);
        addBackToTop();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize, { once: true });
    } else {
        initialize();
    }
})();
