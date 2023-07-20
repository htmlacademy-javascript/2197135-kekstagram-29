import { createModalPhoto } from './open-modal-photo.js';

export const pictures = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = (({url, description, likes, comments}) => {
	const pictureBlock = pictureTemplate.cloneNode(true);
	pictureBlock.querySelector('.picture__img').src = url;
	pictureBlock.querySelector('.picture__img').alt = description;
	pictureBlock.querySelector('.picture__likes').textContent = likes;
	pictureBlock.querySelector('.picture__comments').textContent = comments.length;
	return pictureBlock;
});

export const renderThumbnails = (photos, container) => {
	const fragment = document.createDocumentFragment();
	photos.forEach((photo) => {
		const thumbnail = createThumbnail(photo);

		thumbnail.addEventListener('click', (evt) => {
			evt. preventDefault();
			createModalPhoto(photo);
		});
		fragment.append(thumbnail);
	});

	container.append(fragment);
};

