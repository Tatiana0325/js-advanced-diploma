import {matrix, binar, distArray} from '../js/GameController';

test('Testing function matrix', () => {
  const result = [[0, 1, 2, 3, 4, 5, 6, 7], 
                  [8, 9, 10, 11, 12, 13, 14, 15], 
                  [16, 17, 18, 19, 20, 21, 22, 23], 
                  [24, 25, 26, 27, 28, 29, 30, 31], 
                  [32, 33, 34, 35, 36, 37, 38, 39], 
                  [40, 41, 42, 43, 44, 45, 46, 47], 
                  [48, 49, 50, 51, 52, 53, 54, 55], 
                  [56, 57, 58, 59, 60, 61, 62, 63]];

  expect(matrix(64)).toEqual(result);
});

test('Testing function binar', () => {
  expect(binar(35, 64)).toEqual([4, 3]);
});

test('Testing function distArray', () => {
  const result = [17, 18, 19, 20, 21, 25, 26, 27, 28, 29, 33, 34, 36, 37, 41, 42, 43, 44, 45, 49, 50, 51, 52, 53];
    
  expect(distArray(35, 64, 2)).toEqual(result);
})