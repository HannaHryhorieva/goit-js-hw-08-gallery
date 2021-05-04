import galleryItems from "./gallery-items.js";

const containerGallery = document.querySelector('.js-gallery');
const modalBox = document.querySelector('.js-lightbox');
const imageModalBox = document.querySelector('.lightbox__image');
const btnCloseModalBox = document.querySelector('[data-action="close-lightbox"]');
const overlayModalBox = document.querySelector('.lightbox__overlay');
let currentEl = 0;


const galleryMarkup = createGalleryMarkup(galleryItems);
containerGallery.insertAdjacentHTML('afterbegin', galleryMarkup);
function createGalleryMarkup(galleryItems) {
    return  galleryItems.map(({ preview, original, description }, i) => {
        return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-index="${i}"
      alt="${description}"
    />
  </a>
    </li>`}
).join('');
};

containerGallery.addEventListener('click', onClickGallery);
btnCloseModalBox.addEventListener('click', onCloseModal);
overlayModalBox.addEventListener('click', onCloseModalOverlay);


function onClickGallery(evt) {
  evt.preventDefault();
  window.addEventListener('keydown', onCloseModalEsc);
  window.addEventListener('keydown', onNextImage);
  
  const galleryItemEl = evt.target;
  if (!galleryItemEl.classList.contains('gallery__image')) {
    return
  }

  modalBox.classList.add('is-open');

  currentEl = Number(galleryItemEl.dataset.index);
  
  imageModalBox.setAttribute('src', `${galleryItems[currentEl].original}`);
  imageModalBox.setAttribute('alt', `${galleryItems[currentEl].description}`);
};

function onCloseModal() {
  window.removeEventListener('keydown', onCloseModalEsc);
  window.removeEventListener('keydown', onNextImage);

  modalBox.classList.remove('is-open');
  imageModalBox.removeAttribute('src');
  imageModalBox.removeAttribute('alt');
  
};

function onCloseModalOverlay(evt) {
 if (evt.target === evt.currentTarget) {
   onCloseModal()
    } 
};

function onCloseModalEsc(evt) {
  const ESC_KEY_CODE = 'Escape';

  if (evt.code === ESC_KEY_CODE) {
    onCloseModal()
  }
};

function onNextImage(evt) {
  const ARR_RIGHT_CODE = 'ArrowRight';
  const ARR_LEFT_CODE = 'ArrowLeft';
  console.log(currentEl);
  if (evt.code === ARR_RIGHT_CODE) {
    currentEl += 1;
    } else if (evt.code === ARR_LEFT_CODE){
    currentEl -= 1;
  } else { return };
  if (currentEl >= 0 && currentEl < galleryItems.length) {
    imageModalBox.src = `${galleryItems[currentEl].original}`;
    imageModalBox.alt = `${galleryItems[currentEl].description}`;
  } else {currentEl = -1};
}
  

