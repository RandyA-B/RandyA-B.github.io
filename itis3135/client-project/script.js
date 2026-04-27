// Dynamic header, navigation, and footer (all pages)
(function () {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    const navLinks = [
        { href: "index.html", label: "Home" },
        { href: "cooking.html", label: "Cooking Recipes" },
        { href: "baking.html", label: "Baking Recipes" },
        { href: "about.html", label: "About the Chef" },
        { href: "contact.html", label: "Contact / Submit a Recipe" }
    ];

    const header = document.getElementById("site-header");
    if (header) {
        header.innerHTML = '<h1 class="site-name">Skinner\'s Recipes</h1>';
    }

    const nav = document.getElementById("main-nav");
    if (nav) {
        const items = navLinks.map(function (link) {
            const isActive = currentPage === link.href;
            return "<li><a href=\"" + link.href + "\"" + (isActive ? " class=\"active\"" : "") + ">" + link.label + "</a></li>";
        }).join("");
        nav.innerHTML = "<ul>" + items + "</ul>";
    }

    const footer = document.getElementById("site-footer");
    if (footer) {
        footer.innerHTML =
            "<p>&copy; 2026 Skinner's Recipes</p>" +
            "<p><a href=\"https://validator.w3.org/\">HTML Validation</a> | " +
            "<a href=\"https://jigsaw.w3.org/css-validator/\">CSS Validation</a></p>";
    }
}());

// Slideshow (index.html)
const slides = document.getElementsByClassName("slide");
if (slides.length > 0) {
    let slideIndex = 0;

    function showSlides() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) slideIndex = 1;
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 3000);
    }

    showSlides();
}

// Recipe category filter (cooking.html, baking.html)
const filterButtons = document.querySelectorAll(".filter-btn");
if (filterButtons.length > 0) {
    const cards = document.querySelectorAll(".recipe-card");

    filterButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            filterButtons.forEach(function (b) { b.classList.remove("filter-active"); });
            btn.classList.add("filter-active");

            const filter = btn.getAttribute("data-filter");
            cards.forEach(function (card) {
                if (filter === "all" || card.getAttribute("data-category") === filter) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}

// Contact form validation (contact.html)
const form = document.getElementById("recipe-form");
if (form) {
    function showError(field, message) {
        field.classList.add("input-error");
        const errSpan = document.createElement("span");
        errSpan.className = "field-error";
        errSpan.textContent = message;
        field.insertAdjacentElement("afterend", errSpan);
    }

    function clearErrors() {
        document.querySelectorAll(".field-error").forEach(function (el) { el.remove(); });
        document.querySelectorAll(".input-error").forEach(function (el) { el.classList.remove("input-error"); });
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        clearErrors();

        const nameField = document.getElementById("name");
        const emailField = document.getElementById("email");
        const recipeField = document.getElementById("recipe");
        let valid = true;

        if (nameField.value.trim() === "") {
            showError(nameField, "Please enter your name.");
            valid = false;
        }

        if (emailField.value.trim() === "") {
            showError(emailField, "Please enter your email address.");
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())) {
            showError(emailField, "Please enter a valid email address.");
            valid = false;
        }

        if (recipeField.value.trim() === "") {
            showError(recipeField, "Please describe your recipe idea.");
            valid = false;
        }

        if (valid) {
            form.style.display = "none";
            document.getElementById("form-success").style.display = "block";
        }
    });
}