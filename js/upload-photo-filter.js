import { imageUploadForm,} from './upload-photo-form';
import { uploadedPicture } from './upload-photo-adjusting';

const slider = imageUploadForm.querySelector('.effect-level__slider');
const sliderValue = imageUploadForm.querySelector('.effect-level__value');
const sliderContainer = imageUploadForm.querySelector('.effect-level');

const chromeEffect = {
	name: 'grayscale',
	minValue: 0,
	value: 1,
	maxValue: 1,
	stepValue: 0.1,
	unit: ''
};

const sepiaEffect = {
	name: 'sepia',
	minValue: 0,
	value: 1,
	maxValue: 1,
	stepValue: 0.1,
	unit: ''
};

const marvinEffect = {
	name: 'invert',
	minValue: 0,
	value: 100,
	maxValue: 100,
	stepValue: 1,
	unit: '%'
};

const phobosEffect = {
	name: 'blur',
	minValue: 0,
	value: 3,
	maxValue: 3,
	stepValue: 0.1,
	unit: 'px'
};

const heatEffect = {
	name: 'brightness',
	minValue: 1,
	value: 3,
	maxValue: 3,
	stepValue: 0.1,
	unit: ''
};

const defaultEffect = {
	name: 'none',
	value: '',
	unit: ''
};

const effects = {
	'effect-none': defaultEffect,
	'effect-chrome': chromeEffect,
	'effect-sepia': sepiaEffect,
	'effect-marvin': marvinEffect,
	'effect-phobos': phobosEffect,
	'effect-heat': heatEffect
};

const createSlider = ({minValue, maxValue, stepValue}) =>{
	if (slider.noUiSlider) {
		slider.noUiSlider.destroy();
	}
	noUiSlider.create(slider, {
		range: {
			'min': minValue,
			'max': maxValue
		},
		start: maxValue,
		step: stepValue,
	});
};

const applyEffect = (effect) => {
	if (effect.name === 'none') {
		uploadedPicture.style.filter = 'none';
		slider.noUiSlider.destroy();
		sliderContainer.classList.add('hidden');
	} else {
		sliderContainer.classList.remove('hidden');
		createSlider(effect);
		uploadedPicture.style.filter = `${effect.name}(${effect.value}${effect.unit})`;
		slider.noUiSlider.on('update', () => {
			effect.value = slider.noUiSlider.get();
			uploadedPicture.style.filter = `${effect.name}(${effect.value}${effect.unit})`;
			sliderValue.value = effect.value;
		});
	}
};

for (const id in effects) {
	const button = imageUploadForm.querySelector(`#${id}`);
	button.addEventListener('change', (evt) => {
		evt.preventDefault();
		applyEffect(effects[id]);
	});
}
