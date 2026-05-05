// Filter buttons: show/hide table rows by watch status
document.addEventListener("DOMContentLoaded", () => {
    const filterContainer = document.createElement("div");
    filterContainer.className = "filter-buttons";

    const filters = [
        { label: "All", value: "all" },
        { label: "Watched", value: "read" },
        { label: "Watching", value: "in-progress" },
        { label: "To Watch", value: "to-read" },
    ];

    filters.forEach(({ label, value }) => {
        const btn = document.createElement("button");
        btn.className = "filter-btn";
        btn.dataset.filter = value;
        btn.textContent = label;
        if (value === "all") btn.classList.add("active");
        filterContainer.appendChild(btn);
    });

    const table = document.querySelector(".inventory-section table");
    table.parentNode.insertBefore(filterContainer, table);

    filterContainer.addEventListener("click", (e) => {
        if (!e.target.classList.contains("filter-btn")) return;

        filterContainer.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        e.target.classList.add("active");

        const selected = e.target.dataset.filter;
        document.querySelectorAll(".inventory-section tbody tr").forEach((row) => {
            row.style.display = selected === "all" || row.classList.contains(selected) ? "" : "none";
        });
    });
});
