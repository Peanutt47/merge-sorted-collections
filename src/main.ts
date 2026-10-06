import { merge } from './merge';

const collection_1 = [0, 3, 5, 9];
const collection_2 = [10, 6, 4, 1, 0];
const collection_3 = [2, 7, 8, 11];

console.log('collection_1 (asc): ', collection_1);
console.log('collection_2 (desc):', collection_2);
console.log('collection_3 (asc): ', collection_3);
console.log('merged (asc):       ', merge(collection_1, collection_2, collection_3));
