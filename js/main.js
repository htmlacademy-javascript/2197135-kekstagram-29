import './render-thumbnail.js';
import './upload-photo-form.js';
import './upload-photo-adjusting.js';
import './upload-photo-filter.js';
import {renderThumbnails, pictures} from './render-thumbnail.js';
import { getData } from './api.js';
import { showAlert } from './utils.ts';

getData()
	.then((thumbnails) => {
		renderThumbnails(thumbnails, pictures);
	})
	.catch((err) => {
		showAlert(err.message);
	});

