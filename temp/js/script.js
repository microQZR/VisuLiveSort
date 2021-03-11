/* Inter script common variables declarations */
let randNumArray;
let maxNumVal;
let maxHeight;


/*** For main DOM array generation and sizing ***/

//The following line declares independent variables for determining the main array's dimensions
let minWidth = 10, minGap = 5, minCount = 10, maxWidth = 30;

let containerMaxWidth = document.querySelector('.main-sec-container').getBoundingClientRect().width;
let arrSizeSliderVal = 0.25; //IMPORTANT - Effective main-array size controller
let maxCount = containerMaxWidth / (minWidth + minGap);

//The following lines declare the (computed) main variables of interest for determining the main array's dimensions
let count = (maxCount - minCount) * arrSizeSliderVal + minCount;
let width = minWidth * (maxCount / ((2 - arrSizeSliderVal) * count)) < maxWidth ? minWidth * (maxCount / ((2 - arrSizeSliderVal) * count)) : maxWidth;
let gap = Math.ceil(width / 2 + (5 * (1 - arrSizeSliderVal)));
count = Math.floor(count - 2 * arrSizeSliderVal); //Adjustment code to make sure main array elements don't protrude div#main-array.main-array-box and making sure that $count is an integer value.

//Defines the random number array, the max numerical value of the numbers array and the max height of the DOM "main-array"'s child elements
randNumArray = newRandNumArray(count);

maxNumVal = 100;
maxHeight = document.querySelector('.main-array-box').getBoundingClientRect().height;

//For generating the main array of poper dimensions
let mainArrayBox = document.querySelector('.main-array-box'); //Selects the old div#main-array.main-array-box to be replaced
let newArrayBox = mainArrayBox.cloneNode(false);
newArrayBox.style.width = count * (width + gap) - gap + 'px'; //Set the CSS width of the new div#main-array.main-array-box
newArrayBox.innerHTML = `<div class="array-item" data-currentindex="0" style="width: ${width}px">
<div class="slider-bar drag-sort-handle" style="width: ${width}px; height: ${randNumArray[0] / 100 * maxHeight}px;"></div>
<div class="slider-circ slider-handle flex" style="width: ${width + gap/2}px; height: ${width + gap/2}px; top: ${(-(width + gap/2) / 2) + ((1 - randNumArray[0] / 100) * maxHeight)}px; left: -${gap / 4}px">${randNumArray[0]}</div>
</div>`; //This statement and the next populates the new div#main-array.main-array-box with the right number of child elements
for (let i = 1; i < count; i++) {
    newArrayBox.insertAdjacentHTML('beforeend', `<div class="array-item" data-currentindex="${i}" style="width: ${width}px">
    <div class="slider-bar drag-sort-handle" style="width: ${width}px; height: ${randNumArray[i] / 100 * maxHeight}px;"></div>
    <div class="slider-circ slider-handle flex" style="width: ${width + gap/2}px; height: ${width + gap/2}px; top: ${(-(width + gap/2) / 2) + ((1 - randNumArray[i] / 100) * maxHeight)}px; left: -${gap / 4}px">${randNumArray[i]}</div>
    </div>`); //The second argument is the HTML content of main array elements to be inserted into div#main-array.main-array-box
}
mainArrayBox.parentNode.replaceChild(newArrayBox, mainArrayBox); //Replaces the old div#main-array.main-array-box with the new one in the DOM tree



/*** For generating a random number array of the proper size ***/
function newRandNumArray(size) {
    const result = [];
    for (let i = 0; i < size; i++) result.push(Math.round(Math.random() * 100)); //The constant factor multiplied to "Math.random()" determines the range of obtained values.
    return result;
}

//Computes the mean and standard deviation of an array of numbers. Takes an array of numbers as argument. Return an array, where the 1st element is the original argument array, the 2nd element is the mean and the 3rd element is the standard deviation
function meanAndStdDev(arr) {
    let mean = arr.reduce((accum, elem) => accum + elem, 0) / arr.length;
    let stdDev = Math.sqrt(arr.reduce((accum, elem) => accum + Math.pow(elem - mean, 2), 0) / arr.length);
    return [arr, mean, stdDev];
}



//DEBUG LINES BELOW
// console.log("arrSizeSliderVal: ", arrSizeSliderVal);
// console.log("count: ", count);
// console.log("newArrayBox.childElementCount:", newArrayBox.childElementCount);
// console.log("width: ", width);
// console.log("gap: ", gap);
//DEBUG SECTION END



//DEBUG SECTION BELOW //Testing whether Math.random() indeed generates randomly distributed numbers //!OK PASSED TEST!
// let testCount = [0,0,0,0,0,0,0,0,0,0,0,]
  
// for (let i = 0; i < 1000000; i++) {
//   testCount[Math.round(Math.random() * 10)]++;
// }

// for (let key in testCount) {
//   console.log(`${key}: ${testCount[key]}`);
// }
//DEBUG SECTION END
