import { galleryItems } from "./gallery-items.js";

// Change code below this line
const gallery = document.querySelector(".gallery");
const body = document.querySelector("body");

gallery.addEventListener("click", onShowOriginalSizeImg);

function createGalleryMarkup(gallery) {
  return galleryItems
    .map(({ original, preview, description }) => {
      return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img 
            class="gallery__image gallery__test"
            src="${preview}"
            data-source="${original}"
            alt="${description}" />
        </a>
      </li>`;
    })
    .join("");
}

gallery.innerHTML = createGalleryMarkup(galleryItems);

function onShowOriginalSizeImg(e) {
  e.preventDefault();

  if (!e.target.classList.contains("gallery__image")) {
    return;
  }

  openFullSizeImg(e);
}

let modalWindow;

function openFullSizeImg(e) {
  window.addEventListener("keydown", onCloseFullSizeImgByEsc);
  modalWindow = basicLightbox.create(
    `<img 
      src="${e.target.dataset.source}" 
      alt="${e.target.alt}" 
      style = "border-radius: 5px;"
      >`,
    { onClose: () => closeModal() },
  );

  modalWindow.show();
  body.classList.add("showImg");
}

function closeModal() {
  body.classList.remove("showImg");
  window.removeEventListener("keydown", onCloseFullSizeImgByEsc);
}

function onCloseFullSizeImgByEsc(e) {
  if (e.code === "Escape") {
    modalWindow.close();
  }
}
