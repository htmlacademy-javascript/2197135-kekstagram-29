import { isEscapeKey, isUniqueArray} from './utils';
import { body } from './open-modal-photo';
import { resetPicture } from './upload-photo-adjusting';
import { resetEffect } from './upload-photo-filter';
import { sendData, showErrorAlert, showSuccessAlert } from './api';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageUploadModalWindow = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadModalWindowClose = imageUploadForm.querySelector('.cancel');
const imageHashtagField = imageUploadForm.querySelector('.text__hashtags');
const imageCommentField = imageUploadForm.querySelector('.text__description');
const submitButton = imageUploadForm.querySelector('.img-upload__submit');
export const uploadedPicture = imageUploadForm.querySelector('.img-upload__preview img');
const effectsPreview = imageUploadForm.querySelectorAll('.effects__preview');


const MAX_HASHTAGS = 5;
const MAX_COMMENTS_SYMBOLS = 140;
const FILE_TYPES = ['jpg', 'jpeg', 'png', 'svg', 'webp'];

const hashtagErrorMessages = {
  INVALID_HASHTAGS_NUMBER_MESSAGE:'превышено количество хэш-тегов',
  INVALID_HASHTAGS_SYMBOLS_MESSAGE: 'введён невалидный хэш-тег',
  INVALID_HASHTAGS_UNIQUE_MESSAGE:'хэш-теги повторяются',
};

const commentErrorMessage = 'Количество символов не должно превышать 140';

let hashtagArray = [];

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error-message'
});

const isValidHashtag = () => {
  const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/i;
  return hashtagArray.every((item) => hashtagPattern.test(item));
};

const isValidAmount = () => hashtagArray.length <= MAX_HASHTAGS;

const isUniqueHashtags = () => isUniqueArray(hashtagArray);

const isValidLength = () => imageCommentField.value.length <= MAX_COMMENTS_SYMBOLS;

pristine.addValidator(imageHashtagField, isValidHashtag, hashtagErrorMessages.INVALID_HASHTAGS_SYMBOLS_MESSAGE);
pristine.addValidator(imageHashtagField, isValidAmount, hashtagErrorMessages.INVALID_HASHTAGS_NUMBER_MESSAGE);
pristine.addValidator(imageHashtagField, isUniqueHashtags, hashtagErrorMessages.INVALID_HASHTAGS_UNIQUE_MESSAGE);
pristine.addValidator(imageCommentField, isValidLength, commentErrorMessage);

imageHashtagField.addEventListener('blur', () => {
  hashtagArray = imageHashtagField.value.trim().toLowerCase().split(' ').filter(Boolean);
  pristine.validate();
});

const toggleSubmitButton = (state) => {
  submitButton.disabled = state;
};

export const showModal = () => {
  imageUploadModalWindow.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

export const hideModal = () => {
  imageUploadForm.reset();
  resetPicture();
  pristine.reset();
  resetEffect();
  imageUploadModalWindow.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if(isValid) {
    toggleSubmitButton(true);
    sendData(new FormData(imageUploadForm))
      .then(() => {
        hideModal();
        showSuccessAlert();
      })
      .catch(() => {
        showErrorAlert();
      })
      .finally(() => {
        toggleSubmitButton(false);
      });
  }
});

function onDocumentKeydown (evt) {
  const isTextFieldFocused = () => document.activeElement === imageHashtagField || document.activeElement === imageCommentField;
  if(isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

imageUploadInput.addEventListener('input', () => {
  showModal();
  const file = imageUploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    uploadedPicture.src = URL.createObjectURL(file);
    effectsPreview.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = `url('${uploadedPicture.src}')`;
    });
  }
});

imageUploadModalWindowClose.addEventListener('click', () => {
  hideModal();
});
