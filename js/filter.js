import { sortRandomly } from './utils.js';
import {renderThumbnails, clearThumbnails } from './render-thumbnail.js';
import { debounce } from './utils.js';

const RANDOM_PICTURES_NUMBER = 10;

const picturesFilters = document.querySelector('.img-filters');
const filterButtons = picturesFilters.querySelectorAll('.img-filters__button');

let photos = [];

const [defaultButton, randomButton, discussedButton] = filterButtons;

let activeButton = defaultButton;

const isButton = (target)=> target.classList.contains('img-filters__button');

const sortPhotos = () => {
	if (activeButton === randomButton) {
		return photos.toSorted(sortRandomly).slice(0, RANDOM_PICTURES_NUMBER);
	}

	if (activeButton === discussedButton) {
		return photos.toSorted((a, b) => b.comments.length - a.comments.length);
	}

	return photos;
};

const reRenderPhotos = debounce(() => {
	clearThumbnails();
	renderThumbnails(sortPhotos());
});

picturesFilters.addEventListener('click', (evt) => {
	const target = evt.target;
	if (!isButton(target) || activeButton === target) {
		return;
	}

	activeButton.classList.remove('img-filters__button--active');
	target.classList.add('img-filters__button--active');
	activeButton = target;

	reRenderPhotos();
});

export const initThumbnailSorting = (recievedPhotos) => {
	photos = recievedPhotos;
	picturesFilters.classList.remove('img-filters--inactive');
	renderThumbnails(recievedPhotos);
};

