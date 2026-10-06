# merge-sorted-collections

A TypeScript implementation of

```
merge(collection_1: number[], collection_2: number[], collection_3: number[]): number[]
```

It returns every element of the three collections in a single array sorted **ascending**.

Input assumptions:

| Input          | Order                              |
| -------------- | ---------------------------------- |
| `collection_1` | ascending (min `0` → max)          |
| `collection_2` | **descending** (max → min `0`)     |
| `collection_3` | ascending (min `0` → max)          |

These orderings are trusted as given and not validated. Input that breaks them
(e.g. an unsorted collection or negative values) produces an unspecified result.

## Approach (no sort function used)

This is a **three-way merge**, the same idea as the merge step of merge sort:

- Keep one pointer per collection. `collection_1` and `collection_3` are read from the front.
  `collection_2` is read **from the back**, so its values also arrive in ascending order,
  and it never has to be reversed or copied.
- At each step, take the smallest of the three current values and advance that pointer.
  When a collection runs out, its value counts as `Infinity`.

**Complexity:** O(n₁ + n₂ + n₃) time and O(n₁ + n₂ + n₃) space for the output.
The inputs are not mutated.

No `Array.prototype.sort` / `toSorted` is used in `src/`. A unit test spies on both to prove it.

## Project structure

```
src/
  merge.ts        # merge() implementation
  index.ts        # public export
  main.ts         # small runnable demo
tests/
  merge.test.ts   # Jest unit tests
```

## Setup

Requirements: **Node.js ≥ 18** and npm.

```bash
git clone https://github.com/Peanutt47/merge-sorted-collections.git
cd merge-sorted-collections
npm install
```

## Run the code

```bash
# run the demo directly from TypeScript
npm run dev

# or compile to dist/ and run the JavaScript output
npm start
```

Example output:

```
collection_1 (asc):  [ 0, 3, 5, 9 ]
collection_2 (desc): [ 10, 6, 4, 1, 0 ]
collection_3 (asc):  [ 2, 7, 8, 11 ]
merged (asc):        [ 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ]
```

## Run the unit tests

```bash
npm test             # run all tests
npm run test:coverage   # with coverage report
```

The tests cover:

- typical merges, and all-empty inputs
- each collection empty or used alone, including reversing the descending `collection_2`
- duplicates within and across collections
- non-overlapping ranges, lengths that differ widely, and single-element collections
- the inputs are not mutated, and a new array is returned
- no built-in sort is called
- seeded (reproducible) random tests, 50 rounds, against a reference result

> Note: TypeScript is pinned to `^5` because `ts-jest` needs the JavaScript compiler API,
> which TypeScript 7 (the native compiler) no longer exposes.
