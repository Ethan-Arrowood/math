const onesWords = [
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine',
];

const tensWords = [
	'ten',
	'eleven',
	'twelve',
	'thirteen',
	'fourteen',
	'fifteen',
	'sixteen',
	'seventeen',
	'eighteen',
	'nineteen',
];

const tensWords2 = [
	'twenty',
	'thirty',
	'forty',
	'fifty',
	'sixty',
	'seventy',
	'eighty',
	'ninety',
];

let totalLetters = 'onethousand'.length;

for (let i = 1; i < 1000; i++) {
	const ones = i % 10;
	const tens = Math.floor((i % 100) / 10);
	const hundreds = Math.floor(i / 100);

	const hundredsWord =
		hundreds !== 0 ? onesWords[hundreds - 1] + 'hundred' : '';

	let tensWord;
	if (tens === 1) {
		// When the tens starts with `1` it is going to be either `ten`, `eleven`, `twelve`, or one of the unique `-teens`
		// We can use a cool trick with the `ones` digit since it will correspond to the correct index of the `tensWords`
		tensWord = tensWords[ones];
	} else if (tens > 0) {
		// Otherwise we are dealing with 20 - 90
		// So if `tens` is `2` then we want to start with the word `twenty` which is index 0 in the second `tensWords` list
		tensWord = tensWords2[tens - 2];
		// But then we have to append the `ones` digit to it
		if (ones !== 0) {
			tensWord += `${onesWords[ones - 1]}`;
		}
	}

	// now if the tensWord is defined, we don't need a onesWord
	const onesWord = !tensWord && ones !== 0 ? onesWords[ones - 1] : '';

	// assemble the string
	const word =
		hundredsWord && (tensWord || onesWord)
			? hundredsWord + 'and' + (tensWord || onesWord)
			: `${hundredsWord}${tensWord || ''}${onesWord || ''}`;

	totalLetters += word.length;
}

console.log(totalLetters);
