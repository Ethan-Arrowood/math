import { readFileSync } from 'node:fs';
import { primesTxt } from './primesTxt.js';

const primes = readFileSync(primesTxt, 'utf-8');

const arr = primes.split('\n');
arr.pop(); // remove trailing newline
export const primeSet = new Set(arr.map((n) => parseInt(n)));

if (import.meta.main) {
	console.log(Array.from(primeSet.values()).slice(-5));
	console.log(primeSet.size);
}
