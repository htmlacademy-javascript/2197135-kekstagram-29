import { imageUploadForm } from './upload-photo-form';

const reduceScaleButton = imageUploadForm.querySelector('.scale__control--smaller');
const increaseScaleButton = imageUploadForm.querySelector('.scale__control--bigger');
const scaleValue = imageUploadForm.querySelector('.scale__control--value');
export const uploadedPicture = imageUploadForm.querySelector('.img-upload__preview img');

const maximumPictureScale = 100;
const scaleStep = 25;

let currentScale = 100;

reduceScaleButton.addEventListener('click', (evt) => {
	evt.preventDefault();
	if (currentScale > scaleStep) {
		currentScale -= scaleStep;
		uploadedPicture.style.transform = `scale(${currentScale / 100})`;
		scaleValue.value = `${currentScale}%`;
	}
});

increaseScaleButton.addEventListener('click', (evt) => {
	evt.preventDefault();
	if (maximumPictureScale >= currentScale + scaleStep) {
		currentScale += scaleStep;
		uploadedPicture.style.transform = `scale(${currentScale / 100})`;
		scaleValue.value = `${currentScale}%`;
	}
});
