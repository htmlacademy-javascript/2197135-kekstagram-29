import {isEscapeKey} from './utils';
import {pictures} from './render-thumbnail.js';

const pictureLikesNumber = pictures.querySelector('.picture__likes');
const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.cancel');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikesNumber = bigPicture.querySelector('.likes-count');


const createModalPhoto = (picture) => {
	bigPictureImage.src = picture.src;
	bigPictureImage.alt = picture.alt;
	bigPictureLikesNumber.textContent = picture.likes;
};

const onDocumentKeydown = (evt) => {
  	if (isEscapeKey(evt)) {
    	evt.preventDefault();
    	closeBigPicture();
  	}
};


function openBigPicture () {
	bigPicture.classList.remove('hidden');

	document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture () {
	bigPicture.classList.add('hidden');

	document.removeEventListener('keydown', onDocumentKeydown);
}

pictures.addEventListener('click', (evt) => {
	if(evt.target.closest('.picture')) {
		openBigPicture();
		createModalPhoto(evt.target);
	}
});

bigPictureClose.addEventListener('click', () => {
	closeBigPicture();
});
