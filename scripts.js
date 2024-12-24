document.addEventListener("DOMContentLoaded", () => {
  loadGallery();
  setLanguage("fr"); // Default language is English
});

function enlargeImage(src) {
  const modal = document.getElementById("imageModal");
  const fullImage = document.getElementById("fullImage");
  fullImage.src = src;
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";
}

// Dynamically load gallery images
function loadGallery() {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;
  const imageCount = 3; // Number of images
  const thumbExtensions = ["jpg", "jpeg", "png"];
  const fullExtensions = ["jpg", "jpeg", "png", "tif", "tiff"];
  const thumbPrefix = "images/image";

  for (let i = 1; i <= imageCount; i++) {
    loadImageWithDifferentExtensions(
      thumbPrefix,
      i,
      thumbExtensions,
      fullExtensions,
      gallery
    );
  }
}

function loadImageWithDifferentExtensions(
  baseName,
  index,
  thumbExtensions,
  fullExtensions,
  gallery
) {
  let thumbFound = false;
  let fullImageFound = false;
  let thumbnailSrc = "";
  let fullImageSrc = "";

  for (let thumbExt of thumbExtensions) {
    const thumbSrc = `${baseName}${index}_thumb.${thumbExt}`;
    checkImage(thumbSrc, (exists) => {
      if (exists && !thumbFound) {
        thumbnailSrc = thumbSrc;
        thumbFound = true;
        for (let fullExt of fullExtensions) {
          const fullSrc = `${baseName}${index}.${fullExt}`;
          checkImage(fullSrc, (existsFull) => {
            if (existsFull && !fullImageFound) {
              fullImageSrc = fullSrc;
              fullImageFound = true;
              const thumbnail = document.createElement("img");
              thumbnail.src = thumbnailSrc;
              thumbnail.alt = `Plumbing work ${index}`;
              thumbnail.classList.add("thumbnail");
              thumbnail.onclick = function () {
                enlargeImage(fullImageSrc);
              };
              gallery.appendChild(thumbnail);
            }
          });
        }
      }
    });
  }
}

function checkImage(src, callback) {
  const img = new Image();
  img.onload = function () {
    callback(true);
  };
  img.onerror = function () {
    callback(false);
  };
  img.src = src;
}

// Translation dictionaries
const translations = {
  en: {
    title: "Dr. Tube",
    navAbout: "About Us",
    navContact: "Contact Us",
    navGallery: "Gallery",
    langLabel: "Language:",
    aboutTitle: "About Us",
    aboutText:
      "A professional plumber with years of experience. We handle all your plumbing needs with efficiency and care. From small leaks to major installations, we do it all.",
    contactTitle: "Contact Us",
    contactAddress: "Address: 123 Plumbing St, Cityville",
    contactEmail: "Email: contact@plumbingservice.com",
    contactPhone: "Phone: +1 (555) 123-4567",
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
  fr: {
    title: "Dr. Tube",
    navAbout: "À Propos",
    navContact: "Contactez-Nous",
    navGallery: "Galerie",
    langLabel: "Langue :",
    aboutTitle: "À Propos",
    aboutText:
      "Un plombier professionnel avec des années d'expérience. Nous répondons à tous vos besoins de plomberie avec efficacité et soin. Des petites fuites aux installations majeures, nous faisons tout.",
    contactTitle: "Contactez-Nous",
    contactAddress: "Adresse : 123 rue de la Plomberie, Cityville",
    contactEmail: "E-mail : contact@plumbingservice.com",
    contactPhone: "Téléphone : +1 (555) 123-4567",
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
