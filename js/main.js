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
