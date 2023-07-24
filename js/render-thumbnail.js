import { createModalPhoto } from './open-modal-photo.js';

const picturesElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

export const clearThumbnails = () => picturesElement.querySelectorAll('.picture').forEach((picture) => picture.remove());

const createThumbnail = (({url, id, description, likes, comments}) => {
	const pictureBlock = pictureTemplate.cloneNode(true);
	pictureBlock.querySelector('.picture__img').src = url;
	pictureBlock.querySelector('.picture__img').alt = description;
	pictureBlock.dataset.id = id.toString();
	pictureBlock.querySelector('.picture__likes').textContent = likes;
	pictureBlock.querySelector('.picture__comments').textContent = comments.length;
	return pictureBlock;
});


export const renderThumbnails = (photos) => {
	clearThumbnails();
	const fragment = document.createDocumentFragment();
	const thumbnails = photos.map((photo) => {
		const thumbnail = createThumbnail(photo);
		thumbnail.addEventListener('click', (evt) => {
			evt. preventDefault();
			createModalPhoto(photo);
		});
		return thumbnail;
	});
	fragment.append(...thumbnails);
	picturesElement.append(fragment);
};

