import React, { useState, useEffect } from "react";
import "./SortingVisualizer.css";
import getBubbleSortAnimations from "./algorithms/getBubbleSortAnimations.js";
import getMergeSortAnimations from "./algorithms/getMergeSortAnimations.js";
import getHeapSortAnimations from "./algorithms/getHeapSortAnimations.js";
import getQuickSortAnimations from "./algorithms/getQuickSortAnimations.js";

// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "white";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 2;

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [arrayBars, setArrayBars] = useState(150);

  useEffect(() => {
    resetArray(arrayBars);
  }, [arrayBars]);

  function resetArray(arrayBars) {
    const array = [];
    for (let i = 0; i < arrayBars; i++) {
      array.push(getRandomNumberBetween(10, 600));
    }
    setArray(array);
  }

  function heapSort() {
    //TEST HEAPSORT

    // for (let j = 0; j < 5000; j++) {
    //   setTimeout(() => {
    //     eventFire(document.getElementById("resetArray"), "click");
    //     setTimeout(() => {
    //       const animations = getHeapSortAnimations(array, array.length);

    //       for (let i = 0; i < animations.length; i++) {
    //         const barOne = document.getElementById(animations[i][0]);
    //         const barTwo = document.getElementById(animations[i][2]);
    //         const barOneHeigth = animations[i][1];
    //         const barTwoHeigth = animations[i][3];

    //         barTwo.style.height = `${barOneHeigth}px`;
    //         barOne.style.height = `${barTwoHeigth}px`;
    //       }
    //       for (let i = 0; i < arrayBars - 1; i++) {
    //         const barOne = document.getElementById(i);
    //         const barTwo = document.getElementById(i + 1);
    //         const barOneHeigth = barOne.style.height;
    //         const barTwoHeigth = barTwo.style.height;
    //         if (parseInt(barOneHeigth) <= parseInt(barTwoHeigth)) {
    //           console.log("passed");
    //         }
    //       }
    //     }, 500);
    //   }, j * 1000);
    // }

    const animations = getHeapSortAnimations(array, array.length);

    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        const barOne = document.getElementById(animations[i][0]);
        const barTwo = document.getElementById(animations[i][2]);
        makeColorHeap(barOne, barTwo);
        const barOneHeigth = animations[i][1];
        const barTwoHeigth = animations[i][3];

        barTwo.style.height = `${barOneHeigth}px`;
        barOne.style.height = `${barTwoHeigth}px`;
      }, i * ANIMATION_SPEED_MS * 6);
      if (i === animations.length - 1) {
        setTimeout(() => {
          makeArrayFlash();
        }, i * ANIMATION_SPEED_MS * 6 + 100);
      }
    }
  }

  function quickSort() {
    const animations = getQuickSortAnimations(array, 0, array.length - 1);
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        if (animations[i].length > 2) {
          const barOne = document.getElementById(animations[i][0]);
          const barTwo = document.getElementById(animations[i][2]);
          makeColorHeap(barOne, barTwo);
          const barOneHeigth = animations[i][1];
          const barTwoHeigth = animations[i][3];

          barTwo.style.height = `${barOneHeigth}px`;
          barOne.style.height = `${barTwoHeigth}px`;
        } else if (
          animations[i].length === 2 &&
          animations[i][1] !== "pivotTemp"
        ) {
          const pivotBar = document.getElementById(animations[i][0]);
          makeColorPivot(pivotBar);
        } else if (
          animations[i].length === 2 &&
          animations[i][1] === "pivotTemp"
        ) {
          const pivotTemp = document.getElementById(animations[i][0]);
          makeColorTemp(pivotTemp);
        }
      }, i * ANIMATION_SPEED_MS * 6);
      if (i === animations.length - 1) {
        setTimeout(() => {
          makeArrayFlash();
        }, i * ANIMATION_SPEED_MS * 6 + 10);
      }
    }
  }

  function mergeSort() {
    const animations = getMergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
      if (i === animations.length - 1) {
        setTimeout(() => {
          makeArrayFlash();
        }, i * ANIMATION_SPEED_MS + 10);
      }
    }
  }

  async function bubbleSort() {
    const animations = getBubbleSortAnimations(array);

    for (let i = 0; i < animations.length; i++) {
      if (animations[i] > -1) {
        setTimeout(() => {
          const barOne = document.getElementById(animations[i]);
          barOne.style.backgroundColor = "white";
        }, i * ANIMATION_SPEED_MS);
      }
      if (animations[i].length > 1) {
        setTimeout(() => {
          const barOne = document.getElementById(animations[i][0]);
          const barTwo = document.getElementById(animations[i][1]);
          makeColor(barOne, barTwo);
          const barOneHeigth = barOne.style.height;
          const barTwoHeigth = barTwo.style.height;
          if (parseInt(barOneHeigth) > parseInt(barTwoHeigth)) {
            const temp = barTwo.style.height;
            barTwo.style.height = barOneHeigth;
            barOne.style.height = temp;
          }
        }, i * ANIMATION_SPEED_MS);
      }
      if (i === animations.length - 1) {
        setTimeout(() => {
          makeArrayFlash();
        }, i * ANIMATION_SPEED_MS + 100);
      }
    }
  }

  return (
    <div>
      <div className="navbar" id="navbar">
        <div
          className="a"
          id="resetArray"
          onClick={() => {
            resetArray(arrayBars);
          }}
        >
          Generate a new Array
        </div>
        <div
          className="a"
          onClick={() => {
            bubbleSort();
          }}
        >
          Bubble Sort
        </div>
        <div className="a" onClick={mergeSort}>
          Merge Sort
        </div>
        <div className="a" onClick={quickSort}>
          Quick Sort
        </div>
        <div className="a" onClick={heapSort}>
          Heap Sort
        </div>
        {/* <div className="a" onClick={makeArrayFlash}>
          Flash
        </div> */}
      </div>

      <div className="container">
        <div className="array-container">
          {array.map((value, Idx) => {
            return (
              <div
                className="array-bar"
                key={Idx}
                id={Idx}
                heigth={value}
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  height: `${value}px`,
                }}
              ></div>
            );
          })}
        </div>
      </div>
      {/* <div className="whiteLine"></div> */}
    </div>
  );
};

