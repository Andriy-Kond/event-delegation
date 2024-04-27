import { galleryItems } from "./gallery-items.js";

// Change code below this line
const refs = {
  head: document.querySelector("head"),
  body: document.querySelector("body"),
  gallery: document.querySelector(".gallery"),
};

const simpleLightboxStyle = document.createElement("link");
simpleLightboxStyle.rel = "stylesheet";
simpleLightboxStyle.href = "https://cdnjs.cloudflare.com/ajax/libs/simplelightbox/2.14.3/simple-lightbox.css";
simpleLightboxStyle.crossorigin = "anonymous";
simpleLightboxStyle.referrerpolicy = "no-referrer";
refs.head.append(simpleLightboxStyle);

// ! Бібліотека simpleLightbox не працює при підключенні через append чи  insertAdjacentHTML - треба підключати у html-файлі!
// const simpleLightboxScript = document.createElement("script");
// simpleLightboxScript.src = "https://cdnjs.cloudflare.com/ajax/libs/simplelightbox/2.14.3/simple-lightbox.min.js";
// simpleLightboxScript.crossorigin = "anonymous";
// simpleLightboxScript.referrerpolicy = "no-referrer";
// document.body.lastElementChild.append(simpleLightboxScript);

// const simpleLightBoxScript = `<script
//       src="https://cdnjs.cloudflare.com/ajax/libs/simplelightbox/2.14.3/simple-lightbox.min.js"
//       integrity="sha512-Vtot07oogPy4e0JzAfUgyvia0fATgR1PWWNG89EeQgPXmaIhjGQIFijUVxRn0TScCMCH57Y7eJSixmYYDJkJ1A=="
//       crossorigin="anonymous"
//       referrerpolicy="no-referrer"
//     ></script>`;

// document.body.insertAdjacentHTML("beforeend", simpleLightBoxScript);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ original, preview, description }) => {
      return `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
              <img 
                class="gallery__image" 
                src="${preview}"
                alt="${description}" />
          </a>
        </li>`;
    })
    .join("");
}

refs.gallery.innerHTML = createGalleryMarkup(galleryItems);

new SimpleLightbox(".gallery a", {
  captions: true,
  captionsData: "alt",
  captionDelay: 250,
  // captionPosition: "top",
});
