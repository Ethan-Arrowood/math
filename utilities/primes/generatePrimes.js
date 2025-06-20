import { isPrime } from './isPrime.js';
import { primesTxt } from './primesTxt.js';

import { pipeline } from 'node:stream/promises';
import { createWriteStream } from 'node:fs';

function* primeGenerator(limit = Number.MAX_SAFE_INTEGER) {
	for (let i = 2; i <= limit; i++) {
		if (isPrime(i)) yield `${i.toString()}\n`;
	}
	return null;
}

await pipeline(primeGenerator(100_000), createWriteStream(primesTxt));
