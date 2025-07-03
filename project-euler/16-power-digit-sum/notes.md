# [Project Euler Problem 16: Power Digit Sum](https://projecteuler.net/problem=16)

$2^{15} = 32768$ and the sum of its digits is $3 + 2 + 7 + 6 + 8 = 26$.

What is the sum of the digits of the number $2^{1000}$?

Questions like this are trivial in JavaScript since it has the `BigInt` type,
literally all I have to do is:

<details>
<summary>Answer (click to reveal)</summary>

```typescript
const bigInt = 2n ** 1000n;
const digitSum = bigInt
	.toString()
	.split('')
	.reduce((acc, curr) => acc + Number(curr), 0);
console.log(digitSum);
```

Answer: `1366`

</details>

But what if we constrained ourselves to using only the `Number` type? Is there
some mathematical property or trick we can use?

I couldn't really come up with anything, so instead, what if I tried just
building a custom _big number_ handler? I don't want to over engineer here so
I'm just going to work with a raw array of digits and the fact that we are
multiplying by 2 each time.

```typescript
const digits = [1];

for (let power = 1; power <= 15; power++) {
	let carry = 0;

	for (let i = 0; i < digits.length; i++) {
		let product = digits[i] * 2 + carry;
		digits[i] = product % 10; // store ones digit
		carry = Math.floor(product / 10); // carry the tens digit
	}

	// if a carry remains, add it as a new digit
	if (carry > 0) {
		digits.push(carry);
	}
}

console.log(digit);
```

So starting from `[1]`, lets right out the first few iterations:

The first few are quite simple,

1. `[1]` -> `[2]`
2. `[2]` -> `[4]`
3. `[4]` -> `[8]`
4. Now this is where we first encounter a carry
   1. So `carry` starts at `0`
   2. The product is `8 * 2 + 0 = 16`
   3. We store `6` in the array (at index `0`) and set `carry` to `1`
   4. `carry` is `> 0`, so we add it to the end of the array
   5. So now we have `[6, 1]` (representing `16`)
5. `[6, 1]`
   1. Now we have two digits
   2. `carry` starts at `0` again
   3. The first digit is `6`, so we do `6 * 2 + 0 = 12`
   4. We store `2` in the array (at index `0`) and set `carry` to `1`
   5. The second digit is `1`, so we do `1 * 2 + 1 = 3`
   6. We store `3` in the array (at index `1`) and set `carry` to `0`
   7. `carry` is `0`, so we don't add anything to the end of the array
   8. So now we have `[2, 3]` (representing `32`)

This iteration continues until the array eventually represents `2^1000`.

The digits will be in reverse order, at least reading left-to-right or comparing
the digit magnitude to its index.

Regardless, summation is cumulative, so we can just iterate through the array
and sum the digits as they are.
