# Project Euler Problem 05: Smallest Multiple

> https://projecteuler.net/problem=5

$2520$ is the smallest number that can be divided by each of the numbers from
$1$ to $10$ without any remainder.

What is the smallest positive number that is evenly divisible by all of the
numbers from $1$ to $20$?

Before answering the problem, I started by analyzing the first statement. Given
$2520$, we can quickly verify that it is in fact divisible by all integers $1$
to $10$. And based on what I know about "divisibility" this is equivalent to
prime factorization. Meaning, if you get the prime factorization of a number,
you then can derive all possible composite factors of that same number. For
example, given the number $12$, its prime factors are $2, 2, 3$. Using strictly
this set of numbers, we can create all known composite factors of $12$:

1. $2 * (2 * 3) = 2 * 6$
2. $(2 * 2) * 3 = 4 * 3$

> Commutative property and identity factors $1$ and $12$ included

So this led me to compute the prime factorization of $2520 = 2^3 * 3^2 * 5 * 7$.

Now, the $5$ and $7$ factors stood out to me, maybe this prime factorization has
something to do with the specified range $1$ to $10$?

Writing out the prime factorization of the range:

$$
\begin{align*}
1 &= 1 \\
2 &= 2 \\
3 &= 3 \\
4 &= 2^2 \\
5 &= 5 \\
6 &= 2*3 \\
7 &= 7 \\
8 &= 2^3 \\
9 &= 3^2 \\
10 &= 2*5
\end{align*}
$$

Now a pattern has emerged! The prime factorization of $2520$, is fully
encompassed within the prime factorization of the range $1$ to 10. More
specifically, it looks like the prime factorization of $2520$ is the product of
the maximum powers of the prime factors of the set of its range. Given the prime
factorizations of $1$ to $10$ above, we can see that the maximum powers of the
prime factors of the set is $2^3, 3^2, 5, 7$. And this is exactly the prime
factorization of $2520$, the least common multiple of the range!

So, the solution to this problem is to find the product of the maximum powers of
the prime factors of the specified range.

Given the problem only specified the range $1$ to $20$, this was easy enough to
do by hand, but a simple algorithm can also be used to do this for any range.
