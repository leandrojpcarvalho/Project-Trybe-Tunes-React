const objComp = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  0: 6,
  1: 7,
  2: 8,
  3: 9,
  4: 10,
  5: 11,
  6: 12,
  7: 13,
  8: 14,
  9: 15,
};
const objInverse = {
  0: 'a',
  1: 'b',
  2: 'c',
  3: 'd',
  4: 'e',
  5: 'f',
  6: 0,
  7: 1,
  8: 2,
  9: 3,
  10: 4,
  11: 5,
  12: 6,
  13: 7,
  14: 8,
  15: 9,
};
export const generateColor = (color: string) => {
  const splitedColor = color.split('');
  return splitedColor.reduce((newColor, currLetter) => {
    if (currLetter === '#') {
      newColor += '#';
    } else if (Number(currLetter)) {
      newColor += (objInverse[Math.abs(Number(currLetter) + 3)]);
    } else {
      newColor += (objInverse[Math.abs(objComp[currLetter] + 3)]);
    }
    return newColor;
  }, '');
};
