const getRandomNumber = (a, b) => {
	const lower = Math.ceil(Math.min(a, b));
	const upper = Math.floor(Math.max(a, b));
	const result = Math.random() * (upper - lower + 1) + lower;
	return Math.floor(result);
};

const randomAvatar = `img/avatar-${ getRandomNumber(1, 6) }.svg`;

const getCommentMessages = () => {
	const messages = [
		'Всё отлично',
 		'В целом все неплохо, но не все',
  		'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
  		'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше',
		'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше',
		'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
	return messages[getRandomNumber(0, 5)];
};

const getNames = () => {
	const userNames = ['Влад', 'Денис','Дима', 'Артур', 'AnalExecuter69', 'Альберт'];
	return userNames[getRandomNumber(0, 5)];
};

const comments = () => [
	{id:0, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:1, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:2, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:3, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:4, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:5, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:6, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:7, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:8, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:9, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:10, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:11, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:12, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:13, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:14, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:15, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:16, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:17, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:18, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:19, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:20, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:21, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:22, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:23, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:24, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:25, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:26, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:27, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:28, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:29, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
	{id:30, avatar: randomAvatar, message: getCommentMessages(), name: getNames()},
];

const randomComments = Array.from({length: getRandomNumber(0, 29)}, comments);

const userLikes = getRandomNumber(15, 200);

const getDescription = () => {
	const descriptions = [
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
	return descriptions[getRandomNumber(0, 24)];
};

const photos = () => [
	{id :1, photo: 'photos/1.jpg', description: getDescription(), likes: userLikes, comment: randomComments},
	{id :2, photo: 'photos/2.jpg', description: getDescription(), likes: userLikes, comment: randomComments},
	{id :3, photo: 'photos/3.jpg', description: getDescription(), likes: userLikes, comment: randomComments},
	{id :4, photo: 'photos/4.jpg', description: getDescription(), likes: userLikes, comment: randomComments},
	{id :5, photo: 'photos/5.jpg', description: getDescription(), likes: userLikes, comment: randomComments},
	{id :6, photo: 'photos/6.jpg', description: getDescription(), likes: userLikes, comment: randomComments},
	{id :7, photo: 'photos/7.jpg', description: getDescription(), likes: userLikes, comment: randomComments},
	{id :8, photo: 'photos/8.jpg', description: getDescription(), likes: userLikes, comment: randomComments},
	{id :9, photo: 'photos/9.jpg', description: getDescription(), likes: userLikes, comment: randomComments},
	{id :10, photo: 'photos/10.jpg', description: getDescription(), likes: userLikes, comment: randomComments},
	{id :11, photo: 'photos/11.jpg', description: getDescription(), likes: userLikes, comment: randomComments},
	{id :12, photo: 'photos/12.jpg', description: getDescription(), likes: userLikes, comment: randomComments},
	{id :13, photo: 'photos/13.jpg', description: getDescription(), likes: userLikes, comment: randomComments},
	{id :14, photo: 'photos/14.jpg', description: getDescription(), likes: userLikes, comment: randomComments},
	{id :15, photo: 'photos/15.jpg', description: getDescription(), likes: userLikes, comment: randomComments},
	{id :16, photo: 'photos/16.jpg', description: getDescription(), likes: userLikes, comment: randomComments},
	{id :17, photo: 'photos/17.jpg', description: getDescription(), likes: userLikes, comment: randomComments},
	{id :18, photo: 'photos/18.jpg', description: getDescription(), likes: userLikes, comment: randomComments},
	{id :19, photo: 'photos/19.jpg', description: getDescription(), likes: userLikes, comment: randomComments},
	{id :20, photo: 'photos/20.jpg', description: getDescription(), likes: userLikes, comment: randomComments},
	{id :21, photo: 'photos/21.jpg', description: getDescription(), likes: userLikes, comment: randomComments},
	{id :22, photo: 'photos/22.jpg', description: getDescription(), likes: userLikes, comment: randomComments},
	{id :23, photo: 'photos/23.jpg', description: getDescription(), likes: userLikes, comment: randomComments},
	{id :24, photo: 'photos/24.jpg', description: getDescription(), likes: userLikes, comment: randomComments},
	{id :25, photo: 'photos/25.jpg', description: getDescription(), likes: userLikes, comment: randomComments},
];

const randomPhotos = Array.from({length: 25}, photos);

console.log(randomPhotos);
