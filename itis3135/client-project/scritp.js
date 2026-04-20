// /* ===========================
//    Simple Slideshow for Home Page
//    =========================== */

// let slideIndex = 0;
// showSlides();

// function showSlides() {
//     const slides = document.getElementsByClassName("slide");

//     // Hide all slides
//     for (let i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none";
//     }

//     // Move to next slide
//     slideIndex++;

//     // Loop back to first slide
//     if (slideIndex > slides.length) {
//         slideIndex = 1;
//     }

//     // Display the current slide
//     slides[slideIndex - 1].style.display = "block";

//     // Change image every 3 seconds
//     setTimeout(showSlides, 3000);
// }