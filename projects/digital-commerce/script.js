
// ==========================================
// NEXUS INTELLIGENCE — INTERACTION ENGINE
// ==========================================


// 1. MOBILE NAVIGATION

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = mobileMenu.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", isOpen);

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

}


// 2. SCROLL EFFECTS

const header = document.querySelector(".header");
const pageProgress = document.querySelector(".page-progress");

function updateScrollEffects() {

    const scrollTop = window.scrollY;

    const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress =
        scrollableHeight > 0
            ? (scrollTop / scrollableHeight) * 100
            : 0;

    if (pageProgress) {
        pageProgress.style.width = `${progress}%`;
    }

    if (header) {
        header.classList.toggle("scrolled", scrollTop > 40);
    }

}

window.addEventListener("scroll", updateScrollEffects, {
    passive: true
});

updateScrollEffects();


// 3. SCROLL REVEAL

const revealElements = document.querySelectorAll(
    ".hero-copy, .hero-visual, .section-heading, " +
    ".story-intro, .story-visual, .dashboard, " +
    ".technology-content, .technology-visual, " +
    ".contact-content, .contact-visual"
);

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

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

    revealElements.forEach(element => {

        element.classList.add("reveal");
        revealObserver.observe(element);

    });

}


// 4. DASHBOARD CHART DATA

const chartData = {

    "1W": {
        values: [42, 48, 45, 58, 53, 67, 72],
        value: "$2.84M",
        change: "+8.4%"
    },

    "1M": {
        values: [28, 35, 32, 45, 42, 55, 51, 65, 61, 75],
        value: "$3.26M",
        change: "+12.8%"
    },

    "3M": {
        values: [18, 25, 22, 34, 30, 45, 40, 55, 52, 68, 63, 82],
        value: "$4.12M",
        change: "+24.6%"
    }

};

const chartButtons = document.querySelectorAll("[data-period]");
const chartValue = document.getElementById("chart-value");
const chartChange = document.getElementById("chart-change");

const chartLine = document.getElementById("chart-line-path");
const chartArea = document.getElementById("chart-area-path");

const chartPlot = document.querySelector(".chart-plot");
const hoverLine = document.querySelector(".chart-hover-line");
const hoverPoint = document.querySelector(".chart-hover-point");

let currentChartPoints = [];


function createChartPoints(values) {

    const width = 600;
    const height = 220;
    const padding = 12;

    const minimum = Math.min(...values);
    const maximum = Math.max(...values);

    const range = maximum - minimum || 1;

    return values.map((value, index) => {

        const x =
            padding +
            (index / (values.length - 1)) * (width - padding * 2);

        const y =
            height - padding -
            ((value - minimum) / range) * (height - padding * 2);

        return { x, y };

    });

}


function updateChart(period) {

    const data = chartData[period];

    if (!data || !chartLine || !chartArea) return;

    currentChartPoints = createChartPoints(data.values);

    const linePoints = currentChartPoints
        .map(point => `${point.x},${point.y}`)
        .join(" ");

    chartLine.setAttribute("points", linePoints);

    chartArea.setAttribute(
        "points",
        `0,220 ${linePoints} 600,220`
    );

    if (chartValue) {
        chartValue.textContent = data.value;
    }

    if (chartChange) {
        chartChange.textContent = data.change;
    }

    chartButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.period === period
        );

    });

    if (hoverLine) {
        hoverLine.style.opacity = "0";
    }

    if (hoverPoint) {
        hoverPoint.style.opacity = "0";
    }

}


// 5. CHART PERIOD BUTTONS

chartButtons.forEach(button => {

    button.addEventListener("click", () => {

        updateChart(button.dataset.period);

    });

});


// 6. CHART HOVER INTERACTION

if (chartPlot && hoverLine && hoverPoint) {

    chartPlot.addEventListener("mousemove", event => {

        if (!currentChartPoints.length) return;

        const rect = chartPlot.getBoundingClientRect();

        const mouseX =
            ((event.clientX - rect.left) / rect.width) * 600;

        let closestPoint = currentChartPoints[0];

        currentChartPoints.forEach(point => {

            if (
                Math.abs(point.x - mouseX) <
                Math.abs(closestPoint.x - mouseX)
            ) {
                closestPoint = point;
            }

        });

        hoverLine.setAttribute(
            "x1",
            closestPoint.x
        );

        hoverLine.setAttribute(
            "x2",
            closestPoint.x
        );

        hoverLine.style.opacity = "1";

        hoverPoint.setAttribute(
            "cx",
            closestPoint.x
        );

        hoverPoint.setAttribute(
            "cy",
            closestPoint.y
        );

        hoverPoint.style.opacity = "1";

    });

    chartPlot.addEventListener("mouseleave", () => {

        hoverLine.style.opacity = "0";
        hoverPoint.style.opacity = "0";

    });

}


// INITIALIZE CHART

updateChart("1M");


// ==========================================
// NEXUS INTELLIGENCE — READY
// ==========================================
