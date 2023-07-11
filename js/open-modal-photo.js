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

let onLoaderClick = null;

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
	let commentAmount = 0;
	bigPictureComments.innerHTML = '';
	const renderNextCommentPack = () => {
		let endOfSlice = commentAmount + 5;
		const isAllShown = endOfSlice >= comments.length;
		endOfSlice = isAllShown ? comments.length : endOfSlice;
		const nextPack = comments.slice(commentAmount, endOfSlice);
		const fragment = document.createDocumentFragment();
		nextPack.forEach((item) => {
    		const comment = createComment(item);
			fragment.append(comment);
		});
		bigPictureComments.append(fragment);
		commentAmount = endOfSlice;
		bigPictureCommentsLoaderButton.classList.toggle('hidden', isAllShown);
		bigPictureCommentsCounter.textContent = `${commentAmount} из ${comments.length} комментариев`;
	};

	renderNextCommentPack();
	onLoaderClick = renderNextCommentPack;

	bigPictureCommentsLoaderButton.addEventListener('click', onLoaderClick);
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
	bigPictureCommentsLoaderButton.removeEventListener('click', onLoaderClick);
}

bigPictureClose.addEventListener('click', () => closeBigPicture());

export const createModalPhoto = (photo) => {
	renderModalPhoto(photo);
	openBigPicture();
	createModalPhotoComments(photo.comments);
};

