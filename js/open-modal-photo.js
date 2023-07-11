import {isEscapeKey} from './utils';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.cancel');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikesNumber = bigPicture.querySelector('.likes-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureComment = bigPictureComments.querySelector('li');
const bigPictureCommentsCounter = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsLoaderButton = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');

const renderModalPhoto = (({url, description, likes}) => {
	bigPictureImage.src = url;
	bigPictureImage.alt = description;
	bigPictureLikesNumber.textContent = likes;
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
	// First five comments
	let commentsNumberToShow = 5;
	const loadPackOfComments = () => {
		const shownComments = comments.slice(0, commentsNumberToShow);
		const fragment = document.createDocumentFragment();
    	bigPictureComments.innerHTML = '';
		shownComments.forEach((item) => {
    		const comment = createComment(item);
			fragment.append(comment);
		});
		bigPictureComments.append(fragment);

		const isAllShown = commentsNumberToShow >= comments.length;
		bigPictureCommentsLoaderButton.classList.toggle('hidden', isAllShown);
		bigPictureCommentsCounter.textContent = `${shownComments.length} из ${comments.length} комментариев`;
	};

	loadPackOfComments();

	const onCommentsLoaderButtonClick = (evt) => {
		evt.preventDefault();
		commentsNumberToShow += 5;
		loadPackOfComments();
	};

	bigPictureCommentsLoaderButton.addEventListener('click', onCommentsLoaderButtonClick);
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
	body.classList.add('modal-open');
}

function closeBigPicture () {
	bigPicture.classList.add('hidden');
	document.removeEventListener('keydown', onDocumentKeydown);
	body.classList.remove('modal-open');

	bigPictureCommentsLoaderButton.removeEventListener('click', onCommentsLoaderButtonClick);
}

bigPictureClose.addEventListener('click', () => closeBigPicture());

export const createModalPhoto = (photo) => {
	renderModalPhoto(photo);
	openBigPicture();
	createModalPhotoComments(photo.comments);
};

