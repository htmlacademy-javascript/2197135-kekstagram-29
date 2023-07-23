import './render-thumbnail.js';
import './upload-photo-form.js';
import './upload-photo-adjusting.js';
import './upload-photo-filter.js';
import {renderThumbnails, pictures} from './render-thumbnail.js';
import { setDefaultPictures, setRandomPictures, setDiscussedPictures } from './filter.js';
import { getData } from './api.js';
import { showAlert, debounce } from './utils.js';

getData()
	.then((thumbnails) => {
		const debounceRender = debounce(renderThumbnails, 500);
		debounceRender(thumbnails, pictures);
		setDefaultPictures(thumbnails, debounceRender);
		setDiscussedPictures(thumbnails, debounceRender);
		setRandomPictures(thumbnails, debounceRender);
	})
	.catch((err) => {
		showAlert(err.message);
	});

