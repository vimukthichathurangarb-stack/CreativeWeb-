
/* ======================================
   CREATIVEWEB — INTERACTION ENGINE
====================================== */


/* 1. ELEMENTS */

const visual = document.querySelector(".visual-composition");
const entrance = document.querySelector(".entrance");

const menuToggle = document.getElementById("menu-toggle");
const navigationPanel = document.getElementById("navigation-panel");


/* 2. ENTRANCE MOUSE INTERACTION */

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

if (visual && entrance && !reducedMotion.matches) {

    entrance.addEventListener("mousemove", (event) => {

        const rect = entrance.getBoundingClientRect();

        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const moveX = (mouseX - centerX) / centerX;
        const moveY = (mouseY - centerY) / centerY;

        const rotateY = moveX * 8;
        const rotateX = moveY * -8;

        visual.style.transform = `
            translateY(-50%)
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;

    });

    entrance.addEventListener("mouseleave", () => {

        visual.style.transform = `
            translateY(-50%)
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
        `;

    });

}


/* 3. NAVIGATION PANEL */

function closeMenu() {

    if (!menuToggle || !navigationPanel) return;

    menuToggle.classList.remove("active");
    navigationPanel.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");

    navigationPanel.setAttribute("aria-hidden", "true");

    document.body.classList.remove("menu-open");
    menuToggle.focus();
}


if (menuToggle && navigationPanel) {

    menuToggle.addEventListener("click", () => {

        const isOpen = !navigationPanel.classList.contains("open");

        navigationPanel.classList.toggle("open", isOpen);
        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        navigationPanel.setAttribute(
            "aria-hidden",
            String(!isOpen)
        );

        document.body.classList.toggle("menu-open", isOpen);
         if (isOpen) {
            navigationPanel.querySelector("a")?.focus();
        }

    });


    // Close menu after selecting a destination

    navigationPanel.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", closeMenu);

    });


    // Close menu with Escape key

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });

}


/* 4. PREVENT PARALLAX ON REDUCED MOTION */

if (reducedMotion.matches && visual) {

    visual.style.transform = "translateY(-50%)";

}
