import { galleryItems } from "./gallery-items.js";

// Change code below this line
const refs = {
  head: document.querySelector("head"),
  body: document.querySelector("body"),
  gallery: document.querySelector(".gallery"),
};

const basicLightboxStyle = document.createElement("link");
basicLightboxStyle.rel = "stylesheet";
basicLightboxStyle.href = "https://cdnjs.cloudflare.com/ajax/libs/basicLightbox/5.0.4/basicLightbox.min.css";
basicLightboxStyle.crossorigin = "anonymous";
basicLightboxStyle.referrerpolicy = "no-referrer";
refs.head.append(basicLightboxStyle);

const basicLightboxScript = document.createElement("script");
basicLightboxScript.src = "https://cdnjs.cloudflare.com/ajax/libs/basicLightbox/5.0.4/basicLightbox.min.js";
basicLightboxScript.crossorigin = "anonymous";
basicLightboxScript.referrerpolicy = "no-referrer";
refs.body.lastElementChild.append(basicLightboxScript);

refs.gallery.addEventListener("click", onShowOriginalSizeImg);

function createGalleryMarkup(galleryItems) {
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

refs.gallery.innerHTML = createGalleryMarkup(galleryItems);

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
    { onClose: () => closeModal() },
  );

  modalWindow.show();
  refs.body.classList.add("showImg");
}

function closeModal() {
  refs.body.classList.remove("showImg");
  window.removeEventListener("keydown", onCloseFullSizeImgByEsc);
}

function onCloseFullSizeImgByEsc(e) {
  if (e.code === "Escape") {
    modalWindow.close();
  }
}
