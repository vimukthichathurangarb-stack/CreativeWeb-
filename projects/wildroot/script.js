
// ============================================
// WILDROOT — INTERACTION ENGINE
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


// 2. SCROLL PROGRESS + HEADER

const header = document.querySelector(".header");
const pageProgress = document.querySelector(".page-progress");

function updateScroll() {
    const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollableHeight > 0
        ? (window.scrollY / scrollableHeight) * 100
        : 0;

    if (pageProgress) {
        pageProgress.style.width = `${progress}%`;
    }

    if (header) {
        header.classList.toggle("scrolled", window.scrollY > 60);
    }
}

window.addEventListener("scroll", updateScroll, { passive: true });
updateScroll();


// 3. SCROLL REVEAL

const revealElements = document.querySelectorAll(
    ".section-heading, .ecosystem-panel, .atlas-detail, .impact-card, .closing-content"
);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });
}


// 4. ECOSYSTEM EXPLORER

const ecosystems = {
    forest: {
        category: "THE GREEN KINGDOM",
        title: "Where life takes root.",
        description: "Enter ancient forests where towering trees create entire worlds. Every branch, leaf and hidden pathway plays a role in an extraordinary living system.",
        number: "01",
        symbol: "♧",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=85"
    },

    water: {
        category: "THE BLUE PLANET",
        title: "Life beneath the surface.",
        description: "Explore rivers, wetlands and oceans. Water connects distant ecosystems and sustains an incredible variety of life.",
        number: "02",
        symbol: "≈",
        image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1400&q=85"
    },

    mountains: {
        category: "ABOVE THE CLOUDS",
        title: "A world of extremes.",
        description: "Discover mountain environments shaped by wind, ice and time. Life here adapts to some of the most demanding conditions on Earth.",
        number: "03",
        symbol: "△",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85"
    },

    wildlife: {
        category: "THE WILD FRONTIER",
        title: "Every life has a place.",
        description: "Meet the animals that make ecosystems extraordinary. From the smallest insects to powerful mammals, every species has a role.",
        number: "04",
        symbol: "✳",
        image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1400&q=85"
    }
};

const ecosystemButtons = document.querySelectorAll(".ecosystem-option");
const ecosystemVisual = document.getElementById("ecosystem-visual");

function selectEcosystem(name) {
    const data = ecosystems[name];

    if (!data) return;

    ecosystemButtons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.ecosystem === name
        );
    });

    const category = document.getElementById("ecosystem-category");
    const title = document.getElementById("ecosystem-title");
    const description = document.getElementById("ecosystem-description");
    const number = document.getElementById("ecosystem-number");
    const symbol = document.getElementById("ecosystem-symbol");

    if (category) category.textContent = data.category;
    if (title) title.textContent = data.title;
    if (description) description.textContent = data.description;
    if (number) number.textContent = data.number;
    if (symbol) symbol.textContent = data.symbol;

    if (ecosystemVisual) {
        ecosystemVisual.style.backgroundImage = `url("${data.image}")`;
    }
}

ecosystemButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectEcosystem(button.dataset.ecosystem);
    });
});


// 5. WILD ATLAS

const atlasPlaces = [
    {
        id: "amazon",
        number: "01 / 04",
        title: "The Amazon",
        description: "A vast tropical rainforest in South America, home to an extraordinary diversity of plants, animals and freshwater life.",
        habitat: "Tropical rainforest",
        region: "South America"
    },
    {
        id: "congo",
        number: "02 / 04",
        title: "The Congo Basin",
        description: "A major Central African rainforest system supporting forest elephants, great apes and countless other species.",
        habitat: "Tropical rainforest",
        region: "Central Africa"
    },
    {
        id: "sinharaja",
        number: "03 / 04",
        title: "Sinharaja Forest",
        description: "A remarkable Sri Lankan rainforest known for its endemic wildlife, rich vegetation and complex forest habitats.",
        habitat: "Lowland rainforest",
        region: "Sri Lanka"
    },
    {
        id: "galapagos",
        number: "04 / 04",
        title: "The Galápagos",
        description: "An island ecosystem in the Pacific Ocean, famous for unique wildlife and remarkable adaptations to isolated environments.",
        habitat: "Island ecosystem",
        region: "Eastern Pacific"
    }
];

let currentAtlasIndex = 0;

const mapPoints = document.querySelectorAll(".map-point");

function showAtlasPlace(index) {
    currentAtlasIndex =
        (index + atlasPlaces.length) % atlasPlaces.length;

    const place = atlasPlaces[currentAtlasIndex];

    const number = document.getElementById("atlas-number");
    const title = document.getElementById("atlas-title");
    const description = document.getElementById("atlas-description");
    const habitat = document.getElementById("atlas-habitat");
    const region = document.getElementById("atlas-region");
    const progress = document.getElementById("atlas-progress-bar");

    if (number) number.textContent = place.number;
    if (title) title.textContent = place.title;
    if (description) description.textContent = place.description;
    if (habitat) habitat.textContent = place.habitat;
    if (region) region.textContent = place.region;

    if (progress) {
        progress.style.width =
            `${((currentAtlasIndex + 1) / atlasPlaces.length) * 100}%`;
    }

    mapPoints.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.place === place.id
        );
    });
}

