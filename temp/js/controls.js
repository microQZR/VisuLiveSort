/* Attaching event handler to control buttons */
document.getElementById('nra-btn').addEventListener('click', updateMainArrayContent);

document.getElementById('reshuffle-btn').addEventListener('click', reshuffle);

document.getElementById('manual-array-form').addEventListener('submit', processManualArrayForm);

document.getElementById('manual-array').addEventListener('click', clearFormError);

/* "nra-btn" event handler */// --> Updates all parameters and variables required by "utilities.js", reexecutes all relevant statements (excludes variable declarations) from "utilities.js", sets $maxNumVal if directly invoked as event handler callback and executes "generateHTMLMainArray()".
function updateMainArrayContent(event, customArray) {
    cancelPendingJobs();
    if (event) maxNumVal = 100; //Sets $maxNumVal if "updateMainArrayContent()" is directly invoked as event handler callback
    generateHTMLMainArray(customArray); //The argument $customArray would be undefined if "updateMainArrayContent()" is directly invoked as event handler callback, otherwise an array object shall be provided as its value.
    arrElemGap = gap; //**IMPORTANT** $gap is declared in "script.js" and $arrElemGap is declared in "utilities.js"
    arrElemWidth = width; //**IMPORTANT** $width is declared in "script.js" and $arrElemWidth is declared in "utilities.js"
    valsToSort = randNumArray //**IMPORTANT** $randNumArray is declared in "script.js" and $valsToSort is declared in "utilities.js"
    elems = [...document.querySelectorAll('.drag-sort-handle')];
    elemsContainerDimen = document.querySelector('.main-array').getBoundingClientRect();
    elems.forEach(elemStylePositioner); //Initially places the unsorted DOM elements within their DOM container
    elems.forEach(elem => { elem.onmousedown = dragSortInit; }); //Attaching the drag-sort action initialization event handler to each array element of $elems
    document.querySelectorAll('.slider-handle').forEach((element) => element.onmousedown = dragInit); //Attaching the drag action initializer to all DOM elements with class="slider-handle"
};

/* "reshuffle-btn" event handler using the Fisher-Yates algorithm */
function reshuffle() {
    for (let i = randNumArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); //This statement needs to use "Math.floor()" in conjunction with the expression "(i + 1)" instead of using "Math.round()" in conjuction with the expression "i", since Math.round() has a probability distribution over the range of return values that is skewed at both tails (in most cases) whereby the lowest possible integer and the highest possible integer have half the probability of being returned than any integer in-between them.

        let temp = randNumArray[j]; randNumArray[j] = randNumArray[i]; randNumArray[i] = temp;
        temp = elems[j]; elems[j] = elems[i]; elems[i] = temp;
    }
    elems.forEach(elemStylePositioner); //Reposition each main array subelement at the right position
    resetArrayItemsColor();
};

/* "Manual input array" form handler */
function processManualArrayForm(e) {
    e.preventDefault();
    clearFormError();
    const inputCtrl = document.getElementById('manual-array'); //Gets the input control DOM object
    let inputVal = inputCtrl.value; //A string value
    let quit = false;

    //The following lines convert the value of $inputVal into a format that is suitable for validation and further processing.
    if (inputVal.startsWith('[') && inputVal.endsWith(']')) inputVal = inputVal.substring(1, inputVal.length - 1);
    inputVal = inputVal.split(/[\s,]+/);
    if (inputVal[0] === '') inputVal.shift();
    if (inputVal[inputVal.length - 1] === '') inputVal.pop();
    if (inputVal.length === 0) return;

    //User input data validation
    inputVal.forEach((elem, index) => {
        if (Number.isNaN(Number(elem))) {
            inputCtrl.classList.add("invalid");
            document.querySelector('#manual-array-fs > legend').style.visibility = "visible";
            inputCtrl.select();
            quit = true;
            return;
        } else { inputVal[index] = parseFloat(elem); }
    }); if (quit) return;

    //If the user input data passes validation, it is used to update the main DOM array.
    maxNumVal = inputVal.reduce((accum, currVal) => accum > currVal ? accum : currVal);
    calculateWidthGapCount(inputVal.length);
    updateMainArrayContent(undefined, inputVal);
};

/* Clears error prompt on "manual input array" if present */
function clearFormError() {
    document.getElementById('manual-array').classList.remove("invalid");
    document.querySelector('#manual-array-fs > legend').style.visibility = "hidden";
};

//DEBUG SECTION BELOW
// let abc = [1,2,3,4,5,6,7,8,9,10];