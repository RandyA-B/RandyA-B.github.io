// Generate JSON Code functionality
function generateJSONCode() {
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
      collectAndGenerateJSON(data, pictureDataUrl);
    };
    reader.readAsDataURL(pictureFile);
  } else {
    // If no file uploaded, use the default
    collectAndGenerateJSON(data, "itis3135/images/introIMG.jpg");
  }
}

function collectAndGenerateJSON(data, pictureUrl) {
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
    const urlKey = `link${i}Url`;
    const url = data[urlKey];
    if (url) {
      links.push({
        id: i,
        url: url,
      });
    }
  }

  // Generate the JSON data
  const jsonData = {
    personalInfo: {
      firstName: data.firstName || "",
      middleName: data.middleName || "",
      lastName: data.lastName || "",
      nickname: data.nickname || "",
      acknowledgmentStatement: data.acknowledgmentStatement || "",
      acknowledgmentDate: data.acknowledgmentDate || "",
    },
    mascot: {
      adjective: data.mascotAdjective || "",
      animal: data.mascotAnimal || "",
      divider: data.divider || "",
    },
    picture: {
      url: pictureUrl,
      caption: data.pictureCaption || "",
    },
    personalStatement: data.personalStatement || "",
    backgroundInfo: {
      personal: data.personalBackground || "",
      professional: data.professionalBackground || "",
      academic: data.academicBackground || "",
      subject: data.backgroundInSubject || "",
      primaryComputer: data.primaryComputer || "",
      backupComputer: data.backupComputer || "",
    },
    courses: courses,
    quote: {
      text: data.quote || "",
      author: data.quoteAuthor || "",
    },
    additionalInfo: {
      funny: data.funnyItem || "",
      share: data.additionalShare || "",
    },
    links: links,
  };

  // Convert to nicely formatted JSON string
  const jsonString = JSON.stringify(jsonData, null, 2);

  // Display the code with syntax highlighting
  displayJSONCodePage(jsonString);
}

// Display JSON code page with syntax highlighting
function displayJSONCodePage(jsonString) {
  const codeDisplay = `
    <section style="text-align: center; max-width: 90%; margin: 20px auto;">
      <h2>Introduction JSON</h2>
      <div style="text-align: left; background-color: #f5f5f5; border-radius: 8px; padding: 20px; margin-top: 20px; overflow-x: auto;">
        <pre><code class="language-json">${escapeHtml(jsonString)}</code></pre>
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
