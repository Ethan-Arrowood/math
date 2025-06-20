const max = 4_000_000;

let sum = 0;

let a = 1;
let b = 2;

while (b <= max) {
	if (b % 2 === 0) {
		sum += b;
	}

	b = a + (a = b);
}

console.log(sum);
