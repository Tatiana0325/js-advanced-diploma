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

export function binar(position, length) {
  let arr = matrix(length);
  let i = 0;
  let j = 0;
  let flag = false;

  arr.forEach((element) => {
    element.forEach((item) => {
      if (item === position) {
        i = element.indexOf(item);
        flag = true;
      }
    });

    if (flag) {
      j = arr.indexOf(element);
      flag = false;
    }
  });

  return [j, i];
}

export function distArray(position, length, dist) {
  const charBinarPosition = binar(position, length);
  const matrixArr = matrix(length);

  let minX = charBinarPosition[0] - dist;
  let maxX = charBinarPosition[0] + dist;
  let minY = charBinarPosition[1] - dist;
  let maxY = charBinarPosition[1] + dist;

  if (minX < 0) {
    minX = 0;
  }

  if (maxX >= Math.sqrt(length) - 1) {
    maxX = Math.sqrt(length) - 1;
  }

  if (minY < 0) {
    minY = 0;
  }

  if (maxY >= Math.sqrt(length) - 1) {
    maxY = Math.sqrt(length) - 1;
  }

  const distArr = [];

  matrixArr.forEach((element) => {
    element.forEach((el) => {
      const binarEl = binar(el, length);
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