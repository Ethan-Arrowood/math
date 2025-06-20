# Project Euler Problem 4: Largest Palindrome Product

> https://projecteuler.net/problem=4

Find the largest palindrome made from the product of two 3-digit numbers.

## Brute Force Solution

Find the palindrome $p$ from the product of two 3-digit numbers $n$ and $m$. To
begin, we can define $n,m$ as the set of all positive 3-digit integers:

$$n, m \in \{ x \in \mathbb{N}_0 \mid 100 \leq x \leq 999 \} = [100,999] \cap \mathbb{N}_0$$

> $\mathbb{N}_0$ is the set of all positive integers including 0:
> $\{0,1,2,...\}$

The simplest brute force solution is to iterate through all possible products of
$n,m$ and keep track of the largest palindrome.

We can represent this as the cartesian product of the sets

$$[100,999] \cap \mathbb{N}_0 \times [100,999] \cap \mathbb{N}_0$$

Which we can simplify to

$$\{100,101,...,999\}^2 $$

Given there are $999 - 100 + 1 = 900$ elements in the set, we can conclude that
there are $900^2 = 810000$ possible products to check.

```typescript
function isPalindrome(n: number) {
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

console.time('Brute Force');
const result = bruteForce();
console.timeLog('Brute Force', result);
```

```
Brute Force: 83.944ms 906609
```

As this solution demonstrates, while the brute force method is straightforward,
it is inefficient. The for loops must iterate through all $810000$
possibilities, and run the `isPalindrome` function on each product.

## Optimized Solution

Using some clever mathematics, we can significantly optimize the solution to
this problem.

Starting from the original problem statement, we are looking for the largest
palindrome $p$ product of two 3-digit numbers $n$ and $m$.

$$p = nm$$

Given that the smallest product is $100 * 100 = 10000$ and the largest is
$999 * 999 = 998001$, we can conclude that the palindrome will be a $5$ or
$6$-digit number which we can represent as $abcba$ or $abccba$, where

$$
\begin{align*}
	a \in \{ x \in \mathbb{N}_0 \mid 1 \leq x \leq 9 \} = [1,9] \cap \mathbb{N}_0 \\
	b,c \in \{ x \in \mathbb{N}_0 \mid 0 \leq x \leq 9 \} = [0,9] \cap \mathbb{N}_0
\end{align*}
$$

Since the brute force solution revealed the largest palindrome is a 6-digit
number, we will focus on the form $abccba$; however, if we did not have that
information, we could use the same analysis for both forms.

Given $p = abccba$, we can use positional notation to express it as:

$$
\begin{split}
	p & = a \times 10^5 + b \times 10^4 + c \times 10^3 + c \times 10^2 + b \times 10^1 + a \times 10^0 \\
	& = 100000a + 10000b + 1000c + 100c + 10b + a \\
	& = 100001a + 10010b + 1100c \\
	& = 11(9091a + 910b + 100c)
\end{split}
$$

This formula is very useful because we can plug any valid values for `a`, `b`,
and `c` into it to generate a palindrome. But not all of these palindromes are
valid products of two 3-digit numbers. We still need to ensure $p=nm$, which
means we can express it as:

$$11(9091a + 910b + 100c) = nm$$

Next, lets define $k=9091a + 910b + 100c$, so we can rewrite the equation as:

$$11k = nm$$

Now, due to the fundamental theorem of arithmetic, we can state that the product
of $nm$ has at least one prime factor of $11$.

Express $n$ and $m$ in prime factorization form:

$$
\begin{align*}
n &= 11^{a_1} \cdot P_1 \\
m &= 11^{a_2} \cdot P_2
\end{align*}
$$

> $P_1$ and $P_2$ represent the set of other, unknown prime factors of $n$ and
> $m$, respectively.

Then combine them:

$$
nm = 11^{a_1 + a_2} \cdot P_1 \cdot P_2
$$

And substitute into the equation and solve for $k$:

$$
\begin{align*}
11k &= 11^{a_1 + a_2} \cdot P_1 \cdot P_2 \\
k &= 11^{a_1 + a_2 - 1} \cdot P_1 \cdot P_2
\end{align*}
$$

Now, since the exponent of the prime factor $11$ must be an integer $\geq 0$, we
can state:

$$
\begin{align*}
a_1 + a_2 - 1 \geq 0 \\
a_1 + a_2 \geq 1
\end{align*}
$$

And since $a_1$ and $a_2$ must also be integers $\geq 0$, we can prove that at
least one of them myst be $\geq 1$.

