import {uploadedPicture} from './upload-photo-form';

const reduceScaleButton = document.querySelector('.scale__control--smaller');
const increaseScaleButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const MAX_PICTURE_SCALE = 100;
const SCALE_STEP = 25;

let currentScale = 100;

reduceScaleButton.addEventListener('click', (evt) => {
	evt.preventDefault();
	if (currentScale > SCALE_STEP) {
		currentScale -= SCALE_STEP;
		uploadedPicture.style.transform = `scale(${currentScale / 100})`;
		scaleValue.value = `${currentScale}%`;
	}
});

increaseScaleButton.addEventListener('click', (evt) => {
	evt.preventDefault();
	if (MAX_PICTURE_SCALE >= currentScale + SCALE_STEP) {
		currentScale += SCALE_STEP;
		uploadedPicture.style.transform = `scale(${currentScale / 100})`;
		scaleValue.value = `${currentScale}%`;
	}
});

const scaleImage = (value) => {
	uploadedPicture.style.transform = `scale(${value / 100})`;
	scaleValue.value = value;
};

export const resetPicture = () => scaleImage(MAX_PICTURE_SCALE);
