import { factor, factorBigInt } from '../../utilities/factor.js'

for (let i = 1; i <= 100; i++) {
	let t = 0;
	for (let j = 0; j <= i; j++) {
		t+=j;
	}
	console.log(`${i}: ${t}: ${Array.from(factor(t))}`)
}

let n = 1n;
while (true) {
	let t = (n*(n+1n))/2n
	const f = factorBigInt(t);
	if (f.size > 5) {
		console.log(n, t);
		break;
	}
	n++;
}

