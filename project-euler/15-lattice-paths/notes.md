# Project Euler Problem 15: Lattice Paths

> https://projecteuler.net/problem=15

Very excited for this problem! The first thing I thought of with this problem is
that the grid is really a set of nodes and edges. Graphs fascinate me. I have
some experience with graphs in the context of basic algorithms and data
structures, as well as a little bit of graph database work, but I'm not an
expert on graph theory mathematics. So rather than trying to immediately code a
solution, I want to explore the mathematics of the graph first.

Given a $2 \times 2$ grid, we can visualize the nodes and edges like this:

```
(0,0) → (1,0) → (2,0)
  ↓       ↓       ↓
(0,1) → (1,1) → (2,1)
  ↓       ↓       ↓
(0,2) → (1,2) → (2,2)
```

Its trivial to count that for a grid of size $2$ there are $9$ nodes and $12$
edges. Maybe there is a relationship between the grid size and the number of
nodes and edges?

Let me try the next size, $3$:

```
(0,0) → (1,0) → (2,0) → (3,0)
  ↓       ↓       ↓       ↓
(0,1) → (1,1) → (2,1) → (3,1)
  ↓       ↓       ↓       ↓
(0,2) → (1,2) → (2,2) → (3,2)
  ↓       ↓       ↓       ↓
(0,3) → (1,3) → (2,3) → (3,3)
```

Okay so now there are $16$ nodes and $24$ edges.

Since the node numbers are squares, I figured out a quick guess that the number
of nodes is $(n+1)^2$

But nothing immediately jumped out for edges. Using basic line fitting I
calculated that at least one formula for the edges is $12(n-1)$, but I'm not
sure if that is absolutely correct, what if the relationship is not linear?

So lets try a grid of size $4$:

```
(0,0) → (1,0) → (2,0) → (3,0) → (4,0)
  ↓       ↓       ↓       ↓       ↓
(0,1) → (1,1) → (2,1) → (3,1) → (4,1)
  ↓       ↓       ↓       ↓       ↓
(0,2) → (1,2) → (2,2) → (3,2) → (4,2)
  ↓       ↓       ↓       ↓       ↓
(0,3) → (1,3) → (2,3) → (3,3) → (4,3)
  ↓       ↓       ↓       ↓       ↓
(0,4) → (1,4) → (2,4) → (3,4) → (4,4)
```

Now there are $25$ nodes and $40$ edges. $25 = (4+1)^2$ but $40 \neq 12(4-1)$,
so its not linear. Maybe its quadratic like the nodes?

Instead of looking at just the numbers, the graphics are actually incredibly
helpful. Considering that a grid of size $n$ has $n+1$ rows and $n+1$ columns,
and there is always exactly $n$ edges in each row and $n$ edges in each column,
I believe we can say that the number of edges is $2n(n+1)$.

Plugging in the three examples we have so far:

$$
\begin{aligned}
n=2 \rightarrow 2 \cdot 2 \cdot (2+1) = 12 \\
n=3 \rightarrow 2 \cdot 3 \cdot (3+1) = 24 \\
n=4 \rightarrow 2 \cdot 4 \cdot (4+1) = 40
\end{aligned}
$$

It works! We can apply the same visual methodology to confirm the formula for
the number of nodes too. This proof is good enough for me to move on.

So given the formulas, given a grid of size $n$, say $N(n) = (n+1)^2$ for the
number of nodes and $E(n) = 2n(n+1)$ for the number of edges, we can now
calculate for $n=20$:

$$
\begin{aligned}
N(20) &= (20+1)^2 = 441 \\
E(20) &= 2 \cdot 20 \cdot (20+1) = 840
\end{aligned}
$$

Now that we've well defined the grid, we can start thinking about the paths and
traversal. The problem states that we can only move right or down. Immediately,
I think of using a directed graph to represent the grid. Using the example $n=3$
lets visualize this again:

```
(0,0) → (1,0) → (2,0) → (3,0)
  ↓       ↓       ↓       ↓
(0,1) → (1,1) → (2,1) → (3,1)
  ↓       ↓       ↓       ↓
(0,2) → (1,2) → (2,2) → (3,2)
  ↓       ↓       ↓       ↓
(0,3) → (1,3) → (2,3) → (3,3)
```

I don't recall any formula for the number of paths in a directed graph, but my
intuition tells me there is something dictating this. It is a bit harder to
visually count this, but using some actual paper and pencil I was able to trace
it out to help. This resulted in $20$ paths. Putting these all into a table, a
slight pattern emerges.

| Grid Size | Nodes | Edges | Paths |
| --------- | ----- | ----- | ----- |
| 2         | 9     | 12    | 6     |
| 3         | 16    | 24    | 20    |
| 4         | 25    | 40    | ?     |
| 20        | 441   | 840   | ?     |

The number of paths of $P(2) = (\sqrt{N(n)} - 1)\sqrt{N(n)} = 2\sqrt{9} = 6$,
the number of paths for $P(3) = (\sqrt{N(n)} + 1)\sqrt{N(n)} = 5\sqrt{16} = 20$.
This is a bit of a stretch, but maybe there is some alternating pattern here?
Manually counting the paths for $n=4$ is too difficult, so what if we try $n=1$?
Sometimes $1$ can be a special case, but its worth trying anyways.

