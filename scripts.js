document.addEventListener("DOMContentLoaded", () => {
  loadGallery();
  setLanguage("en"); // Default language is English
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
    title: "Plomberie Zoghaib",
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
  },
  fr: {
    title: "Plomberie Zoghaib",
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
  },
};

function setLanguage(lang) {
  document.getElementById("title").innerText = translations[lang].title;
  document.getElementById("nav-about").innerText = translations[lang].navAbout;
  document.getElementById("nav-contact").innerText =
    translations[lang].navContact;
  document.getElementById("nav-gallery").innerText =
    translations[lang].navGallery;
  document.getElementById("lang-label").innerText =
    translations[lang].langLabel;

  document.getElementById("about-title").innerText =
    translations[lang].aboutTitle;
  document.getElementById("about-text").innerText =
    translations[lang].aboutText;

  document.getElementById("contact-title").innerText =
    translations[lang].contactTitle;
  document.getElementById("contact-address").innerText =
    translations[lang].contactAddress;
  document.getElementById("contact-email").innerText =
    translations[lang].contactEmail;
  document.getElementById("contact-phone").innerText =
    translations[lang].contactPhone;

  document.getElementById("gallery-title").innerText =
    translations[lang].galleryTitle;

  document.getElementById("footer-text").innerText =
    translations[lang].footerText;
}
