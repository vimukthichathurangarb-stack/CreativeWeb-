
// ============================================
// CREATIVEWEB — PROJECT STUDIO
// INTERACTION ENGINE
// ============================================


// 1. MOBILE NAVIGATION

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = mobileMenu.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute("aria-expanded", String(isOpen));

    });

    mobileMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

        });

    });

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            mobileMenu.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

        }

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 760) {

            mobileMenu.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

        }

    });

}


// 2. SCROLL PROGRESS

const pageProgress = document.querySelector(".page-progress");

function updateProgress() {

    const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = totalHeight > 0
        ? (window.scrollY / totalHeight) * 100
        : 0;

    if (pageProgress) {

        pageProgress.style.width = `${progress}%`;

    }

}

window.addEventListener("scroll", updateProgress, {
    passive: true
});

updateProgress();


// 3. PROJECT OPTION INTERACTION

const projectOptions = document.querySelectorAll(".option-card");

projectOptions.forEach(option => {

    option.addEventListener("click", () => {

        projectOptions.forEach(card => {

            card.classList.remove("selected");

        });

        option.classList.add("selected");

    });

});


// 4. WHATSAPP PROJECT INQUIRY

const projectForm = document.getElementById("project-form");

const formMessage = document.getElementById("form-message");

const submitButton = document.getElementById("submit-button");

// Your CreativeWeb WhatsApp number
const whatsappNumber = "947148903387";

if (projectForm) {

    projectForm.addEventListener("submit", event => {

        event.preventDefault();

        // Collect visitor information

        const name = document.getElementById("client-name").value.trim();

        const email = document.getElementById("client-email").value.trim();

        const business = document.getElementById("business-name").value.trim();

        const project = document.querySelector(
            'input[name="project"]:checked'
        );

        const budget = document.getElementById("project-budget").value;

        const message = document.getElementById("project-message").value.trim();


        // Validate required fields

        if (!name || !email || !project || !message) {

            formMessage.textContent =
                "Please complete all required fields.";

            return;

        }


        // Create personalised WhatsApp message

        const whatsappMessage = `
Hello CreativeWeb!

I'd like to discuss a new project.

CLIENT INFORMATION
------------------
Name: ${name}
Email: ${email}
Business: ${business || "Not provided"}

PROJECT DETAILS
---------------
Project Type: ${project.value}
Budget: ${budget || "Not specified"}

PROJECT DESCRIPTION
-------------------
${message}

------------------
Sent from the CreativeWeb Project Studio.
        `.trim();


        // Convert message into a URL-safe format

        const encodedMessage = encodeURIComponent(whatsappMessage);


        // Build WhatsApp link

        const whatsappLink =
            `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;


        // Update button and confirmation message

        submitButton.disabled = true;

        submitButton.textContent = "OPENING WHATSAPP...";

        formMessage.textContent =
            "Your project inquiry is ready. WhatsApp will open with your message. Please review and press Send.";


        // Open WhatsApp

        window.open(whatsappLink, "_blank", "noopener,noreferrer");


        // Restore button

        setTimeout(() => {

            submitButton.disabled = false;

            submitButton.innerHTML =
                'SEND PROJECT INQUIRY <span>↗</span>';

        }, 2000);

    });

}


// ============================================
// CREATIVEWEB — PROJECT STUDIO READY
// ============================================