```
(0,0) → (1,0)
  ↓       ↓
(0,1) → (1,1)
```

So for $n=1$, we have $N(1) = (1+1)^2 = 4$, $E(1) = 2 \cdot 1 \cdot (1+1) = 4$.
So far so good, I think the formulas for nodes and edges are correct at least.
Okay but what about paths? Its trivial to see that there is only two paths,
either right then down or down then right. Does this fit the formula?
$P(1) = (\sqrt{N(n)} + 1)\sqrt{N(n)} = (2+1) \cdot 2 \neq 2$. Darn. Well if we
tried $P(4) = (\sqrt{N(n)} - 1)\sqrt{N(n)} = (5-1) \cdot 5 = 20$; thats
definitely not right. Okay so the formula $P$ is currently incorrect, but I feel
like I'm close. This likely has to incorporate the edges value too. I think
there also has to be some principle that the graph is also symmetric, right? At
least I think these graphs are symmetric. If I drew a line from the top left to
the bottom right, it would be symmetric across that line.

Considering the symmetry of graph $n=2$, there are $3$ nodes along the
reflection, and $3$ more nodes and $6$ edges on either side of the reflection.
For $n=3$, there are $4$ nodes along the reflection, and $6$ more nodes and $12$
edges on either side of the reflection. This works out to be
$\operatorname{RE}(n) = E(n)/2$ edges on either side of the reflection, $n+1$
nodes along the reflection, and $\frac{n(n+1)}{2}$ nodes on either side of the
reflection. I recognized that formula as the formula for the $n$th triangular
number we used in problem 12 (or the sum of the first $n$ natural numbers). I
don't know if I should be including the nodes along the reflection or not so we
may consider two formulas for the reflection nodes,
$\operatorname{RN_1}(n) = (n+1) + \frac{n(n+1)}{2}$ and
$\operatorname{RN_2}(n) = \frac{n(n+1)}{2}$.

Lets try these formulas for $n=1$:

$$
\begin{aligned}
\operatorname{RE}(1) &= 4/2 = 2 \\
\operatorname{RN_1}(1) &= (1+1) + 1(1+1)/2 = 2 + 1 = 3 \\
\operatorname{RN_2}(1) &= 1(1+1)/2 = 1
\end{aligned}
$$

Okay so that all checks out!

Lets add these values to the table:

| $n$ | $N(n)$ | $E(n)$ | $P(n)$ | $\operatorname{RE}(n)$ | $\operatorname{RN_1}(n)$ | $\operatorname{RN_2}(n)$ |
| --- | ------ | ------ | ------ | ---------------------- | ------------------------ | ------------------------ |
| 1   | 4      | 4      | 2      | 2                      | 3                        | 1                        |
| 2   | 9      | 12     | 6      | 6                      | 6                        | 3                        |
| 3   | 16     | 24     | 20     | 12                     | 10                       | 6                        |
| 4   | 25     | 40     | ?      | 20                     | 15                       | 10                       |
| 20  | 441    | 840    | ?      | 420                    | 231                      | 210                      |

Still no magic formula for $P(n)$ is jumping out.

After looking at the graphs again, I recognize that each graph fully encompasses
the previous. An additional row and column is added the previous graph. So since
the paths of one graph always ends at the bottom right node, you can quickly
determine two more unique paths in the next graph by going down then right or
right then down from the previous last node to the new last node. This means we
can say that the $P(n)$ is so far $P(n-1) + 2$.

This observation also highlights to me that $N(n) = N(n-1) + (2n + 1)$ which is
consistent with the formula $N(n) = (n+1)^2$.

$N(n-1) = (n-1+1)^2 = n^2$

Now its simple enough to just plug this back into $N(n)$, but we can also use
the difference:

$N(N) - N(n-1) = (n+1)^2 - n^2 = n^2 + 2n + 1 - n^2 = 2n + 1$

Thus, $N(n) = N(n-1) + 2n + 1$.

The key here is you gain $2n + 1$ new nodes in the next graph, which is the
number of nodes in the new row and column added to the previous graph.

I can tell I'm super close to solving this; there is something to this
encapsulation and iteration relationship that I think will let me derive a
formula for $P(n)$ based on previous values. We have a lot of useful formulas
here. I think there must be someway we can express $P(n)$ in terms of $P(n-1)$,
$N(n)$, and $E(n)$. Maybe we can use the reflection formulas too, but my
intuition tells me thats not as important here. It'll likely be more of an
identity thing, such as whatever the formula is divided by 2 or square rooted
will wind up revealing a reflection formula.

What about edges? Can we find $E(n)$ in terms of $E(n-1)$?

Given $E(n) = 2n(n+1)$, we can express this in terms of $E(n-1)$:

$E(n-1) = 2(n-1)(n-1+1) = 2n^2 - 2n$

Then, $E(n) - E(n-1) = 2n(n+1) - (2n^2 - 2n) = 2n^2 + 2n - 2n^2 + 2n = 4n$

Thus, $E(n) = E(n-1) + 4n$

Now we have both $N(n)$ and $E(n)$ in terms of their previous values.

<details>
<summary>Answer (click to reveal)</summary>

</details>

TODO

</details>
