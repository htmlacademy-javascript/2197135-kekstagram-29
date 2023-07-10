import {isEscapeKey} from './utils';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.cancel');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikesNumber = bigPicture.querySelector('.likes-count');
const bigPictureCommentsNumber = bigPicture.querySelector('.social__comment-count span');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureComment = bigPictureComments.querySelector('li');


const bigPictureCommentsCounter = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsLoaderButton = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');


export const createModalPhoto = (({url, description, comments, likes}) => {
	bigPictureImage.src = url;
	bigPictureImage.alt = description;
	bigPictureLikesNumber.textContent = likes;
	bigPictureCommentsNumber.textContent = comments.length;
	bigPictureDescription.textContent = description;
});

const createComment = ({avatar, name, message}) => {
	const comment = bigPictureComment.cloneNode(true);
	bigPictureComment.querySelector('.social__picture').src = avatar;
	bigPictureComment.querySelector('.social__picture').alt = name;
	bigPictureComment.querySelector('.social__text').textContent = message;
	return comment;
};

export const createModalPhotoComments = (comments) => {
	const fragment = document.createDocumentFragment();
	bigPictureComments.innerHTML = '';
	comments.forEach((item) => {
		const comment = createComment(item);
		fragment.append(comment);
	});

	bigPictureComments.append(fragment);
};

const onDocumentKeydown = (evt) => {
  	if (isEscapeKey(evt)) {
    	evt.preventDefault();
    	closeBigPicture();
  	}
};


export function openBigPicture () {
	bigPicture.classList.remove('hidden');
	document.addEventListener('keydown', onDocumentKeydown);
	bigPictureCommentsCounter.classList.add('hidden');
	bigPictureCommentsLoaderButton.classList.add('hidden');
	body.classList.add('modal-open');
}

export function closeBigPicture () {
	bigPicture.classList.add('hidden');
	document.removeEventListener('keydown', onDocumentKeydown);
	body.classList.remove('modal-open');
}

bigPictureClose.addEventListener('click', () => {
	closeBigPicture();
});
