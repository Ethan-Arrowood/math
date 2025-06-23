import { primeSet } from '../primes/primeSet.js';

export function factor(n, factors = new Map()) {
	if (n === 1) {
		return factors;
	}
	for (const prime of primeSet) {
		const q = n / prime;
		if (Number.isInteger(q)) {
			const power = factors.get(prime) || 0;
			factors.set(prime, power + 1);
			return factor(q, factors);
		}
	}
}
