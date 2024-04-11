import { galleryItems } from "./gallery-items.js";

// Change code below this line
const gallery = document.querySelector(".gallery");
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
  // console.log("onShowOriginalSizeImg >> e.target.className:::", e.target.className); // gallery__image gallery__test

  // console.log("onShowOriginalSizeImg >> e.target.classList:::", e.target.classList); //['gallery__image', 'gallery__test', value: 'gallery__image gallery__test']

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
  );

  modalWindow.show();
}

function closeModal() {
  window.removeEventListener("keydown", onCloseFullSizeImgByEsc);
  modalWindow.close();
}

function onCloseFullSizeImgByEsc(e) {
  if (e.code === "Escape") {
    closeModal();
  }
}
