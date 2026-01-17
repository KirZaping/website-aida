async function loadOffer() {
    const params = new URLSearchParams(window.location.search);
    const offerId = params.get("offer");

    if (!offerId) return;

    const response = await fetch("/assets/data/offers.json");
    const offers = await response.json();

    const offer = offers[offerId];
    if (!offer) return;

    document.getElementById("offer-name").textContent = offer.name;
    document.getElementById("offer-price").textContent = offer.price;

    const includedList = document.getElementById("offer-included");
    offer.included.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        includedList.appendChild(li);
    });

    const optionsList = document.getElementById("offer-options");
    offer.options.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        optionsList.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", loadOffer);
