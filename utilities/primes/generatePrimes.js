import { isPrime } from './isPrime.js';
import { primesTxt } from './primesTxt.js';

import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { createWriteStream } from 'node:fs';

export function* primeGenerator({
	limit = Number.MAX_SAFE_INTEGER,
	count = Number.MAX_SAFE_INTEGER,
} = {}) {
	let n = 2;
	let c = 0;
	while (n < limit && c < count) {
		if (isPrime(n)) {
			c++;
			yield n;
		}
		n++;
	}
	return null;
}

if (import.meta.main) {
	await pipeline(
		primeGenerator({ count: 100_000 }),
		new Transform({
			objectMode: true,
			transform(chunk, encoding, callback) {
				callback(null, chunk ? `${chunk}\n` : chunk);
			},
		}),
		createWriteStream(primesTxt),
	);
}
