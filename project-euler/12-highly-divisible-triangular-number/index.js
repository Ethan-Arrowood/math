import { primeFactor } from '../../utilities/primes/primeFactor.js';

function countDivisors(n) {
	const primeFactors = primeFactor(n);
	let divisors = 1;
	for (const [, power] of primeFactors) {
		divisors *= power + 1;
	}
	return divisors;
}

let n = 1;
while (true) {
	let t = (n * (n + 1)) / 2;
	if (2 * Math.sqrt(t) < 500) {
		n++;
		continue;
	}
	const f = countDivisors(t);
	if (f > 500) {
		console.log(`n: ${n}, t: ${t}`);
		break;
	}
	n++;
}
