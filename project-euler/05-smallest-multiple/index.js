import { primeFactor } from '../../utilities/primes/primeFactor.js';

function smallestMultiple(low, high) {
	const maxPowersOfPrimes = new Map();
	for (let i = low; i <= high; i++) {
		const factors = primeFactor(i);
		for (const [prime, power] of factors.entries()) {
			if (power > (maxPowersOfPrimes.get(prime) || 0)) {
				maxPowersOfPrimes.set(prime, power);
			}
		}
	}

	let multiple = 1;
	for (const [prime, power] of maxPowersOfPrimes.entries()) {
		multiple *= Number.parseInt(prime) ** power;
	}

	return multiple;
}

console.log(smallestMultiple(1, 10));
console.log(smallestMultiple(1, 20));