mapPoints.forEach(button => {
    button.addEventListener("click", () => {
        const index = atlasPlaces.findIndex(
            place => place.id === button.dataset.place
        );

        if (index !== -1) showAtlasPlace(index);
    });
});

const atlasPrevious = document.getElementById("atlas-prev");
const atlasNext = document.getElementById("atlas-next");

if (atlasPrevious) {
    atlasPrevious.addEventListener("click", () => {
        showAtlasPlace(currentAtlasIndex - 1);
    });
}

if (atlasNext) {
    atlasNext.addEventListener("click", () => {
        showAtlasPlace(currentAtlasIndex + 1);
    });
}

showAtlasPlace(0);


// 6. SCROLLING STORY

const storyChapters = document.querySelectorAll(".story-chapter");

const storyImages = [
    document.querySelector(".story-image-one"),
    document.querySelector(".story-image-two"),
    document.querySelector(".story-image-three")
];

const storyNumber = document.getElementById("story-number");

function activateStoryChapter(chapter) {
    const index = Number(chapter) - 1;

    storyImages.forEach((image, imageIndex) => {
        if (image) {
            image.classList.toggle("active", imageIndex === index);
        }
    });

    if (storyNumber) {
        storyNumber.textContent = String(chapter).padStart(2, "0");
    }
}

if ("IntersectionObserver" in window) {
    const storyObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activateStoryChapter(entry.target.dataset.chapter);
            }
        });
    }, {
        threshold: 0.5
    });

    storyChapters.forEach(chapter => {
        storyObserver.observe(chapter);
    });
}


// 7. WILDLIFE ENCOUNTERS

const animals = {
    elephant: {
        category: "THE GENTLE GIANT",
        name: "Asian Elephant",
        description: "An intelligent and social giant of Asian forests and grasslands. Elephants help shape their habitats by moving seeds and opening pathways through vegetation.",
        habitat: "Asian forests and grasslands",
        status: "Endangered",
        number: "01 / 04",
        image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1400&q=85"
    },

    leopard: {
        category: "THE SILENT HUNTER",
        name: "Snow Leopard",
        description: "A highly adapted mountain predator with thick fur and a long balancing tail. It lives across the high mountains of Central and South Asia.",
        habitat: "High mountain environments",
        status: "Vulnerable",
        number: "02 / 04",
        image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1400&q=85"
    },

    turtle: {
        category: "THE OCEAN TRAVELLER",
        name: "Green Sea Turtle",
        description: "A long-distance ocean traveller that depends on healthy marine habitats and safe nesting beaches to complete its life cycle.",
        habitat: "Tropical and subtropical oceans",
        status: "Endangered",
        number: "03 / 04",
        image: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=1400&q=85"
    },

    orangutan: {
        category: "THE FOREST THINKER",
        name: "Orangutan",
        description: "An intelligent great ape that spends much of its life in trees. Orangutans play an important role in rainforest seed dispersal.",
        habitat: "Rainforests of Borneo and Sumatra",
        status: "Critically endangered",
        number: "04 / 04",
        image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1400&q=85"
    }
};

const animalButtons = document.querySelectorAll(".animal-option");
const wildlifeImage = document.querySelector(".wildlife-feature-image");

function selectAnimal(name) {
    const animal = animals[name];

    if (!animal) return;

    animalButtons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.animal === name
        );
    });

    const category = document.getElementById("animal-category");
    const title = document.getElementById("animal-name");
    const description = document.getElementById("animal-description");
    const habitat = document.getElementById("animal-habitat");
    const status = document.getElementById("animal-status");
    const number = document.getElementById("animal-number");

    if (category) category.textContent = animal.category;
    if (title) title.textContent = animal.name;
    if (description) description.textContent = animal.description;
    if (habitat) habitat.textContent = animal.habitat;
    if (status) status.textContent = animal.status;
    if (number) number.textContent = animal.number;

    if (wildlifeImage) {
        wildlifeImage.style.backgroundImage = `url("${animal.image}")`;
    }
}

animalButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectAnimal(button.dataset.animal);
    });
});


// 8. CONSERVATION COUNTERS

const impactNumbers = document.querySelectorAll(".impact-number");

function animateCounter(element) {
    const target = Number(element.dataset.count);

    if (!Number.isFinite(target)) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        element.textContent = target;
        return;
    }

    const duration = 1400;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const progress = Math.min(
            (currentTime - startTime) / duration,
            1
        );

        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(target * easedProgress);

        element.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    impactNumbers.forEach(number => {
        counterObserver.observe(number);
    });
} else {
    impactNumbers.forEach(animateCounter);
}


// ============================================
// WILDROOT — ENGINE READY
// ============================================
