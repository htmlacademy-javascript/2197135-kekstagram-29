import { onDocumentKeydown } from './utils';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.cancel');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikesNumber = bigPicture.querySelector('.likes-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureCommentsElement = bigPicture.querySelector('.social__comments');
const bigPictureComment = bigPictureCommentsElement.querySelector('li');
const bigPictureCommentCount = bigPicture.querySelector('.comments-count');
const bigPictureCurrentCommentCount = bigPicture.querySelector('.current-comments-count');
const bigPictureCommentsLoaderButton = bigPicture.querySelector('.comments-loader');

export const body = document.querySelector('body');

let onLoaderClick = null;

const renderModalPhoto = ({ url, description, likes }) => {
	bigPictureImage.src = url;
	bigPictureImage.alt = description;
	bigPictureLikesNumber.textContent = likes;
	bigPictureDescription.textContent = description;
};

const createComment = ({ avatar, name, message }) => {
	const comment = bigPictureComment.cloneNode(true);
	comment.querySelector('.social__picture').src = avatar;
	comment.querySelector('.social__picture').alt = name;
	comment.querySelector('.social__text').textContent = message;
	return comment;
};

export const createModalPhotoComments = (comments) => {
	let commentAmount = 0;
	bigPictureCommentCount.textContent = comments.length;
	bigPictureCommentsElement.innerHTML = '';
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
		bigPictureCommentsElement.append(fragment);
		commentAmount = endOfSlice;
		bigPictureCommentsLoaderButton.classList.toggle('hidden', isAllShown);
		bigPictureCurrentCommentCount.textContent = commentAmount;
	};

	renderNextCommentPack();
	onLoaderClick = renderNextCommentPack;

	bigPictureCommentsLoaderButton.addEventListener('click', onLoaderClick);
};

function openModalWindow(modalWindow) {
	modalWindow.classList.remove('hidden');
	document.addEventListener('keydown', (evt) => {
		onDocumentKeydown(evt, modalWindow);
	});
	body.classList.add('modal-open');
}

function closeModalWindow(modalWindow) {
	modalWindow.classList.add('hidden');
	document.removeEventListener('keydown', onDocumentKeydown);
	body.classList.remove('modal-open');
}

const closeBigPicture = () => {
	closeModalWindow(bigPicture);
	bigPictureCommentsLoaderButton.removeEventListener('click', onLoaderClick);
};

bigPictureClose.addEventListener('click', closeBigPicture);

export const createModalPhoto = (photo) => {
	renderModalPhoto(photo);
	openModalWindow(bigPicture);
	createModalPhotoComments(photo.comments);
};
