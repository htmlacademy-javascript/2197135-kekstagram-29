import {randomPhotos, MAX_PHOTOS} from './data.ts';
import { openBigPicture, createModalPhoto, createModalPhotoComments } from './open-modal-photo.js';

export const pictures = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const fragment = document.createDocumentFragment();

export const photos = randomPhotos(MAX_PHOTOS);

const createThumbnail = (({url, id, likes, comments, description}) => {
	const pictureBlock = pictureTemplate.cloneNode(true);
	pictureBlock.dataset.id = id;
	pictureBlock.querySelector('.picture__img').src = url;
	pictureBlock.querySelector('.picture__img').alt = description;
	pictureBlock.querySelector('.picture__likes').textContent = likes;
	pictureBlock.querySelector('.picture__comments').textContent = comments.length;
	fragment.appendChild(pictureBlock);
}
);


photos.forEach(createThumbnail);

pictures.appendChild(fragment);

pictures.addEventListener('click', (evt) => {
	evt.preventDefault();
	const thumbnail = evt.target.closest('[data-id]');
	const picture = photos.find((item) => item.id === +thumbnail.dataset.id);
	openBigPicture();
	createModalPhoto(picture);
	createModalPhotoComments(picture.comments);
}
);
