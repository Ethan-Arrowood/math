# Project Euler Problem 13: Large Sum

> https://projecteuler.net/problem=13

Luckily, JavaScript can handle these large numbers without issue using the
`BigInt` datatype.

But using a little bit of intuition we can simplify the problem substantially.

Since the problem only wants the first $10$ digits of the sum, we actually only
have to sum the first $11$ digits of each number.

But why is that possible?

Lets simplify and say we only care about the first $5$ digits of the sum of two
$10$ digit numbers, $1234599999$ and $5678999999$. Now I purposefully am using
$9$s at the end of each number to illustrate the point. When we add these two
numbers, the $9$s will carry over a $1$ to the next digit, so one may assume
this could impact the first $5$ digits of the sum. Lets try it!

$$
\begin{aligned}
  1234599999 \\
+ \space 5678999999 \\
\hline
  6913599998 \\
\end{aligned}
$$

Now, just sum the first $6$ digits of each number instead:

$$
\begin{aligned}
  123459 \\
+ \space 567899 \\
\hline
  691358 \\
\end{aligned}
$$

The first $5$ digits of the sum are still the same, $69135$. The $6$th digit
does change, since it doesn't have the carry from the $7$th digit, but that
doesn't matter since we only care about the first $5$ digits.

Thus, we can say that if you are looking for the first $n$ digits of the sum of
$m$ numbers, you can just sum the first $n + 1$ digits of each number!
