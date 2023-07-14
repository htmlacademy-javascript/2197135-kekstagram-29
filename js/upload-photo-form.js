import { isEscapeKey } from './utils';
import { body } from './open-modal-photo';

const MAX_HASHTAGS = 5;
const INVALID_HASHTAGS_NUMBER_MESSAGE = 'превышено количество хэш-тегов';
const INVALID_HASHTAGS_SYMBOLS_MESSAGE = 'введён невалидный хэш-тег';
const INVALID_HASHTAGS_UNIQUE_MESSAGE = 'хэш-теги повторяются';

export const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageUploadModalWindow = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadModalWindowClose = imageUploadForm.querySelector('.cancel');
const imageHashtagField = imageUploadForm.querySelector('.text__hashtags');
const imageCommentField = imageUploadForm.querySelector('.text__description');

const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(imageUploadForm, {
	classTo: 'img-upload__field-wrapper',
	errorTextParent: 'img-upload__field-wrapper',
	errorTextClass: 'img-upload__field-wrapper--error-message'
});

const normalizeHashtags = (hashtag) => hashtag.trim().split(' ').filter((tag) => Boolean(tag.length));

const isValidHashtagsNumber = (value) => normalizeHashtags(value).length <= MAX_HASHTAGS;

const isValidSymbolsInHashtag = (value) => normalizeHashtags(value).every((hashtag) => VALID_SYMBOLS.test(hashtag));

const isValidSymbolsUnique = (value) => {
	const hashtagsLowerCase = normalizeHashtags(value).map((hashtag) => hashtag.toLowerCase());
	return hashtagsLowerCase.length === new Set(hashtagsLowerCase).size;
};

pristine.addValidator(imageHashtagField, isValidHashtagsNumber, INVALID_HASHTAGS_NUMBER_MESSAGE, 1, true);

pristine.addValidator(imageHashtagField, isValidSymbolsInHashtag, INVALID_HASHTAGS_SYMBOLS_MESSAGE, 2, true);

pristine.addValidator(imageHashtagField, isValidSymbolsUnique, INVALID_HASHTAGS_UNIQUE_MESSAGE, 3, true);

imageUploadForm.addEventListener('submit', (evt) => {
	evt.preventDefault();
	pristine.validate();
});

const isTextFieldFocused = () => document.activeElement === imageHashtagField || document.activeElement === imageCommentField;

const showModal = () => {
	imageUploadModalWindow.classList.remove('hidden');
	body.classList.add('modal');
	document.addEventListener('keydown', onDocumentKeydown);
};

const hideModal = () => {
	imageUploadForm.reset();
	pristine.reset();
	imageUploadModalWindow.classList.add('hidden');
	body.classList.remove('modal-open');
	document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
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
