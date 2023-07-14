import {randomPhotos, MAX_PHOTOS} from './data.ts';
import { createModalPhoto } from './open-modal-photo.js';

const pictures = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const fragment = document.createDocumentFragment();

export const photos = randomPhotos(MAX_PHOTOS);
const findPhotoByID = (id) => photos.find((item) => item.id === id);

const onThumbnailClick = (evt) => {
	evt.preventDefault();
	const thumbnail = evt.currentTarget;
	const id = Number(thumbnail.dataset.id);

	const picture = findPhotoByID(id);
	createModalPhoto(picture);
};

const createThumbnail = (({url, id, likes, comments, description}) => {
	const pictureBlock = pictureTemplate.cloneNode(true);
	pictureBlock.dataset.id = id;
	pictureBlock.querySelector('.picture__img').src = url;
	pictureBlock.querySelector('.picture__img').alt = description;
	pictureBlock.querySelector('.picture__likes').textContent = likes;
	pictureBlock.querySelector('.picture__comments').textContent = comments.length;
	pictureBlock.addEventListener('click', onThumbnailClick);
	fragment.appendChild(pictureBlock);
}
);

photos.forEach(createThumbnail);
pictures.appendChild(fragment);

