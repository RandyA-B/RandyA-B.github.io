// Generate HTML Code functionality
function generateHTMLCode() {
  // Collect all form data
  const formData = new FormData(document.getElementById("introForm"));
  const data = Object.fromEntries(formData);

  // Handle file upload for picture
  const pictureFile = document.querySelector('input[name="pictureUrl"]')
    .files[0];

  if (pictureFile) {
    // Read the file and convert to data URL
    const reader = new FileReader();
    reader.onload = function (event) {
      const pictureDataUrl = event.target.result;
      collectAndGenerateHTML(data, pictureDataUrl);
    };
    reader.readAsDataURL(pictureFile);
  } else {
    // If no file uploaded, use the default
    collectAndGenerateHTML(data, "itis3135/images/introIMG.jpg");
  }
}

function collectAndGenerateHTML(data, pictureUrl) {
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

  // Generate the HTML code
  const htmlCode = generateIntroductionHTML(data, courses, links, pictureUrl);

  // Display the code with syntax highlighting
  displayCodePage(htmlCode);
}

// Generate Introduction HTML
function generateIntroductionHTML(data, courses, links, pictureUrl) {
  const firstName = data.firstName || "";
  const middleName = data.middleName || "";
  const lastName = data.lastName || "";
  const fullName = `${firstName} ${middleName} ${lastName}`.trim();

  const personalStatement = data.personalStatement || "";
  const picCaption = data.pictureCaption || "Photo";

  // Build background bullets
  let bulletsHTML = `    <li><strong>Personal Background:</strong> ${data.personalBackground || ""}</li>
    <li><strong>Professional Background:</strong> ${data.professionalBackground || ""}</li>
    <li><strong>Academic Background:</strong> ${data.academicBackground || ""}</li>
    <li><strong>Background in Subject:</strong> ${data.backgroundInSubject || ""}</li>
    <li><strong>Primary Work Computer:</strong> ${data.primaryComputer || ""}</li>
    <li><strong>Backup Work Computer & Location Plan:</strong> ${data.backupComputer || ""}</li>
    <li><strong>Courses I'm Taking, & Why:</strong>
      <ol>\n`;

  courses.forEach((course) => {
    bulletsHTML += `        <li><strong>${course.dept}${course.num} - ${course.name}:</strong> ${course.reason}</li>\n`;
  });

  bulletsHTML += `      </ol>
    </li>
    <li><strong>Funny/Interesting item to remember me by:</strong> ${data.funnyItem || ""}</li>
    <li><strong>I'd also like to share: </strong>${data.additionalShare || ""}</li>`;

  // Build links
  let footerLinksHTML = "";
  links.forEach((link, index) => {
    if (index > 0) footerLinksHTML += " | ";
    footerLinksHTML += `<a href="${link.url}" target="_blank">${link.label}</a>`;
  });

  const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fullName}'s Introduction</title>
    <link rel="stylesheet" href="styles/default.css">
</head>
<body>
    <header>
        <h1>${fullName}'s Introduction Page</h1>
    </header>

    <main>
        <h2>Introduction</h2>
        <h3>${fullName}</h3>
        <figure>
            <img src="${pictureUrl}" alt="${picCaption}" width="300" height="300"/>
            <figcaption>${picCaption}</figcaption>
        </figure>
        <p>${personalStatement}</p>
        <ul>
${bulletsHTML}
        </ul>
        <blockquote>"${data.quote || ""}" <em>- ${data.quoteAuthor || ""}</em></blockquote>
    </main>

    <footer>
        ${footerLinksHTML}
        <p>Copyright 2026 © | Designed by ${firstName} ${lastName}</p>
    </footer>
</body>
</html>`;

  return htmlCode;
}

// Display code page with syntax highlighting
function displayCodePage(htmlCode) {
  const codeDisplay = `
    <section style="text-align: center; max-width: 90%; margin: 20px auto;">
      <h2>Introduction HTML</h2>
      <div style="text-align: left; background-color: #f5f5f5; border-radius: 8px; padding: 20px; margin-top: 20px; overflow-x: auto;">
        <pre><code class="language-html">${escapeHtml(htmlCode)}</code></pre>
      </div>
      <div style="margin-top: 20px;">
        <button type="button" onclick="location.reload()" style="padding: 12px 25px; margin: 10px 5px; background-color: #84a98c; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 1em;">Back to Form</button>
      </div>
    </section>
  `;

  // Replace the form with the code display
  document.querySelector("main").innerHTML = codeDisplay;

  // Apply syntax highlighting
  setTimeout(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });
  }, 100);
}

// Helper function to escape HTML
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Clear Form functionality
function clearForm() {
  const form = document.getElementById("introForm");
  form
    .querySelectorAll(
      'input[type="text"], input[type="email"], input[type="url"], input[type="date"], textarea',
    )
    .forEach((field) => {
      field.value = "";
    });

  form.querySelector('input[type="file"]').value = "";
}
