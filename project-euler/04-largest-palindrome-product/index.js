import assert from 'node:assert/strict';
import { performance, PerformanceObserver } from 'node:perf_hooks';

const observer = new PerformanceObserver((list) => {
	const bruteForce = list.getEntriesByName('brute-force')[0];
	const optimized = list.getEntriesByName('optimized')[0];

	const percentChange =
		(bruteForce.duration - optimized.duration) / bruteForce.duration;

	console.log(
		`The optimized solution was ${(percentChange * 100).toFixed(2)}% faster`,
	);
});

observer.observe({ type: 'measure', buffered: true });

function isPalindrome(n) {
	const s = n.toString();
	return s === s.split('').reverse().join('');
}

function bruteForce() {
	let largestPalindrome = 0;
	for (let n = 100; n <= 999; n++) {
		for (let m = 100; m <= 999; m++) {
			const product = n * m;
			if (isPalindrome(product) && product > largestPalindrome) {
				largestPalindrome = product;
			}
		}
	}
	return largestPalindrome;
}

// console.time('Brute Force');
// const result = bruteForce();
// console.timeLog('Brute Force', result);

function optimized() {
	let largestPalindrome = 0;

	for (let a = 1; a <= 9; a++) {
		for (let b = 0; b <= 9; b++) {
			for (let c = 0; c <= 9; c++) {
				let k = 9091 * a + 910 * b + 100 * c;
				for (let r = 10; r <= 90; r++) {
					const m = k / r;
					if (Number.isInteger(m) && m >= 100 && m <= 999) {
						const palindrome = 11 * k;

						if (palindrome > largestPalindrome) {
							largestPalindrome = palindrome;
						}
					}
				}
			}
		}
	}

	return largestPalindrome;
}

// console.time('Optimized');
// const result = optimized();
// console.timeLog('Optimized', result);

// warmup
for (let i = 0; i < 5; i++) {
	bruteForce();
	optimized();
}

performance.mark('brute-force-start');
const bruteForceSolution = bruteForce();
performance.measure('brute-force', 'brute-force-start');

performance.mark('optimized-start');
const optimizedSolution = optimized();
performance.measure('optimized', 'optimized-start');

assert.equal(bruteForceSolution, optimizedSolution);
