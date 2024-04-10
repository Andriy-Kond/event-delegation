import { galleryItems } from "./gallery-items.js";
// import * as basicLightbox from "basiclightbox";

// Change code below this line
const gallery = document.querySelector(".gallery");

const galleryItemsMarkup = galleryItems
  .map(
    item => `<li class="gallery__item">
  <a class="gallery__link" href="${item.original}">
  <img class="gallery__image" src="${item.preview}" data-source="${item.original}" alt="${item.description}" />
  </a>
  </li>`,
  )
  .join("");

gallery.innerHTML = galleryItemsMarkup;
const link = document.querySelector(".gallery__link");

gallery.addEventListener("click", showOriginalSizeImg);
link.addEventListener("click", e => {
  e.preventDefault;
  console.log(e.currentTarget);
});

function showOriginalSizeImg(e) {
  e.preventDefault();
  // console.log(e.target.dataset.source);

  const instance = basicLightbox.create(`<img src="${e.target.dataset.source}" width="800" height="600">`);

  instance.show();
}

window.addEventListener("keydown", closeByEsc);

function closeByEsc(e) {
  if (e.code === "Escape") {
    closeModal();
  }
}
