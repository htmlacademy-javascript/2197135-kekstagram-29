import { isEscapeKey } from './utils';
import { body } from './open-modal-photo';
import { resetPicture } from './upload-photo-adjusting';
import { resetEffect } from './upload-photo-filter';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageUploadModalWindow = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadModalWindowClose = imageUploadForm.querySelector('.cancel');
const imageHashtagField = imageUploadForm.querySelector('.text__hashtags');
const imageCommentField = imageUploadForm.querySelector('.text__description');
export const uploadedPicture = imageUploadForm.querySelector('.img-upload__preview img');


const MAX_HASHTAGS = 5;
const MAX_SYMBOLS_IN_HASHTAG = 20;

const hashtagErrorMessages = {
	INVALID_HASHTAGS_NUMBER_MESSAGE:'превышено количество хэш-тегов',
	INVALID_HASHTAGS_SYMBOLS_MESSAGE: 'введён невалидный хэш-тег',
	INVALID_HASHTAGS_UNIQUE_MESSAGE:'хэш-теги повторяются',
	INVALID_HASHTAGS_START_MESSAGE: 'хэш-тег начинается с символа #',
	INVALID_HASHTAGS_HASHTAGONLY_MESSAGE: 'хеш-тег не может состоять только из одной решётки',
	INVALID_HASHTAGS_SYMBOLS_NUMBER_MESSAGE: 'максимальная длина одного хэш-тега 20 символов, включая решётку'
};

let hashtagErrorMessage = '';

const isUniqueArray = (array) => new Set(array).size === array.length;

const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/;

const pristine = new Pristine(imageUploadForm, {
	classTo: 'img-upload__field-wrapper',
	errorTextParent: 'img-upload__field-wrapper',
	errorTextClass: 'img-upload__field-wrapper--error-message'
});

const validateHashtags = (value) => {
	if (value.length === 0) {
		return true;
	}

	const normalizeHashtags = value.trim().toLocaleLowerCase().split(' ');

	if (normalizeHashtags.length > MAX_HASHTAGS) {
		hashtagErrorMessage = hashtagErrorMessages.INVALID_HASHTAGS_NUMBER_MESSAGE;
		return false;
	}

	if(!isUniqueArray(normalizeHashtags)) {
		hashtagErrorMessage = hashtagErrorMessages.INVALID_HASHTAGS_UNIQUE_MESSAGE;
		return false;
	}

	return normalizeHashtags.every((hashtag) => {
		if (hashtag[0] !== '#') {
			hashtagErrorMessage = hashtagErrorMessages.INVALID_HASHTAGS_START_MESSAGE;
			return false;
		}

		if (hashtag.length > MAX_SYMBOLS_IN_HASHTAG) {
			hashtagErrorMessage = hashtagErrorMessages.INVALID_HASHTAGS_SYMBOLS_NUMBER_MESSAGE;
			return false;
		}

		if(hashtag === '#') {
			hashtagErrorMessage = hashtagErrorMessages.INVALID_HASHTAGS_HASHTAGONLY_MESSAGE;
			return false;
		}

		if(!VALID_SYMBOLS.test(hashtag)) {
			hashtagErrorMessage = hashtagErrorMessages.INVALID_HASHTAGS_SYMBOLS_MESSAGE;
			return false;
		}

		return true;
	});
};

pristine.addValidator(imageHashtagField, validateHashtags, () => hashtagErrorMessage);

imageUploadForm.addEventListener('submit', (evt) => {
	evt.preventDefault();
	pristine.validate();
});

const showModal = () => {
	imageUploadModalWindow.classList.remove('hidden');
	body.classList.add('modal');
	document.addEventListener('keydown', onDocumentKeydown);
};

const hideModal = () => {
	imageUploadForm.reset();
	resetPicture();
	pristine.reset();
	resetEffect();
	imageUploadModalWindow.classList.add('hidden');
	body.classList.remove('modal-open');
	document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
	const isTextFieldFocused = () => document.activeElement === imageHashtagField || document.activeElement === imageCommentField;
	if(isEscapeKey(evt) && !isTextFieldFocused()) {
		evt.preventDefault();
		hideModal();
	}
}

imageUploadInput.addEventListener('input', () => {
	showModal();
});

imageUploadModalWindowClose.addEventListener('click', () => {
	hideModal();
});
