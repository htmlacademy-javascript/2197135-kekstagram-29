//function which will check if length is more than required length.

function checkStringLength (stringToCheck, maxStringLength) {
	return (stringToCheck.length) <= maxStringLength;
}

checkStringLength('Мама', 5);

//function which will check if string is a palidrome.

function checkStringPalindrom(stringToCheck) {
	const normalString = stringToCheck.replaceAll(' ', '').toUpperCase();
	let emptyString = '';
	for (let i = normalString.length - 1; i >= 0; i--) {
		emptyString += normalString.at(i);
	}
	return emptyString === normalString;
}

checkStringPalindrom('довод');

//function which will find and return numbers in string.

function checkNumbersInString (stringToCheck) {
	let emptyString = '';
	const newString = stringToCheck.toString();
	for (let i = 0; i <= newString.length; i ++) {
		if (!Number.isNaN(parseInt(newString[i], 10))) {
			emptyString += newString[i];
		}
	}
	return parseInt(emptyString, 10);
}

checkNumbersInString('кефир -20.5');
