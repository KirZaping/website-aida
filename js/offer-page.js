function setText(id, value) {
    const element = document.getElementById(id);
    if (!element) return;
    element.textContent = value ?? "";
}

async function loadOffer() {
    const params = new URLSearchParams(window.location.search);
    const offerId = params.get("offer");

    if (!offerId) return;

    const response = await fetch("/assets/data/offers.json");
    const offers = await response.json();
    const offer = offers[offerId];

    if (!offer) return;

    document.title = `AIDA - ${offer.name}`;

    setText("offer-category", offer.category);
    setText("offer-name", offer.name);
    setText("offer-description", offer.description);
    setText("offer-price-label", offer.price_label);
    setText("offer-price", offer.price);
    setText("offer-badge", offer.purchase_badge);
    setText("offer-purchase-detail", offer.purchase_detail);
    setText("offer-outcome", offer.outcome);
    setText("offer-format-label", offer.format_label);
    setText("offer-format", offer.format);
    setText("offer-included-kicker", offer.included_kicker);
    setText("offer-included-title", offer.included_title);
    setText("offer-included-intro", offer.included_intro);
    setText("offer-options-title", offer.options_title);

    const image = document.getElementById("offer-image");
    image.src = offer.image;
    image.alt = `${offer.name} - visuel de l'offre`;

    const gallery = document.getElementById("offer-gallery");
    const galleryTrack = document.getElementById("offer-gallery-track");
    galleryTrack.innerHTML = "";

    if (offer.extend_picture && offer.extend_picture.length > 0) {
        gallery.hidden = false;
        offer.extend_picture.forEach((src, index) => {
            const item = document.createElement("button");
            item.type = "button";
            item.className = "offer-gallery-item";
            item.setAttribute("aria-label", `Voir l'image ${index + 1} de l'offre`);

            const thumb = document.createElement("img");
            thumb.src = src;
            thumb.alt = `${offer.name} - vue ${index + 1}`;
            thumb.className = "offer-gallery-image";

            item.appendChild(thumb);
            item.addEventListener("click", () => {
                image.src = src;
                image.alt = `${offer.name} - vue ${index + 1}`;
                galleryTrack
                    .querySelectorAll(".offer-gallery-item")
                    .forEach((node) => node.classList.remove("is-active"));
                item.classList.add("is-active");
            });

            if (index === 0) {
                item.classList.add("is-active");
            }

            galleryTrack.appendChild(item);
        });
    } else {
        gallery.hidden = true;
    }

    const cta = document.getElementById("offer-cta");
    cta.textContent = offer.cta_label;
    cta.href = "mailto:aidanetcom@gmail.com";
    cta.dataset.mailTemplate = offer.cta_template;
    cta.dataset.mailSubject = offer.cta_subject;

    const includedList = document.getElementById("offer-included");
    includedList.innerHTML = "";
    offer.included.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        includedList.appendChild(li);
    });

    const optionsList = document.getElementById("offer-options");
    const optionsSection = document.getElementById("offer-options-section");
    optionsList.innerHTML = "";

    if (!offer.options || offer.options.length === 0) {
        optionsSection.hidden = true;
        return;
    }

    optionsSection.hidden = false;
    offer.options.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        optionsList.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", loadOffer);
