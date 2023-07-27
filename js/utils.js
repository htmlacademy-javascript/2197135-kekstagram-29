/** getting random number from stated range
 *
 * @param a :minimal of range
 * @param b :maximum of range
 * @returns random number from the stated range
 */
const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/**
 * getting random element from stated array
 * @param elements - array from which random ellement should be taken
 * @returns return random array ellement
 */
const getRandomArrayElement = (elements) =>
  elements[getRandomNumber(0, elements.length - 1)];

/**
 * @returns adding +1 to previous ID generating stacks of ID ofr each array element;
 */
function getIDGenerator() {
  let latestID = 0;
  return () => {
    latestID = latestID + 1;
    return latestID;
  };
}

/**
 * @param evt - event.target
 * @returns check if the buttun escape is pressed down. Use in renderPhoto on EventListeners
 */

const isEscapeKey = (evt) => evt.key === 'Escape';

const onDocumentKeydown = (evt, modalWindow) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.body.classList.remove('modal-open');
    modalWindow.classList.add('hidden');
  }
};

const isUniqueArray = (array) => array.length === new Set(array).size;

const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

function debounce(callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;
  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);
    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

const sortRandomly = () => Math.random() - 0.5;

export {
  getRandomNumber,
  getRandomArrayElement,
  getIDGenerator,
  isEscapeKey,
  onDocumentKeydown,
  showAlert,
  debounce,
  isUniqueArray,
  sortRandomly
};
