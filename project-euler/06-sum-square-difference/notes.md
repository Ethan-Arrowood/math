# Project Euler Problem 6: Sum Square Difference

> https://projecteuler.net/problem=6

Find the difference between the sum of the squares of the first one hundred
natural numbers and the square of the sum.

This one was pretty easy algebraically. Its wants the difference between the
square of the sum of the range and the sum of the squares of the same range.
These are easily represented by two famous summation formulas.

$$
\begin{align*}
f(n) &= \left(\sum_{i=1}^n i\right)^2 - \sum_{i=1}^n i^2 \\
&= \left(\frac{n(n+1)}{2}\right)^2 - \frac{n(n+1)(2n+1)}{6} \\
&= \left(\frac{1}{2}n(n+1)\right)^2 - \left(\frac{1}{6}n(n+1)(2n+1)\right) \\
&= \left(\frac{1}{2}(n^2+n)\right)^2 - \left(\frac{1}{6}(n^2+n)(2n+1)\right) \\
&= \frac{1}{4}(n^4+2n^3+n^2) - \left(\frac{1}{6}(2n^3+3n^2+n)\right) \\
&= \frac{1}{4}n^4+\frac{1}{2}n^3+\frac{1}{4}n^2 - \frac{1}{3}n^3 - \frac{1}{2}n^2 - \frac{1}{6}n \\
&= \frac{1}{12} (3n^4 + 6n^3 + 3n^2 - 4n^3 - 6n^2 -2n) \\
&= \frac{1}{12} (3n^4 + 2n^3 - 3n^2 -2n) \\
\end{align*}
$$

And thus, quite simply:

```javascript
function f(n) {
	return (1 / 12) * (3 * n ** 4 + 2 * n ** 3 - 3 * n ** 2 - 2 * n);
}
```

Solution: $25164150$
