// Clear Form functionality
function clearForm() {
  // Clear all text inputs, textareas, and date inputs
  form.querySelectorAll('input[type="text"], input[type="email"], input[type="url"], input[type="date"], textarea').forEach(field => {
    field.value = '';
  });
  
  // Clear file input
  form.querySelector('input[type="file"]').value = '';
}

// Get form elements
const form = document.getElementById("introForm");
const coursesContainer = document.getElementById("coursesContainer");
const addCourseBtn = document.getElementById("addCourseBtn");

// Add Course functionality
addCourseBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addCourseItem();
});

// Add new course item
function addCourseItem() {
  const courseDiv = document.createElement("div");
  courseDiv.className = "courseItem";

  courseDiv.innerHTML = `
    <label>
      Department:
      <input type="text" class="courseDept" placeholder="e.g., MATH" required />
    </label>
    <label>
      Number:
      <input type="text" class="courseNum" placeholder="e.g., 1242" required />
    </label>
    <label>
      Name:
      <input type="text" class="courseName" placeholder="e.g., Calculus II" required />
    </label>
    <label>
      Reason:
      <input type="text" class="courseReason" placeholder="e.g., Required class" required />
    </label>
    <button type="button" class="removeCourseBtn">Remove</button>
  `;

  coursesContainer.appendChild(courseDiv);

  // Add remove functionality to the new button
  const removeBtn = courseDiv.querySelector(".removeCourseBtn");
  removeBtn.addEventListener("click", function (e) {
    e.preventDefault();
    courseDiv.remove();
  });
}

// Remove Course functionality
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("removeCourseBtn")) {
    e.preventDefault();
    e.target.closest(".courseItem").remove();
  }
});

// Reset button functionality
const resetBtn = form.querySelector('button[type="reset"]');
resetBtn.addEventListener("click", function (e) {
  // The default reset will clear the form fields
  // We'll use setTimeout to ensure the default behavior completes first
  setTimeout(function () {
    // Remove all dynamically added courses (keep only the original 5)
    const courseItems = document.querySelectorAll(".courseItem");
    if (courseItems.length > 5) {
      for (let i = 5; i < courseItems.length; i++) {
        courseItems[i].remove();
      }
    }

    // Reset the first 5 courses to their default values
    const defaultCourses = [
      {
        dept: "MATH",
        num: "1242",
        name: "Calculus II",
        reason: "Required class",
      },
      {
        dept: "ITSC",
        num: "3160",
        name: "Database Design and Implementation",
        reason: "Required and interesting class",
      },
      {
        dept: "ITSC",
        num: "2181",
        name: "Intro to Computer Systems",
        reason: "Required class and interesting",
      },
      {
        dept: "GEOG",
        num: "1105",
        name: "Competitive Cyber Defense",
        reason: "Needed a class",
      },
      {
        dept: "ITIS",
        num: "3135",
        name: "Front-End Web App Development",
        reason: "Required class and interesting",
      },
    ];

    const remainingItems = document.querySelectorAll(".courseItem");
    remainingItems.forEach((item, index) => {
      if (index < 5 && defaultCourses[index]) {
        item.querySelector(".courseDept").value = defaultCourses[index].dept;
        item.querySelector(".courseNum").value = defaultCourses[index].num;
        item.querySelector(".courseName").value = defaultCourses[index].name;
        item.querySelector(".courseReason").value =
          defaultCourses[index].reason;
      }
    });
  }, 0);
});

// Form Submit functionality
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Collect all form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Handle file upload for picture
  const pictureFile = form.querySelector('input[name="pictureUrl"]').files[0];

  if (pictureFile) {
    // Read the file and convert to data URL
    const reader = new FileReader();
    reader.onload = function (event) {
      const pictureDataUrl = event.target.result;
      collectAndGenerateResult(data, pictureDataUrl);
    };
    reader.readAsDataURL(pictureFile);
  } else {
    // If no file uploaded, use the default
    collectAndGenerateResult(data, "itis3135/images/introIMG.jpg");
  }
});

function collectAndGenerateResult(data, pictureUrl) {
  // Collect course data
  const courses = [];
  const courseItems = document.querySelectorAll(".courseItem");
  courseItems.forEach((item) => {
    const dept = item.querySelector(".courseDept").value;
    const num = item.querySelector(".courseNum").value;
    const name = item.querySelector(".courseName").value;
    const reason = item.querySelector(".courseReason").value;

    if (dept && num && name && reason) {
      courses.push({ dept, num, name, reason });
    }
  });

  // Collect links
  const links = [];
  for (let i = 1; i <= 5; i++) {
    const label = data[`link${i}Label`] || data[`link${i}`];
    const url = data[`link${i}Url`];
    if (label && url) {
      links.push({ label, url });
    }
  }

  // Generate the result page HTML
  const resultHTML = generateResultPage(data, courses, links, pictureUrl);

  // Replace the form with the result page
  document.querySelector("main").innerHTML = resultHTML;
}

// Generate result page HTML matching the introduction.html structure
function generateResultPage(data, courses, links, pictureUrl) {
  const firstName = data.firstName || "";
  const middleName = data.middleName || "";
  const lastName = data.lastName || "";
  const fullName = `${firstName} ${middleName} ${lastName}`.trim();

  const personalStatement = data.personalStatement || "";
  const picCaption = data.pictureCaption || "Photo";
  const finalPictureUrl = pictureUrl || "itis3135/images/introIMG.jpg";

  // Build background bullets
  let bulletsHTML = `
    <li><strong>Personal Background:</strong> ${data.personalBackground || ""}</li>
    <li><strong>Professional Background:</strong> ${data.professionalBackground || ""}</li>
    <li><strong>Academic Background:</strong> ${data.academicBackground || ""}</li>
    <li><strong>Background in Subject:</strong> ${data.backgroundInSubject || ""}</li>
    <li><strong>Primary Work Computer:</strong> ${data.primaryComputer || ""}</li>
    <li><strong>Backup Work Computer & Location Plan:</strong> ${data.backupComputer || ""}</li>
    <li><strong>Courses I'm Taking, & Why:</strong>
      <ol>
  `;

  courses.forEach((course) => {
    bulletsHTML += `<li><strong>${course.dept}${course.num} - ${course.name}:</strong> ${course.reason}</li>`;
  });

  bulletsHTML += `
      </ol>
    </li>
    <li><strong>Funny/Interesting item to remember me by:</strong> ${data.funnyItem || ""}</li>
    <li><strong>I'd also like to share: </strong>${data.additionalShare || ""}</li>
  `;

  // Build links
  let footerHTML = "";
  links.forEach((link, index) => {
    if (index > 0) footerHTML += " | ";
    footerHTML += `<a href="${link.url}" target="_blank">${link.label}</a>`;
  });
  footerHTML += "<p>Copyright 2026 © | Designed by Randy Brown Designs</p>";

  const resultPage = `
    <h2>Introduction Form</h2>
    <h3>${fullName}</h3>
    <figure>
      <img src="${finalPictureUrl}" alt="${picCaption}" width="300" height="300"/>
      <figcaption>${picCaption}</figcaption>
    </figure>
    <p>${personalStatement}</p>
    <ul>
      ${bulletsHTML}
    </ul>
    <blockquote>"${data.quote || ""}" <em>- ${data.quoteAuthor || ""}</em></blockquote>
    <div style="margin-top: 20px;">
      <button type="button" onclick="location.reload()">Edit Form</button>
    </div>
  `;

  return resultPage;
}
