/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
    let maxm = numbers[0];
    for (let index = 0; index < numbers.length; index++) {
        if(numbers[index] > maxm) {
            maxm = numbers[index];
        }
    }
    return maxm;
}

module.exports = findLargestElement;