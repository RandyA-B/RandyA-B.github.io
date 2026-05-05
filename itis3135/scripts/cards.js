// Lightbox modal: clicking any card enlarges the image in an overlay
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.createElement("div");
    modal.id = "card-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Image preview");
    modal.innerHTML = `
        <div class="modal-backdrop">
            <div class="modal-box">
                <button class="modal-close" aria-label="Close preview">&times;</button>
                <img id="modal-img" src="" alt="">
                <p id="modal-caption"></p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.querySelectorAll(".card").forEach((card) => {
        card.style.cursor = "pointer";
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", "Click to enlarge " + card.querySelector("h3").textContent);

        const openModal = () => {
            const img = card.querySelector("img");
            document.getElementById("modal-img").src = img.src;
            document.getElementById("modal-img").alt = img.alt;
            document.getElementById("modal-caption").textContent = card.querySelector("h3").textContent;
            modal.style.display = "block";
            modal.querySelector(".modal-close").focus();
        };

        card.addEventListener("click", openModal);
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openModal();
            }
        });
    });

    const closeModal = () => { modal.style.display = "none"; };

    modal.querySelector(".modal-close").addEventListener("click", closeModal);
    modal.querySelector(".modal-backdrop").addEventListener("click", (e) => {
        if (e.target === e.currentTarget) closeModal();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });
});
