/**
 * Returns `true` if `n` is a prime number
 * @param {number} n
 */
export function isPrime(n) {
	if (n === 2) return true;
	if (n < 2 || n % 2 === 0) return false;
	for (let i = 3; i <= Math.sqrt(n); i++) {
		if (n % i === 0) return false;
	}
	return true;
}
