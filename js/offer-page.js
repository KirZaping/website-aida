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
