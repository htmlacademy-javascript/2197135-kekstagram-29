import { isEscapeKey } from './utils';

const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';
const Route = {
	GET_DATA: '/data',
	SEND_DATA: '/',
};

const ErrorText = {
	GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
	SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const successUploadMessageTemplate = document
	.querySelector('#success')
	.content.querySelector('.success');
const errorUploadMessageTemplate = document
	.querySelector('#error')
	.content.querySelector('.error');

const showMessage = (messageTemplate) => {
	const messageElement = messageTemplate.cloneNode(true);
	const messageButton = messageElement.querySelector('button');

	const closeMessage = () => {
		document.body.removeChild(messageElement);
		document.removeEventListener('keydown', onDocumentKeydown);
		document.removeEventListener('click', onDocumentClick);
	};

	function onDocumentKeydown(evt) {
		if (isEscapeKey(evt)) {
			closeMessage();
			evt.stopPropagation();
		}
	}

	function onDocumentClick(evt) {
		if (evt.target === messageElement) {
			closeMessage();
		}
	}

	messageButton.addEventListener('click', (evt) => {
		evt.preventDefault();
		closeMessage();
	});

	document.addEventListener('keydown', onDocumentKeydown);
	document.addEventListener('click', onDocumentClick);

	document.body.append(messageElement);
};
const showErrorAlert = () => {
	showMessage(errorUploadMessageTemplate);
};

const showSuccessAlert = () => {
	showMessage(successUploadMessageTemplate);
};

const getData = () =>
	fetch(`${BASE_URL}${Route.GET_DATA}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error();
			}
			return response.json();
		})
		.catch(() => {
			throw new Error(ErrorText.GET_DATA);
		});

const sendData = (body) =>
	fetch(`${BASE_URL}${Route.SEND_DATA}`, {
		method: 'POST',
		body,
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error();
			}
		})
		.catch(() => {
			throw new Error();
		});

export { getData, sendData, showSuccessAlert, showErrorAlert };
