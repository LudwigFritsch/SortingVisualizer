# Sorting Visualizer

This project visualizes different sorting algorithms in action. Algorithms implemented are Quicksort, Heapsort, Mergesort and Bubblesort.
You can check it out here: https://ludwigfritsch.github.io/SortingVisualizer/

## Short technical explanation

At the core of this project lies an array of values which is to be sorted.
For each value in the array a bar gets rendered. The height of the bar is the corresponding value in pixels.
A sorting algorithm gets passed this array and returns a two-dimensional-array of "animations".
These animations contain the indices of the two values that get compared.
The array of animations gets traversed and for every comparison the rendered bars swap their heights.
This way the array gets sorted in ascending order.

