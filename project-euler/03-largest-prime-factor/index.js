import { primeSet } from '../../utilities/primes/primeSet.js';

const n = 600_851_475_143;

const sqrt = Math.floor(Math.sqrt(n));

let largestPrimeFactor = 1;

// Iterate through the ordered set of primes in ascending order
for (const prime of primeSet) {
	// break once we check all primes from 2..sqrt(n)
	if (prime > sqrt) break;
	// No need to check `Math.max(largestPrimeFactor, prime)` since we are iterating in ascending order
	if (n % prime === 0) largestPrimeFactor = prime;
}

console.log(largestPrimeFactor);
