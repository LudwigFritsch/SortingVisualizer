export default function getBubbleSortAnimations(array) {
  const animations = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 1; j < array.length - i; j++) {
      animations.push([j - 1, j]);
      if (j === array.length - i - 1) {
        animations.push(j);
      }
      if (array[j] < array[j - 1]) {
        let temp = array[j - 1];
        array[j - 1] = array[j];
        array[j] = temp;
      }
    }
  }
  animations.push(0);
  console.log(animations);
  return animations;
}
