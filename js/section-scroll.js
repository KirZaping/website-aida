if (window.innerWidth > 768) {

    const sections = Array.from(
        document.querySelectorAll("main, .final-cta, .cards, .partners")
    );

    let currentIndex = 0;
    let isScrolling = false;

    // --- Scroll initial forcé ---
    window.addEventListener("load", () => {
        sections[0].scrollIntoView({ behavior: "instant", block: "start" });
        currentIndex = 0;
    });

    // --- Mise à jour de l’index actif ---
    function updateCurrentIndex() {
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        sections.forEach((section, index) => {
            if (section.offsetTop <= scrollPosition) {
                currentIndex = index;
            }
        });
    }

    window.addEventListener("scroll", updateCurrentIndex);

    // --- Scroll contrôlé ---
    window.addEventListener("wheel", (e) => {
        e.preventDefault();
        if (isScrolling) return;

        isScrolling = true;

        if (e.deltaY > 0 && currentIndex < sections.length - 1) {
            currentIndex++;
        } else if (e.deltaY < 0 && currentIndex > 0) {
            currentIndex--;
        }

        sections[currentIndex].scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        setTimeout(() => {
            isScrolling = false;
        }, 900);

    }, { passive: false });
}
