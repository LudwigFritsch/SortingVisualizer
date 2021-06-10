const animations = [];
export default function getQuickSortAnimations(arr, start, end) {
  if (start === 0 && end === arr.length - 1) animations.length = 0;

  // Base case or terminating case
  if (start >= end) {
    return;
  }

  // Returns pivotIndex
  let index = partition(arr, start, end);
  animations.push([index, "pivotIndex"]);

  // Recursively apply the same logic to the left and right subarrays
  getQuickSortAnimations(arr, start, index - 1);
  getQuickSortAnimations(arr, index + 1, end);
  return animations;
}

function partition(arr, start, end) {
  // Taking the last element as the pivot
  const pivotValue = arr[end];
  let pivotIndex = start;
  animations.push([pivotIndex, "pivotTemp"]);
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      animations.push([i, arr[i], pivotIndex, arr[pivotIndex], "swap"]);
      // Swapping elements
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
      // Moving to next element
      pivotIndex++;
      animations.push([pivotIndex, "pivotTemp"]);
    }
  }

  // Putting the pivot value in the middle
  animations.push([
    pivotIndex,
    arr[pivotIndex],
    end,
    arr[end],
    "MOVE PIVOT TO MIDDLE",
  ]);
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
  return pivotIndex;
}
