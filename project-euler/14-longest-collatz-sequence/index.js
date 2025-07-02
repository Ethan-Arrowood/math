const memo = new Map([[1, 1]]);

let l = [1, 1];

for (let i = 2; i < 1_000_000; i++) {
	let c = 1;
	let n = i;

	while (n !== 1) {
		let m = memo.get(n);
		if (m) {
			c += m;
			break;
		}
		n = n % 2 === 0 ? n / 2 : 3 * n + 1;
		c++;
	}

	if (c > l[1]) {
		l = [i, c];
	}
	memo.set(i, c);
}

console.log(l);
