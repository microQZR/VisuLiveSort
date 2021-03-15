/* Inter script common variables declarations */
let randNumArray; //The value of $randNumArray will be defined elsewhere
let maxNumVal = 100; //The max numerical value of the numbers array
let count, width, gap; //Declaring the (computed) main variables of interest for determining the main array's dimensions


/* For determining the dimensions of the HTML elements to be inserted dynamically */
//The following line declares independent variables for determining the main array's dimensions
let minWidth = 10, minGap = 5, minCount = 10, maxWidth = 30;
let arrSizeSliderVal = 0.15; //!IMPORTANT! - Effective main-array size controller

//The following lines declare helper variables for determining the dimensions of the "main array", which are dependent on the VIEWPORT.
let containerMaxWidth = document.querySelector('.main-sec-container').getBoundingClientRect().width; //div.main-sec-container is the usable area of section.main-sec for purposes of dispaying the "main array" and other content.
let maxCount = containerMaxWidth / (minWidth + minGap);

calculateWidthGapCount();
generateHTMLMainArray(); //This actually inserts the HTML main array into the HTML document.


function calculateWidthGapCount(customCount) {
    if (customCount) count = customCount;
    else count = (maxCount - minCount) * arrSizeSliderVal + minCount;

    width = containerMaxWidth / count * (minWidth / (minWidth + minGap))
    if (width > maxWidth) width = maxWidth;
    
    gap = containerMaxWidth / count * (minGap / (minWidth + minGap))
    if (gap > maxWidth / 2) gap = maxWidth / 2;
    count = Math.floor(count); //Adjustment code to make sure main array elements don't protrude div#main-array.main-array-box and making sure that $count is an integer value.
};

/* For generating and inserting the HTML main array */
function generateHTMLMainArray(customArray) {
    if (customArray) randNumArray = customArray; //Uses a custom number array obtained from user input
    else randNumArray = newRandNumArray(count, maxNumVal); //Defines the random number array

    //For generating the main array of poper dimensions
    let maxHeight = document.querySelector('.main-array-box').getBoundingClientRect().height; //The max height of the "main-array"'s component child elements
    let mainArrayBox = document.querySelector('.main-array-box'); //Selects the old div#main-array.main-array-box to be replaced
    let newArrayBox = mainArrayBox.cloneNode(false);
    newArrayBox.style.width = count * (width + gap) - gap + 'px'; //Set the CSS width of the new div#main-array.main-array-box
    newArrayBox.innerHTML = `<div class="array-item" data-currentindex="0" style="width: ${width}px">
    <div class="slider-bar drag-sort-handle" style="width: ${width}px; height: ${randNumArray[0] / maxNumVal * maxHeight}px;"></div>
    <div class="slider-circ slider-handle flex" style="width: ${width + gap/2}px; height: ${width + gap/2}px; top: ${(-(width + gap/2) / 2) + ((1 - randNumArray[0] / maxNumVal) * maxHeight)}px; left: -${gap / 4}px">${randNumArray[0]}</div>
    </div>`; //This statement and the next populates the new div#main-array.main-array-box with the right number of child elements
    for (let i = 1; i < count; i++) {
        newArrayBox.insertAdjacentHTML('beforeend', `<div class="array-item" data-currentindex="${i}" style="width: ${width}px">
        <div class="slider-bar drag-sort-handle" style="width: ${width}px; height: ${randNumArray[i] / maxNumVal * maxHeight}px;"></div>
        <div class="slider-circ slider-handle flex" style="width: ${width + gap/2}px; height: ${width + gap/2}px; top: ${(-(width + gap/2) / 2) + ((1 - randNumArray[i] / maxNumVal) * maxHeight)}px; left: -${gap / 4}px">${randNumArray[i]}</div>
        </div>`); //The second argument is the HTML content of main array elements to be inserted into div#main-array.main-array-box
    }
    mainArrayBox.parentNode.replaceChild(newArrayBox, mainArrayBox); //Replaces the old div#main-array.main-array-box with the new one in the DOM tree
};

/* For generating a random number array of the proper size */
function newRandNumArray(size, maxVal) {
    const result = [];
    for (let i = 0; i < size; i++) result.push(Math.round(Math.random() * maxVal)); //The constant factor multiplied to "Math.random()" determines the range of obtained values.
    return result;
};

/* Computes the mean and standard deviation of an array of numbers. Takes an array of numbers as argument. Return an array, where the 1st element is the original argument array, the 2nd element is the mean and the 3rd element is the standard deviation */
function meanAndStdDev(arr) {
    let mean = arr.reduce((accum, elem) => accum + elem, 0) / arr.length;
    let stdDev = Math.sqrt(arr.reduce((accum, elem) => accum + Math.pow(elem - mean, 2), 0) / arr.length);
    return [arr, mean, stdDev];
};



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
