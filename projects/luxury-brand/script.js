
// =========================================
// ATELIER NOIR — INTERACTION ENGINE
// =========================================


// ELEMENTS

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

const mobileLinks = document.querySelectorAll(".mobile-menu a");


// =========================================
// 1. MOBILE NAVIGATION
// =========================================

if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = mobileMenu.classList.toggle("open");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        document.body.style.overflow = isOpen ? "hidden" : "";

    });


    // CLOSE MENU WHEN A LINK IS CLICKED

    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute("aria-label", "Open navigation");

            document.body.style.overflow = "";

        });

    });


    // CLOSE MENU WITH ESCAPE KEY

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            mobileMenu.classList.remove("open");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute("aria-label", "Open navigation");

            document.body.style.overflow = "";

        }

    });

}


// =========================================
// 2. SCROLL REVEAL
// =========================================

const revealElements = document.querySelectorAll(
    ".philosophy-content, .projects-heading, .project-card, .studio-layout, .contact-content"
);


if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add("visible");

    });

}


// =========================================
// 3. HEADER SCROLL EFFECT
// =========================================

const header = document.querySelector(".site-header");


window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}, { passive: true });


// =========================================
// 4. PROJECT IMAGE MOVEMENT
// =========================================

const projectCards = document.querySelectorAll(".project-card");


projectCards.forEach((card) => {

    const image = card.querySelector(".project-image");

    if (!image) return;

    card.addEventListener("mouseenter", () => {

        image.style.transform = "scale(1.015)";

    });

    card.addEventListener("mouseleave", () => {

        image.style.transform = "scale(1)";

    });

});


// =========================================
// 5. CURRENT YEAR
// =========================================

const copyright = document.querySelector(".copyright");

if (copyright) {

    copyright.textContent = `© ${new Date().getFullYear()} ATELIER NOIR`;

}
