//checkLengthFunction
/*
function checkStringLength (stringToCheck, maxStringLength) {
  return (stringToCheck.length) <= maxStringLength;
};

console.log(checkStringLength('Мама', 5));*/

/*function checkStringPalindrom(stringToCheck) {
  let normalString = stringToCheck.replaceAll(' ', '').toUpperCase();
  let emptyString = '';
  for (let i = normalString.length - 1; i >= 0; i--) {
    emptyString += normalString.at(i);
  }
  return emptyString === normalString;
}

console.log(checkStringPalindrom('довод'));*/

function checkNumbersInString (stringToCheck) {
  let emptyString = '';
  for (let i = 0; i <= stringToCheck.length; i ++) {
    if (!Number.isNaN(parseInt(stringToCheck[i], 10))) {
      emptyString += stringToCheck[i];
    }
  }
  return emptyString;
}

console.log(checkNumbersInString('год -1.5'));
