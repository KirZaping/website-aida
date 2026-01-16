async function includeComponent(name) {
    const target = document.querySelector(`[data-include="${name}"]`);
    if (!target) return;

    const response = await fetch(`../components/${name}.html`, {
        cache: 'force-cache'
    });

    console.log(target, response);

    target.innerHTML = await response.text();

    if (name === "header") {
        initMobileMenu();
    }
}

function initMobileMenu() {
    const burger = document.querySelector(".burger");
    const mobileMenu = document.getElementById("mobileMenu");
    const closeBtn = document.querySelector(".mobile-menu-close");

    if (!burger || !mobileMenu || !closeBtn) {
        console.warn("Menu mobile : éléments manquants APRÈS injection");
        return;
    }

    burger.addEventListener("click", () => {
        mobileMenu.classList.add("open");
        document.body.style.overflow = "hidden";
    });

    closeBtn.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
    });

    document.querySelectorAll(".mobile-menu-nav a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            document.body.style.overflow = "";
        });
    });
}

includeComponent('header');
includeComponent('footer');
