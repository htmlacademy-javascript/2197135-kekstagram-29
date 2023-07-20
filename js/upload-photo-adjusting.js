import {uploadedPicture } from './upload-photo-form';

const reduceScaleButton = document.querySelector('.scale__control--smaller');
const increaseScaleButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const MAX_PICTURE_SCALE = 100;
const SCALE_STEP = 25;

let currentScale = 100;

const updateScale = () => {
	uploadedPicture.style.transform = `scale(${currentScale / 100})`;
	scaleValue.value = `${currentScale}%`;
};

reduceScaleButton.addEventListener('click', (evt) => {
	evt.preventDefault();
	if (currentScale > SCALE_STEP) {
		currentScale -= SCALE_STEP;
		updateScale();
	}
});

increaseScaleButton.addEventListener('click', (evt) => {
	evt.preventDefault();
	if (MAX_PICTURE_SCALE >= currentScale + SCALE_STEP) {
		currentScale += SCALE_STEP;
		updateScale();
	}
});


export const resetPicture = () => {
	currentScale = MAX_PICTURE_SCALE;
	updateScale();
};
