# Project Euler Problem 14: Longest Collatz Sequence

> https://projecteuler.net/problem=14

The sequence is defined as follows:

- Start with any positive integer `n`.
- If `n` is even, divide it by `2`.
- If `n` is odd, multiply it by `3` and add `1`.
- Repeat the process until `n` becomes `1`.

The task is to find the starting number under one million that produces the
longest chain.

The first thing I recognized is that this is a dynamic programming problem and
I'd like to use memoization from the start. Just by observing a few example
sequences, I determined that there is some pattern to the sequences. `1` always
comes after `2`, `2` always comes after `4`, and so on. This means that if I
work up from `1`, I can build the sequences for all numbers up to one million
and memoize chains as I go.

Nothing else about the problem initially stood out to me as opportunities for
further optimization. I thought about the formulas and the only pattern I could
derive is that once a number is even, it is continuously halved until it becomes
an odd number again. Once odd, it immediately becomes even again.

I did some brief research into what principle dictates that the product of two
odd numbers is always odd, and its related to the definition of an odd number,
$2k + 1$ for some integer $k$. Thus, if you work out the product of
$(2a + 1)(2b + 1)$, you get $4ab + 2a + 2b + 1$, simplify to
$2(2ab + a + b) + 1$, and since $(2ab + a + b)$ is an integer, you can say
$(2ab + a + b) = k$, substituting back in, we arrive back at the definition of
an odd number, $2k + 1$. I find the symmetry of this proof fascinating, but
nonetheless, it doesn't really help me solve the problem.

```typescript
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
```

<details>
<summary>Answer (click to reveal)</summary>

```typescript
[837799, 556];
```

</details>
