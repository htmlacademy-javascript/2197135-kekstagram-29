/** getting random number from stated range
 *
 * @param a :minimal of range
 * @param b :maximum of range
 * @returns random number from the stated range
 */
const getRandomNumber = (a:number, b:number) => {
	const lower = Math.ceil(Math.min(a, b));
	const upper = Math.floor(Math.max(a, b));
	const result = Math.random() * (upper - lower + 1) + lower;
	return Math.floor(result);
};

/**getting random element from stated array
 *
 * @param elements - array from which random ellement should be taken
 * @returns return random array ellement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getRandomArrayElement = (elements:any[]) => elements[getRandomNumber(0, elements.length - 1)];

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

export {getRandomNumber, getRandomArrayElement, getIDGenerator};
