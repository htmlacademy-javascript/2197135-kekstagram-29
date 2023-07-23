import { createModalPhoto } from './open-modal-photo.js';

export const pictures = document.querySelector('.pictures');
const picturesFilters = document.querySelector('.img-filters');
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
	container.querySelectorAll('.picture').forEach((element) => element.remove());
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
	container.append(fragment);
	picturesFilters.classList.remove('img-filters--inactive');
};
