export default function getHeapSortAnimations(array) {
  const animations = [];

  let size = array.length;

  // build heapSort (rearrange array)
  for (let i = Math.floor(size / 2 - 1); i >= 0; i--)
    heapify(array, size, i, animations);

  // one by one extract an element from heapSort
  for (let i = size - 1; i >= 0; i--) {
    // move current root to end
    animations.push([0, array[0], i, array[i], "final"]);
    let temp = array[0];
    array[0] = array[i];
    array[i] = temp;

    // call max heapify on the reduced heapSort
    heapify(array, i, 0, animations);
  }
  return animations;
}

// to heapify a subtree rooted with node i which is an index in array[]
function heapify(array, size, i, animations) {
  let max = i; // initialize max as root
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  // if left child is larger than root
  if (left < size && array[left] > array[max]) max = left;

  // if right child is larger than max
  if (right < size && array[right] > array[max]) max = right;

  // if max is not root
  if (max !== i) {
    // swap
    animations.push([i, array[i], max, array[max]]);
    let temp = array[i];
    array[i] = array[max];
    array[max] = temp;

    // recursively heapify the affected sub-tree
    heapify(array, size, max, animations);
  }
}
