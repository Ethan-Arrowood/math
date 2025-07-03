# [Project Euler Problem 17: Number Letter Counts](https://projecteuler.net/problem=17)

If the numbers $1$ to $5$ are written out in words: one, two, three, four, five,
then there are $3 + 3 + 5 + 4 + 4 = 19$ letters used in total.

If all the numbers from $1$ to $1000$ (one thousand) inclusive were written out
in words, how many letters would be used?

NOTE: Do not count spaces or hyphens. For example, $342$ (three hundred and
forty-two) contains $23$ letters and $115$ (one hundred and fifteen) contains
$20$ letters. The use of "and" when writing out numbers is in compliance with
British usage.

---

Definitely no magic mathematical trick here, just good old fashioned
programming!

This essentially needs to be a parser of some kind. There are many many ways to
implement this, but since the problem space is quite small I'm going to go with
a naive approach.

The key to my solution is breaking down the number into its `ones`, `tens`, and
`hundreds` digits and using lookup tables to build the word string. I'm
isolating `1000` as a special case since we don't actually have to do any
parsing for it.

In todays world of AI, it'd also be very easy to ask a model to spit out these
words and then you can iterate through the list adding up the lengths. But where
is the fun in that?

So my solution starts with iterating from `1` to `1000` and splitting up the
number `i` into its digits. I also initialized the `totalLetters` using the
length of the word `onethousand` so that we didn't have to handle parsing it.

```typescript
let totalLetters = 'onethousand'.length;

for (let i = 1; i < 1000; i++) {
	const ones = i % 10;
	const tens = Math.floor((i % 100) / 10);
	const hundreds = Math.floor(i / 100);

	// ...
}
```

The variables will be a digit `0` to `9`.

Next, I work through the digits building up the word components until finally
assembling the full word. It was easiest to do these in parts since there are
some special rules for adding terms like `and` and the unique `-teen` words.

<details>
<summary>Answer (click to reveal)</summary>

```typescript
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
```

Answer: `21124`

</details>
