import { primeGenerator } from '../../utilities/primes/generatePrimes.js';

let total = 0;

for (const p of primeGenerator({ limit: 2000000 })) {
	total += p;
}

console.log(total);
