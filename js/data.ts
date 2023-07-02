import {getRandomArrayElement,getRandomNumber,getIDGenerator} from './utils.ts';

export const enum Default {
	MAX_PHOTOS = 25,
	MIN_LIKES = 15,
	MAX_LIKES = 200,
    MIN_COMMENTS = 0,
	MAX_COMMENTS = 30,
	MIN_AVATARS = 1,
    MAX_AVATARS = 6,
}

interface PhotoComment {
	id: number;
	avatar: `img/avatar-${number}.svg`;
	message: string;
	name: string;
}

interface Photo {
	id:number;
	url: `photos/${number}.jpg`
	description: string;
	likes: number;
	comments: PhotoComment[];
}

//getting random avatars for commentators
const AVATARS = Array.from({length: Default.MAX_AVATARS}, (_, i) => `img/avatar-${i + Default.MIN_AVATARS}.svg` as const);
const getRandomAvatars = () => getRandomArrayElement(AVATARS);

//array of messages which should be stated by commentators
const MESSAGES = [
	'Всё отлично',
 	'В целом все неплохо, но не все',
  	'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
  	'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше',
	'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше',
	'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

//array of names of the commentators
const NAMES = ['Влад', 'Денис','Дима', 'Артур', 'AnalExecuter69', 'Альберт'];


//description of photos
const DESCRIPTIONS = [
	'фото отдыха',
	'фото со сьемок',
	'наш ужин',
	'наш отпуск',
	'вот так и работаем',
	'лучшее фото',
	'красивое фото',
	'как то раз в темно месте',
	'вот такие виды',
	'все лучшее нам',
	'весенний фильтр',
	'лучшие в стране',
	'как вам?',
	'придумайте сами',
	'и что вы хотите сказать?',
	'вот что сегодня случилось',
	'как то раз зашел и увидел это',
	'просто кайф',
	'не судите строго',
	'по лучше прежнего',
	'за то как красиво',
	'и вот так бывает',
	'ну и что тут такого?',
	'моя любовь',
	'а так можно было?'
];

const photoID = getIDGenerator();
const commentID = getIDGenerator();
const photoNumberURL = getIDGenerator();

//function for creating random comment;
const createComment = ():PhotoComment => ({id: commentID(), avatar: getRandomAvatars(), message: getRandomArrayElement(MESSAGES), name: getRandomArrayElement(NAMES)});

//function which is generating a random photo object
const createPhoto = ():Photo => {
	const comments = Array.from({length: getRandomNumber(Default.MIN_COMMENTS, Default.MAX_COMMENTS)}, createComment);
	return {id: photoID(), url: `photos/${photoNumberURL()}.jpg`, description: getRandomArrayElement(DESCRIPTIONS), likes: getRandomNumber(Default.MIN_LIKES, Default.MAX_LIKES), comments};
};

//creating array with random photos objects
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const randomPhotos = (photosQuantity:number) => Array.from({length:photosQuantity }, createPhoto);
