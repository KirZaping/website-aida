const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const impactSections = document.querySelectorAll(".impact-cards");

function updateImpactParallax() {
    impactSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const shift = window.innerHeight * 0.5 - rect.top;
        section.style.setProperty("--impact-shift", `${shift}px`);
    });
}

let impactTicking = false;

function requestImpactParallaxUpdate() {
    if (impactTicking) return;

    impactTicking = true;
    window.requestAnimationFrame(() => {
        updateImpactParallax();
        impactTicking = false;
    });
}

if (impactSections.length > 0) {
    updateImpactParallax();
    window.addEventListener("scroll", requestImpactParallaxUpdate, { passive: true });
    window.addEventListener("resize", requestImpactParallaxUpdate);
}

// -------- menu

document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger");
    const mobileMenu = document.getElementById("mobileMenu");
    const closeBtn = document.querySelector(".mobile-menu-close");

    if (!burger || !mobileMenu || !closeBtn) {
        console.warn("Menu mobile : éléments manquants dans le DOM");
        return;
    }

    burger.addEventListener("click", () => {
        mobileMenu.classList.add("open");
    });

    closeBtn.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
    });

    document.querySelectorAll(".mobile-menu-nav a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
        });
    });
});
