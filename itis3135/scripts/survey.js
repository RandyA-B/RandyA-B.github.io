// Form validation: checks required fields, shows inline errors, displays confirmation on success
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("survey-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        clearErrors();

        const lastName = document.getElementById("last-name").value.trim();
        const firstName = document.getElementById("first-name").value.trim();
        const email = document.getElementById("email").value.trim();
        const recommend = document.querySelector("input[name='recommend']:checked");

        let valid = true;

        if (!lastName) { showError("last-name", "Last name is required."); valid = false; }
        if (!firstName) { showError("first-name", "First name is required."); valid = false; }
        if (!email) {
            showError("email", "Email is required.");
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError("email", "Please enter a valid email address.");
            valid = false;
        }
        if (!recommend) { showError("recommendation", "Please select Yes or No."); valid = false; }

        if (valid) {
            form.closest("fieldset").innerHTML = `
                <div class="survey-confirmation">
                    <h3>Thank you, ${firstName}!</h3>
                    <p>Your feedback has been submitted. We appreciate you taking the time to share your experience with the Poised Panther.</p>
                </div>
            `;
        }
    });

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const error = document.createElement("span");
        error.className = "field-error";
        error.setAttribute("role", "alert");
        error.textContent = message;
        field.insertAdjacentElement("afterend", error);
    }

    function clearErrors() {
        document.querySelectorAll(".field-error").forEach((el) => el.remove());
    }
});
