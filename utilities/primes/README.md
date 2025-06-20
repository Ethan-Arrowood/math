Prime numbers are fascinating. By definition, a prime is a natural number
greater than 1 that is not a product of two smaller natural numbers. All other
natural numbers that are not prime, are referred to as composite numbers.

Another definition of a prime is they are natural numbers that have only two
factors, 1 and itself.

> Natural numbers are non-negative integers 0, 1, 2, 3, ... Some definitions do
> exclude 0, but its generally case-by-case. The set of natural numbers are
> often denoted by a bold, uppercase N.

Computing primes is a major aspect of modern computing. They are fundamental to
cryptography and mathematicians and engineers alike have chased better and
better methodologies for validating and calculating prime numbers.

From the aspect of dynamic computing, the most efficient way to determine if a
number `n` is prime is to complete an O(1) lookup in the set of all known prime
numbers (P). We can download such list from the internet, or for the sake of
exploration compute it ourselves and reuse it later. This is a great example of
persistent memoization.
