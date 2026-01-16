document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-mail-template]").forEach(button => {
        button.addEventListener("click", async (e) => {
            e.preventDefault();

            const templatePath = button.dataset.mailTemplate;

            try {
                const response = await fetch(templatePath);
                if (!response.ok) {
                    throw new Error("Template introuvable");
                }

                const text = await response.text();

                const subject = encodeURIComponent(
                    "Prise de rendez-vous gratuit — AIDA"
                );

                const body = encodeURIComponent(text);

                window.location.href =
                    `mailto:aidanetcom@gmail.com?subject=${subject}&body=${body}`;

            } catch (error) {
                console.error("Erreur lors du chargement de la template mail :", error);
                alert(
                    "Impossible d’ouvrir la prise de contact automatiquement.\n" +
                    "Merci de nous écrire directement à aidanetcom@gmail.com"
                );
            }
        });
    });
});
