/*
a^2 + b^2 = c^2
a < b < c
a, b, c are natural numbers
a + b + c = 1000
find a*b*c

a^2 + b^2 = (1000 - a - b)^2
a^2 + b^2 = 1000000 - 2000a - 2000b + a^2 + b^2 + 2ab
0 = 1000000 - 2000a - 2000b + 2ab
2000a - 2ab = 1000000 - 2000b
a(2000-2b) = 1000000 - 2000b
a = (1000000 - 2000b)/(2000-2b)
a = -2000/-2 * (b - 500)/(b-1000)
a = 1000(b-500)/(b-1000)
*/

function f(b) {
	return 1000 * ((b - 500) / (b - 1000));
}

for (let b = 1; b < 1000; b++) {
	let a = f(b);
	if (a > 0 && Number.isInteger(a)) {
		console.log(`(${a},${b})`);
	}
}

let a = 375,
	b = 200;

let c = 1000 - a - b;

console.log(`(${a},${b},${c})`);

console.log(a * b * c);
