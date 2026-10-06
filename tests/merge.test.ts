import { merge } from '../src/merge';

describe('merge', () => {
  it('merges three non-empty collections into ascending order', () => {
    expect(merge([0, 3, 5, 9], [10, 6, 4, 1, 0], [2, 7, 8, 11])).toEqual([
      0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    ]);
  });

  it('returns an empty array when all collections are empty', () => {
    expect(merge([], [], [])).toEqual([]);
  });

  it('handles only collection_1 non-empty', () => {
    expect(merge([0, 1, 2], [], [])).toEqual([0, 1, 2]);
  });

  it('handles only collection_2 non-empty (reverses descending input)', () => {
    expect(merge([], [5, 3, 1, 0], [])).toEqual([0, 1, 3, 5]);
  });

  it('handles only collection_3 non-empty', () => {
    expect(merge([], [], [0, 4, 8])).toEqual([0, 4, 8]);
  });

  it('handles one empty collection among non-empty ones', () => {
    expect(merge([1, 4], [], [2, 3])).toEqual([1, 2, 3, 4]);
    expect(merge([], [9, 2], [1, 5])).toEqual([1, 2, 5, 9]);
    expect(merge([0, 7], [8, 3], [])).toEqual([0, 3, 7, 8]);
  });

  it('keeps duplicates within and across collections', () => {
    expect(merge([0, 2, 2], [2, 2, 0], [0, 2])).toEqual([0, 0, 0, 2, 2, 2, 2, 2]);
  });

  it('handles all identical values', () => {
    expect(merge([0, 0], [0, 0], [0])).toEqual([0, 0, 0, 0, 0]);
  });

  it('handles non-overlapping ranges', () => {
    expect(merge([0, 1, 2], [8, 7, 6], [3, 4, 5])).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('handles collections of very different lengths', () => {
    expect(merge([100], [50, 40, 30, 20, 10, 0], [5])).toEqual([0, 5, 10, 20, 30, 40, 50, 100]);
  });

  it('handles single-element collections', () => {
    expect(merge([3], [1], [2])).toEqual([1, 2, 3]);
  });

  it('does not mutate the input collections', () => {
    const c1 = [0, 2, 4];
    const c2 = [5, 3, 1];
    const c3 = [0, 6];
    merge(c1, c2, c3);
    expect(c1).toEqual([0, 2, 4]);
    expect(c2).toEqual([5, 3, 1]);
    expect(c3).toEqual([0, 6]);
  });

  it('does not use any built-in sort function', () => {
    const sortSpy = jest.spyOn(Array.prototype, 'sort');
    const toSortedSpy =
      'toSorted' in Array.prototype
        ? jest.spyOn(Array.prototype as unknown as { toSorted: () => unknown[] }, 'toSorted')
        : null;

    merge([0, 5, 9], [8, 4, 0], [1, 2, 3]);

    expect(sortSpy).not.toHaveBeenCalled();
    toSortedSpy && expect(toSortedSpy).not.toHaveBeenCalled();
    sortSpy.mockRestore();
    toSortedSpy?.mockRestore();
  });

  it('matches a reference result on large random inputs', () => {
    const randomAsc = (n: number): number[] => {
      const arr: number[] = [];
      let v = 0;
      for (let x = 0; x < n; x++) {
        v += Math.floor(Math.random() * 5);
        arr.push(v);
      }
      return arr;
    };

    for (let round = 0; round < 50; round++) {
      const c1 = randomAsc(Math.floor(Math.random() * 200));
      const c2 = randomAsc(Math.floor(Math.random() * 200)).reverse();
      const c3 = randomAsc(Math.floor(Math.random() * 200));

      // Reference uses sort only inside the test to verify correctness.
      const expected = [...c1, ...c2, ...c3].sort((a, b) => a - b);
      expect(merge(c1, c2, c3)).toEqual(expected);
    }
  });
});
