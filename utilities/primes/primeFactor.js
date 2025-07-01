import { primeSet } from './primeSet.js';

const memo = new Map();

export function primeFactor (n) {
	const factors = new Map();

	if (n <= 0) {
		return factors;
	}

	memo.set(n, factors);

	while (n !== 1) {
		let mf = memo.get(n);
		if (mf?.size > 0) {
			for (const [pr, po] of mf) {
				factors.set(pr, po);
			}
			break;
		}
		for (const p of primeSet) {
			const q = n / p;
			if (Number.isInteger(q)) {
				factors.set(p, (factors.get(p) || 0) + 1);
				n = q;
				break;
			}
		}
	}

	return factors;
}

if (import.meta.main) {
	for (let i = 0; i < 20; i++) {
		console.log(i, primeFactor(i));
	}
	console.log(memo);
}