export default SortingVisualizer;

export function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function makeColor(barOne, barTwo) {
  barOne.style.backgroundColor = SECONDARY_COLOR;
  barTwo.style.backgroundColor = SECONDARY_COLOR;
  setTimeout(() => {
    barOne.style.backgroundColor = PRIMARY_COLOR;
  }, ANIMATION_SPEED_MS);
}

export function makeColorPivot(barOne) {
  barOne.style.backgroundColor = "purple";
}

export function makeColorTemp(barOne) {
  barOne.style.backgroundColor = "yellow";
}

export function makeColorHeap(barOne, barTwo) {
  barOne.style.backgroundColor = SECONDARY_COLOR;
  barTwo.style.backgroundColor = SECONDARY_COLOR;
  setTimeout(() => {
    barOne.style.backgroundColor = PRIMARY_COLOR;
    barTwo.style.backgroundColor = PRIMARY_COLOR;
  }, ANIMATION_SPEED_MS);
}

export function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}

export function eventFire(el, etype) {
  if (el.fireEvent) {
    el.fireEvent("on" + etype);
  } else {
    var evObj = document.createEvent("Events");
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

export function makeArrayFlash() {
  const arrayBars = document.getElementsByClassName("array-bar");
  console.log(arrayBars);
  for (let i = 0; i < arrayBars.length; i++) {
    const bar = arrayBars[i];
    bar.style.backgroundColor = "salmon";
  }
  setTimeout(() => {
    for (let i = 0; i < arrayBars.length; i++) {
      const bar = arrayBars[i];
      bar.style.backgroundColor = PRIMARY_COLOR;
    }
  }, 1000);
}
