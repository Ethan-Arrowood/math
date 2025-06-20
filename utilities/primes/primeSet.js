import { readFileSync } from 'node:fs';
import { primesTxt } from './primesTxt.js';

const primes = readFileSync(primesTxt, 'utf-8');

export const primeSet = new Set(primes.split('\n'));
