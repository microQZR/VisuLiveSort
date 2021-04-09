/**
* Author:    microQZR <z.h.m@outlook.com>
* Copyright: (c) 2021 microQZR
* License:   GNU General Public License Version 3
**/

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
    count = Math.floor(count); //Adjustment code to make sure main array elements don't protrude div.main-array and making sure that $count is an integer value.
};

/* For generating and inserting the HTML main array */
function generateHTMLMainArray(customArray) {
    if (customArray) randNumArray = customArray; //Uses a custom number array obtained from user input
    else randNumArray = newRandNumArray(count, maxNumVal); //Defines the random number array

    //For generating the main array of poper dimensions
    let maxHeight = document.querySelector('.main-array').getBoundingClientRect().height; //The max height of the "main-array"'s component child elements
    let mainArrayBox = document.querySelector('.main-array'); //Selects the old div.main-array to be replaced
    let newArrayBox = mainArrayBox.cloneNode(false);
    newArrayBox.style.width = count * (width + gap) - gap + 'px'; //Set the CSS width of the new div.main-array
    newArrayBox.innerHTML = `<div class="array-item" data-currentindex="0" style="width: ${width}px">
    <div class="slider-bar drag-sort-handle" style="width: ${width}px; height: ${randNumArray[0] / maxNumVal * maxHeight}px;"></div>
    <div class="slider-circ slider-handle flex" style="width: ${width + gap/2}px; height: ${width + gap/2}px; top: ${(-(width + gap/2) / 2) + ((1 - randNumArray[0] / maxNumVal) * maxHeight)}px; left: -${gap / 4}px"><span class="number-display">${randNumArray[0]}</span></div>
    </div>`; //This statement and the next populates the new div.main-array with the right number of child elements
    for (let i = 1; i < count; i++) {
        newArrayBox.insertAdjacentHTML('beforeend', `<div class="array-item" data-currentindex="${i}" style="width: ${width}px">
        <div class="slider-bar drag-sort-handle" style="width: ${width}px; height: ${randNumArray[i] / maxNumVal * maxHeight}px;"></div>
        <div class="slider-circ slider-handle flex" style="width: ${width + gap/2}px; height: ${width + gap/2}px; top: ${(-(width + gap/2) / 2) + ((1 - randNumArray[i] / maxNumVal) * maxHeight)}px; left: -${gap / 4}px"><span class="number-display">${randNumArray[i]}</span></div>
        </div>`); //The second argument is the HTML content of main array elements to be inserted into div.main-array
    }
    mainArrayBox.parentNode.replaceChild(newArrayBox, mainArrayBox); //Replaces the old div.main-array with the new one in the DOM tree
};

/* For generating a random number array of the proper size */
function newRandNumArray(size, maxVal) {
    const result = [];
    for (let i = 0; i < size; i++) result.push(Math.floor(Math.random() * (maxVal + 1))); //The constant factor multiplied to "Math.random()" determines the range of obtained values.
    return result;
};

/* Computes the mean and standard deviation of an array of numbers. Takes an array of numbers as argument. Return an array, where the 1st element is the original argument array, the 2nd element is the mean and the 3rd element is the standard deviation */
function meanAndStdDev(arr) {
    let mean = arr.reduce((accum, elem) => accum + elem, 0) / arr.length;
    let stdDev = Math.sqrt(arr.reduce((accum, elem) => accum + Math.pow(elem - mean, 2), 0) / arr.length);
    return [arr, mean, stdDev];
};

/* For carousel system */
const dynStyleSheet = document.createElement('style');
document.head.appendChild(dynStyleSheet);
const carousel = document.getElementById('carousel');
const carouselRoll = document.getElementById('carousel-roll');
const carouselDots = document.getElementById('carousel-dots-container').children;
// let carouselRollPreviousPos = 0;
let carouselRollCurrentPos = 0;
let carouselDisplayDimen;

function carouselInit() {
    if (document.querySelector('html').clientWidth <= document.querySelector('html').clientHeight) {
        carousel.classList.remove('rectangle');
        carousel.classList.add('square');
    } else {
        carousel.classList.remove('square');
        carousel.classList.add('rectangle');
    }
    carouselDisplayDimen = document.getElementById('carousel-display').getBoundingClientRect();
    dynStyleSheet.innerHTML = `.sm-card {
        width: ${carouselDisplayDimen.width}px;
        height: ${carouselDisplayDimen.height}px;
    }`;
    carouselUpdateSlide(carouselRollCurrentPos);
};

function carouselUpdateSlide(position) {
    carouselRoll.style.left = `-${position * carouselDisplayDimen.width}px`;
    document.querySelector('.carousel-dot.active').classList.remove('active');
    carouselDots[position].classList.add('active');
    carouselRollCurrentPos = position;
};

function carouselNextSlide() {
    //For use if IS using merged cards for #carousel.rectangle
    // if (carousel.classList.contains('rectangle') && carouselRollCurrentPos == 3) carouselUpdateSlide(0);
    // else if (carousel.classList.contains('square') && carouselRollCurrentPos == 5) carouselUpdateSlide(0);
    // else carouselUpdateSlide(carouselRollCurrentPos + 1);

    //For use if not using merged cards for #carouosel.rectangle
    if (carouselRollCurrentPos == 5) carouselUpdateSlide(0);
    else carouselUpdateSlide(carouselRollCurrentPos + 1);
};

function carouselPreviousSlide() {
    //For use if IS using merged cards for #carousel.rectangle
    // if (carousel.classList.contains('rectangle') && carouselRollCurrentPos == 0) carouselUpdateSlide(3);
    // else if (carousel.classList.contains('square') && carouselRollCurrentPos == 0) carouselUpdateSlide(5);
    // else carouselUpdateSlide(carouselRollCurrentPos - 1);

    //For use if not using merged cards for #carouosel.rectangle
    if (carouselRollCurrentPos == 0) carouselUpdateSlide(5);
    else carouselUpdateSlide(carouselRollCurrentPos - 1);
}

function carouselFini() {
    carousel.style.display = "none";
}

//Actually executing previously defined functions and setting up the carousel system
carouselInit();
document.getElementById('left-chevron').onclick = carouselPreviousSlide;
document.getElementById('right-chevron').onclick = carouselNextSlide;
document.getElementById('carousel-dismiss').onclick = carouselFini;