/**
 * Merges three pre-sorted integer collections into a single array sorted ascending.
 *
 * Preconditions:
 *  - collection_1 is sorted ascending (min -> max)
 *  - collection_2 is sorted descending (max -> min)
 *  - collection_3 is sorted ascending (min -> max)
 *
 * No sort function is used: this is a three-way merge (like the merge step of
 * merge sort). collection_2 is read from its last index backwards, which
 * yields its values in ascending order without reversing or copying it.
 *
 * Time: O(n1 + n2 + n3)   Space: O(n1 + n2 + n3) for the result
 */
export function merge(
  collection_1: number[],
  collection_2: number[],
  collection_3: number[],
): number[] {
  const result: number[] = new Array(
    collection_1.length + collection_2.length + collection_3.length,
  );

  let i = 0; // collection_1: front -> back
  let j = collection_2.length - 1; // collection_2: back -> front
  let k = 0; // collection_3: front -> back
  let out = 0;

  while (i < collection_1.length || j >= 0 || k < collection_3.length) {
    const a = i < collection_1.length ? collection_1[i] : Infinity;
    const b = j >= 0 ? collection_2[j] : Infinity;
    const c = k < collection_3.length ? collection_3[k] : Infinity;

    if (a <= b && a <= c) {
      result[out++] = a;
      i++;
    } else if (b <= c) {
      result[out++] = b;
      j--;
    } else {
      result[out++] = c;
      k++;
    }
  }

  return result;
}
