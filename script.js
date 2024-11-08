function login() {
    const emailInput = document.getElementById("email");
    const errorMessage = document.getElementById("error-message");
    const uploadSection = document.getElementById("upload-section");
    const loginSection = document.getElementById("login-section");
  
    const email = emailInput.value.trim();
    if (email.endsWith("@gymburgdorf.ch")) {
      loginSection.style.display = "none";
      uploadSection.style.display = "block";
    } else {
      errorMessage.textContent = "Nur E-Mails von gymburgdorf.ch sind zugelassen.";
    }
  }
  
  document.getElementById("upload-form").addEventListener("submit", async function(event) {
    event.preventDefault();
  
    const teacher = document.getElementById("teacher").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const fileInput = document.getElementById("file").files[0];
    const uploadMessage = document.getElementById("upload-message");
  
    if (fileInput) {
      const formData = new FormData();
      formData.append("teacher", teacher);
      formData.append("subject", subject);
      formData.append("file", fileInput);
  
      try {
        const response = await fetch("/upload", {
          method: "POST",
          body: formData
        });
        const result = await response.json();
  
        if (response.ok) {
          uploadMessage.textContent = result.message;
          uploadMessage.style.color = "green";
          document.getElementById("upload-form").reset();
        } else {
          uploadMessage.textContent = result.message || "Upload fehlgeschlagen.";
          uploadMessage.style.color = "red";
        }
      } catch (error) {
        console.error("Fehler:", error);
        uploadMessage.textContent = "Fehler beim Hochladen der Datei.";
        uploadMessage.style.color = "red";
      }
    } else {
      uploadMessage.textContent = "Bitte eine Datei auswählen.";
      uploadMessage.style.color = "red";
    }
  });
  