import { getRandomArrayElement } from './utils.js';
import { pictures } from './render-thumbnail.js';

const RANDOM_PICTURES_NUMBER = 10;

const picturesFilters = document.querySelector('.img-filters');
const picturesFilterDefault = picturesFilters.querySelector('#filter-default');
const picturesFilterRandom = picturesFilters.querySelector('#filter-random');
const picturesFilterDiscussed = picturesFilters.querySelector('#filter-discussed');


const getPictureRank = (photo) => photo.comments.length;

const comparePictures = (photoA, photoB) => {
	const rankA = getPictureRank(photoA);
	const rankB = getPictureRank(photoB);

	return rankB - rankA;
};

const buttons = [picturesFilterDefault, picturesFilterRandom, picturesFilterDiscussed];


const setActiveButton = (activeButton) => {
	buttons.forEach((button) => {
		button.classList.remove('img-filters__button--active');
	});

	activeButton.classList.add('img-filters__button--active');
};

export const setRandomPictures = (photos, renderFunction) => {
	picturesFilterRandom.addEventListener('click', (evt) => {
		evt.preventDefault();
		setActiveButton(evt.target);
		const randomPhotos = [];
		while(randomPhotos.length < RANDOM_PICTURES_NUMBER) {
			const randomPhoto = getRandomArrayElement(photos);
			if(!randomPhotos.includes(randomPhoto)) {
				randomPhotos.push(randomPhoto);
			}
		}
		renderFunction(randomPhotos, pictures);
	});
};

export const setDiscussedPictures = (photos, renderFunction) => {
	picturesFilterDiscussed.addEventListener('click', (evt) => {
		evt.preventDefault();
		setActiveButton(evt.target);
		const discussedPhotos = [...photos].sort(comparePictures);
		renderFunction(discussedPhotos, pictures);
	});
};

export const setDefaultPictures = (photos, renderFunction) => {
	picturesFilterDefault.addEventListener('click', (evt) => {
		evt.preventDefault();
		setActiveButton(evt.target);
		renderFunction(photos, pictures);
	});
};
