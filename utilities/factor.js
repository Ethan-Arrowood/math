import { primeSet } from '../utilities/primes/primeSet.js';

export function factor (n) {
	const factors = new Set([n]);

	// Sources are mixed if 0 is truly a factor of itself
	if (n === 0) {
		return factors
	}

	factors.add(1);

	for (const prime of primeSet) {
		if (prime > n/2) break;
		const q = n / prime;
		if (Number.isInteger(q)) {
			factors.add(prime);
			factors.add(q);
		}
	}

	return factors;
}

export function factorBigInt (b) {
		const factors = new Set([b]);

	// Sources are mixed if 0 is truly a factor of itself
	if (b === 0n) {
		return factors
	}

	factors.add(1n);

	for (const prime of primeSet) {
		if (prime > b/2n) break;
		const q = b / BigInt(prime);
		if (Number.isInteger(q)) {
			factors.add(prime);
			factors.add(q);
		}
	}

	return factors;
}

function countDivisorsOptimized(n) {
    if (n === 1) return 1;
    
    let divisorCount = 1;
    let num = n;
    
    // Handle factor 2
    if (num % 2 === 0) {
        let power = 0;
        while (num % 2 === 0) {
            num = Math.floor(num / 2);
            power++;
        }
        divisorCount *= (power + 1);
    }
    
    // Handle odd factors
    let factor = 3;
    while (factor * factor <= num) {
        if (num % factor === 0) {
            let power = 0;
            while (num % factor === 0) {
                num = Math.floor(num / factor);
                power++;
            }
            divisorCount *= (power + 1);
        }
        factor += 2;
    }
    
    // If num is still > 1, it's a prime factor
    if (num > 1) {
        divisorCount *= 2;
    }
    
    return divisorCount;
}

if (import.meta.main) {
	console.log(countDivisorsOptimized(630));
}