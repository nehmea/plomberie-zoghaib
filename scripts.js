// document.addEventListener("DOMContentLoaded", () => {
//   // loadGallery();
//   setLanguage("fr"); // Default language is French
// });

// 2) loadPageGallery fetches images.json, picks the array for a specific page key
function loadPageGallery(pageKey) {
  fetch("images.json") // Adjust path if needed
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((jsonData) => {
      // Extract the array of filenames for the desired key
      const fileList = jsonData[pageKey];
      if (!fileList) {
        console.warn(`No images found for key: ${pageKey}`);
        return;
      }
      // Load the gallery with these filenames
      loadGallery(fileList);
    })
    .catch((err) => {
      console.error("Error fetching images.json:", err);
    });
}

// 3) loadGallery creates the thumbnails
function loadGallery(fileList) {
  const galleryEl = document.getElementById("gallery");
  if (!galleryEl) return;

  // Clear any existing images if needed
  galleryEl.innerHTML = "";

  fileList.forEach((filePath) => {
    const thumb = document.createElement("img");
    thumb.src = filePath;
    thumb.alt = "image not found";
    thumb.classList.add("thumbnail");

    // On click => enlarge image in modal
    thumb.addEventListener("click", () => enlargeImage(filePath));

    galleryEl.appendChild(thumb);
  });
}

// 4) enlargeImage & closeModal => show/hide the modal
function enlargeImage(src) {
  const modal = document.getElementById("imageModal");
  const fullImg = document.getElementById("fullImage");
  if (!modal || !fullImg) return;

  fullImg.src = src;
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  if (modal) modal.style.display = "none";
}

// Translation dictionaries
const translations = {
  fr: {
    title: "Tuyau Magique",
    navAbout: "À Propos",
    navContact: "Contactez-Nous",
    navGallery: "Galerie",
    langLabel: "Langue :",
    aboutTitle: "À Propos",
    aboutText:
      "Un plombier professionnel avec des années d'expérience. Nous répondons à tous vos besoins de plomberie avec efficacité et soin. Des petites fuites aux installations majeures, nous faisons tout.",
    contactTitle: "Contactez-Nous",
    contactAddress: "Adresse : ",
    contactEmail: "E-mail : ",
    contactPhone: "Téléphone : ",
    galleryTitle: "Galerie",
    footerText: "© 2024 Votre Plombier Local",
    waterHeaterTitle: "Services de Chauffe-Eau",
    waterHeaterDesc:
      "Nous offrons des services complets de chauffe-eau, y compris l'installation, le remplacement et la réparation. Notre équipe possède l'expertise nécessaire pour gérer tous les types de chauffe-eau, garantissant de l'eau chaude à tout moment.",
    waterHeaterList: [
      "Installation de nouveaux chauffe-eau",
      "Remplacement d'appareils anciens ou défectueux",
      "Entretien et inspection réguliers",
      "Réparations d'urgence",
    ],
    waterHeaterContactLink: "Contactez-Nous",
    waterHeaterFooter: "© 2024 Votre Plombier Local",
  },
  en: {
    title: "Magic pipe",
    navAbout: "About Us",
    navContact: "Contact Us",
    navGallery: "Gallery",
    langLabel: "Language:",
    aboutTitle: "About Us",
    aboutText:
      "A professional plumber with years of experience. We handle all your plumbing needs with efficiency and care. From small leaks to major installations, we do it all.",
    contactTitle: "Contact Us",
    contactAddress: "Address",
    contactEmail: "Email:",
    contactPhone: "Phone:",
    galleryTitle: "Gallery",
    footerText: "© 2024 Your Local Plumber",
    waterHeaterTitle: "Water Heater Services",
    waterHeaterDesc:
      "We offer comprehensive water heater services, including installation, replacement, and repair. Our team has the expertise to handle all types of water heaters, ensuring you always have hot water when you need it.",
    waterHeaterList: [
      "Installation of new water heaters",
      "Replacing outdated or broken units",
      "Routine maintenance and inspection",
      "Emergency repairs",
    ],
    waterHeaterContactLink: "Contact Us",
    waterHeaterFooter: "© 2024 Your Local Plumber",
  },
};

function setLanguage(lang) {
  // 1) Get the translations for the selected language
  const dict = translations[lang];
  if (!dict) return; // If no such language, do nothing

  // 2) Loop through each key-value pair in the language object
  Object.entries(dict).forEach(([key, value]) => {
    // 3) Attempt to find an element with id = key
    const element = document.getElementById(key);

    // If no element matches this key, skip
    if (!element) return;

    // 4) If the value is an array, we assume it's meant for a list
    if (Array.isArray(value)) {
      // Example: waterHeaterList => array of bullet points
      // We'll find all <li> children and update them
      const listItems = element.querySelectorAll("li");
      for (let i = 0; i < listItems.length; i++) {
        listItems[i].innerText = value[i] || "";
      }
    } else {
      // Otherwise, just set innerText
      element.innerText = value;
    }
  });
}
