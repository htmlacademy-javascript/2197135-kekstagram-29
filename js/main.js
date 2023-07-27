import './render-thumbnail.js';
import './upload-photo-form.js';
import './upload-photo-adjusting.js';
import './upload-photo-filter.js';
import { initThumbnailSorting} from './filter.js';
import { getData } from './api.js';
import { showAlert} from './utils.js';


getData()
  .then(initThumbnailSorting)
  .catch((err) => {
    showAlert(err.message);
  });
