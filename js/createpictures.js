import {randomPhotos} from './data.ts';

const MAX_PHOTOS = 25;

const pictures = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture').content;

const fragment = document.createDocumentFragment();

const photos = randomPhotos(MAX_PHOTOS);

photos.forEach(({url, description, likes, comments}) => {
	const pictureBlock = pictureTemplate.cloneNode(true);
	pictureBlock.querySelector('.picture__img').src = url;
	pictureBlock.querySelector('.picture__img').alt = description;
	pictureBlock.querySelector('.picture__likes').textContent = likes;
	pictureBlock.querySelector('.picture__comments').textContent = comments.length;
	fragment.appendChild(pictureBlock);
}
);

pictures.appendChild(fragment);
