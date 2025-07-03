const digits = [1];

for (let power = 1; power <= 1000; power++) {
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

console.log(digits.reduce((a, c) => a + c));