$$
\begin{align*}
a_1 + a_2 &\geq 1 \text{ where } a_1, a_2 \in \mathbb{N}_0 \\
\text{If } a_1 = 0, \text{ then } 0 + a_2 &\geq 1 \Rightarrow a_2 \geq 1 \\
\text{If } a_2 = 0, \text{ then } a_1 + 0 &\geq 1 \Rightarrow a_1 \geq 1 \\
\text{Hence, at least one of } &a_1, a_2 \text{ is } \geq 1
\end{align*}
$$

Through prime factorization, we have proved that at least one of $n$ or $m$ must
have at least one prime factor of $11$. So lets pick one of them, say $n$, and
write it in the form $n=11r$. Going back to the original constraint of
$n \in [100,999] \cap \mathbb{N}_0$, we can now constrain $r$ as follows:

$$
\begin{align*}
100 &\leq 11r \leq 999 \\
\frac{100}{11} &\leq r \leq \frac{999}{11} \\
9.0909 &\leq r \leq 90.8181
\end{align*}
$$

Since $11r \in [100,999] \cap \mathbb{N}_0$ we can round these decimal values to
the nearest integers that satisfy the condition:

$$
\begin{align*}
11 \times 9 &= 99 \text{ (too small, instead round up to 10)} \\
11 \times 91 &= 1001 \text{ (too big, instead round down to 90)} \\
&\text{Thus, } 10 \leq r \leq 90
\end{align*}
$$

Now considering the original equation $11k = nm$ and $n = 11r$:

$$
\begin{align*}
11k &= 11rm \\
k &= rm \\
k/r &= m
\end{align*}
$$

Finally, we have all the pieces we need to put together an optimized solution.

Given the constraints:

$$
\begin{align*}
a &\in [1,9] \cap \mathbb{N}_0 \\
b,c &\in [0,9] \cap \mathbb{N}_0 \\
r &\in [10,90] \cap \mathbb{N}_0 \\
m &\in [100,999] \cap \mathbb{N}_0
\end{align*}
$$

And the equations:

$$
\begin{align*}
p &= nm \\
p &= 11(9091a + 910b + 100c) \\
11k &= nm \\
k &= 9091a + 910b + 100c \\
n &= 11r \\
m &= k/r \\
\end{align*}
$$

We can now write an optimized program solution:

```typescript
function optimized() {
	// Track the largest palindrome
	let l = 0;
	// Iterate through all possible values of a, b, and c
	// 8 * 9 * 9 = 648 iterations
	for (let a = 1; a <= 9; a++) {
		for (let b = 0; b <= 9; b++) {
			for (let c = 0; c <= 9; c++) {
				// Calculate k
				let k = 9091 * a + 910 * b + 100 * c;
				// Then iterate through all possible values of r
				// 648 * 81 = 52488 iterations
				for (let r = 10; r <= 90; r++) {
					const m = k / r;
					// Check if m is an integer and within the range [100, 999]
					if (Number.isInteger(m) && m >= 100 && m <= 999) {
						// Calculate p
						const p = 11 * k;
						// Track the largest palindrome
						if (p > l) l = p;
					}
				}
			}
		}
	}

	return l;
}

console.time('Optimized');
const result = optimized();
console.timeLog('Optimized', result);
```

```
Optimized: 1.857ms 906609
```

## Performance Comparison

The brute force method required checking all $(1+999-100)^2 = 810000$
possibilities. Now, our new solution only has to check $8 * 9 * 9 * 81 = 52488$
possibilities. Resulting in an astounding
$(810000 - 52488) / 810000 = 0.9352 = 93.52\%$ change!

And this is only accounting for the number of iterations; not the actual time
complexity based on other parts of the implementation such as the `isPalindrome`
function which is no longer needed in the optimized solution.

So, using the `Performance` API, we can find out an actual runtime comparison:

```typescript
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

// warmup V8 so whatever runs first is not unfairly affected by JIT compilation
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
```

```
The optimized solution was 99.91% faster
```

And just like that, by applying mathematical problem solving, we are able to
optimize this problem by 99.9% 🎉

---

This post was inspired by the
[Project Euler](https://projecteuler.net/problem=4) problem 4, and is part of a
series of posts exploring mathematical problem solving techniques in
programming.

You can find the complete code for this solution [here](https://github.com/Ethan-Arrowood/math/blob/main/project-euler/04-largest-palindrome-product/index.js).

If you enjoyed this post, please consider sharing.

If you find any mistakes or have suggestions for improvements, please open an
issue on the [GitHub repository](https://github.com/Ethan-Arrowood/math).
