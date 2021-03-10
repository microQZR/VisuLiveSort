/*** For main DOM array generation and sizing ***/

//The following line declares independent variables for determining the main array's dimensions
let minWidth = 10, minGap = 5, minCount = 10, maxWidth = 30;

let containerMaxWidth = document.querySelector('.main-sec-container').offsetWidth;
let arrSizeSliderVal = 0.1; //IMPORTANT - Effective main-array size controller
let maxCount = containerMaxWidth / (minWidth + minGap);

//The following lines declare the (computed) main variables of interest for determining the main array's dimensions
let count = (maxCount - minCount) * arrSizeSliderVal + minCount;
let width = minWidth * (maxCount / ((2 - arrSizeSliderVal) * count)) < maxWidth ? minWidth * (maxCount / ((2 - arrSizeSliderVal) * count)) : maxWidth;
let gap = Math.ceil(width / 2 + (5 * (1 - arrSizeSliderVal)));
count = Math.floor(count - 2 * arrSizeSliderVal); //Adjustment code to make sure main array elements don't protrude div#main-array.main-array-box and making sure that $count is an integer value.

//For generating the main array of poper dimensions
let mainArrayBox = document.querySelector('.main-array-box'); //Selects the old div#main-array.main-array-box to be replaced

// let arrElementHtml = `<div class="array-item" style="width: ${width}px">00</div>` //HTML content of main array elements to be inserted into div#main-array.main-array-box
let arrElementHtml = `<div class="slider-track array-item" style="width: ${width}px">
<div class="slider-bar drag-sort-handle" style="width: ${width}px"></div>
<div class="slider-circ slider-handle flex" style="width: ${width + gap/2}px; height: ${width + gap/2}px; top: -${(width + gap/2) / 2}px; left: -${gap / 4}px">88</div>
</div>` //HTML content of main array elements to be inserted into div#main-array.main-array-box

let newArrayBox = mainArrayBox.cloneNode(false);
newArrayBox.style.width = count * (width + gap) - gap + 'px'; //Set the CSS width of the new div#main-array.main-array-box
newArrayBox.innerHTML = arrElementHtml; //This statement and the next populates the new div#main-array.main-array-box with the right number of child elements
for (let i = 1; i < count; i++) {
    newArrayBox.insertAdjacentHTML('beforeend', arrElementHtml);
}
mainArrayBox.parentNode.replaceChild(newArrayBox, mainArrayBox); //Replaces the old div#main-array.main-array-box with the new one in the DOM tree

//DEBUG LINES BELOW
console.log("arrSizeSliderVal: ", arrSizeSliderVal);
console.log("count: ", count);
console.log("newArrayBox.childElementCount:", newArrayBox.childElementCount);
// console.log("real count: ", document.getElementById('main-array').childElementCount);
console.log("width: ", width);
console.log("gap: ", gap);
//DEBUG SECTION END


/*** For generating a random number array of the proper size ***/
function newRandNumArray(size) {
    const result = [];
    for (let i = 0; i < size; i++) result.push(Math.random() * 10); //The constant factor multiplied to "Math.random()" determines the range of obtained values.
    return result;
}


//DEBUG LINES BELOW
var testTarget = document.querySelector('.slider-target');
// testTarget.textContent = '111';
// testTarget.style.fo

