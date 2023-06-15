import {describe, it, expect} from 'vitest';
import {checkStringLength, checkStringPalindrom, checkNumbersInString} from './function';
describe('Функция для проверки длины строки.', () => {
	const TEST_STRING = 'проверяемая строка';
	const { length } = TEST_STRING;

	it('Длина строки меньше второго аргумента', () => expect(checkStringLength(TEST_STRING, length + 1)).toBe(true));
	it('Длина строки равна второму аргументу', () => expect(checkStringLength(TEST_STRING, length)).toBe(true));
	it('Длина строки больше второго аргумента', () => expect(checkStringLength(TEST_STRING, length - 1)).toBe(false));

	it('Вызов без второго аргумента', () => expect(checkStringLength(TEST_STRING)).toBe(true));
	const veryLongString = TEST_STRING.repeat(100);
	it('Вызов без второго аргумента очень длинной строки', () => expect(checkStringLength(veryLongString)).toBe(false));

	it('Массив', () => expect(checkStringLength([1,2,3,4], 5)).toBe(true));
});

describe('Функция для проверки, является ли строка палиндромом.', () => {
	it('Строка является палиндромом', () => expect(checkStringPalindrom('топот')).toBe(true));
	it('Палиндром с разным регистром', () => expect(checkStringPalindrom('ДовОд')).toBe(true));
	it('Не палиндром', () => expect(checkStringPalindrom('Кекс')).toBe(false));
	it('Палиндром с пробелами', () => expect(checkStringPalindrom('Лёша на полке клопа нашёл ')).toBe(true));
});

describe ('Функция для извлечения цифр из строки.', () => {
	it('Строка содержит цифры в начале', () => expect(checkNumbersInString('2023 год')).toBe(2023));
	it('Строка содержит цифры в конце', () => expect(checkNumbersInString('ECMAScript 2022')).toBe(2022));
	it('Строка содержит цифры в разных местах, нужно конкетинировать', () => expect(checkNumbersInString('1 кефир, 0.5 батона')).toBe(105));
	it('Строка содержит цифры с нулями впереди. Нужно опустить нули, преобразив в число.', () => expect(checkNumbersInString('агент 007')).toBe(7));
	it('Строка не содержит цифр', () => expect(checkNumbersInString('а я томат')).toBeNaN());
	it('Число вернет число', () => expect(checkNumbersInString(2023)).toBe(2023));
	it('Дробное число', () => expect(checkNumbersInString(1.5)).toBe(15));
	it('Отрицательное число', () => expect(checkNumbersInString(-1)).toBe(1));
});


