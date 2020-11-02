import Character from "./Character";

export function matrix(length) {
  const matrix = [];
  let el = 0;

  for (let i = 0; i < length; i += Math.sqrt(length)) {
    matrix[el] = [];
    for (let j = i; j < (el + 1) * Math.sqrt(length); j++) {
      matrix[el].push(j);
    }
    el++;
  }

  return matrix;
}

export function binar(position) {
  let i = Math.trunc(position / 8);
  let j = position % 8;

  return [i, j];
}

export function distArray(position, matrixArr, dist) {
  const charBinarPosition = binar(position);

  let minX = charBinarPosition[0] - dist;
  let maxX = charBinarPosition[0] + dist;
  let minY = charBinarPosition[1] - dist;
  let maxY = charBinarPosition[1] + dist;

  if (minX < 0) {
    minX = 0;
  }

  if (maxX > 8) {
    maxX = 7;
  }

  if (minY < 0) {
    minY = 0;
  }

  if (maxY > 8) {
    maxY = 7;
  }
  
  const distArr = [];

  matrixArr.forEach((arr) => {
    arr.forEach((el) => {
      const binarEl = binar(el);
      if (
        binarEl[0] >= minX &&
        binarEl[0] <= maxX &&
        binarEl[1] >= minY &&
        binarEl[1] <= maxY 
      ) {
        distArr.push(el);
      }
    });
  });

  distArr.splice(distArr.indexOf(position), 1);

  return distArr;
}
