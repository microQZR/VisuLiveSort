/*** For swap animation/transition ***/
let trial1 = (e) => {
    document.getElementById('test6').classList.add('animate');
    console.log('OK');
};
let trial2 = (e) => {
    document.getElementById('test6').style.animation = "trial2 1s forwards";
    console.log('OK');
};
let clearTrial2 = e => {
    document.getElementById('test6').style.animation = 'none';
};
let trial3 = e => {
    document.getElementById('test6').style.right = '50px';
    document.getElementById('test6').style.backgroundColor = 'red';
};
let clearTrial3 = e => {
    document.getElementById('test6').style.right = '0px';
    document.getElementById('test6').style.backgroundColor = 'var(--main-purple)';
};



/*** For slider drag action ***
*!Functional, but noticeable CPU usage under continuous drag @ ~5% CPU load. May be enhanced.
*/

//All variables declared below are defined/redefined by dragInit() and would hold values to be used by the slider drag action mechanism. (i.e. dragInit() and dragOn() )
let target, targetHalfHeight, sliderBar;
let targetTrack, trackInfo, trackHeight;
let highestPos, lowestPos;
let sliderVal = 0; //Declares a globally accessible variable to hold the slider value

//Drag action initialization event handler
function dragInit(e) {
    e.preventDefault();

    //Redefining all values used and manipulated by the slider drag action mechanism based on the selected slider handle
    target = this; //This is the currently selected slider handle
    targetHalfHeight = target.getBoundingClientRect().height / 2;
    targetTrack = this.parentElement; //This is the slider track on which the handle slides
    trackInfo = targetTrack.getBoundingClientRect(); //This value holds the dimensions of the slider track
    trackHeight = trackInfo.height;
    highestPos = trackInfo.top + window.scrollY; //$trackInfo.top is viewport coordinate; adding $window.scrollY converts it to document-page coordinate
    lowestPos = trackInfo.bottom + window.scrollY; //$trackInfo.bottom is viewport coordinate; adding $window.scrollY converts it to document-page coordinate
    sliderBar = this.previousElementSibling; //This is the "slider bar" component controlled by the current slider handle


    document.onmouseup = dragFini;
    document.onmousemove = dragOn;
};

//Drag action core event handler
function dragOn(e) {
    e.preventDefault();

    //Calculates $sliderVal value, which ranges from 0 to 1 based $e.pageY
    if (e.pageY > lowestPos) sliderVal = 0;
    else if (e.pageY >= highestPos) sliderVal = (lowestPos - e.pageY) / trackHeight;
    else sliderVal = 1;

    target.style.top = trackHeight * (1 - sliderVal) - targetHalfHeight + 'px'; //Updates the position of the slider handle using CSS
    target.textContent = Math.round(sliderVal * maxNumVal); //Updates the number displayed within the slider handle through the HTML content
    sliderBar.style.height = trackHeight * sliderVal + 'px'; //Updates the position of the "slider-bar"'s height using CSS
};

//Drag action termination event handler
function dragFini(e) {
    document.onmouseup = null;
    document.onmousemove = null;
    randNumArray[parseInt(target.parentElement.getAttribute('data-currentindex'))] = sliderVal * maxNumVal;
};

//Attaching initialization event handlers
document.querySelectorAll('.slider-handle').forEach((element) => element.onmousedown = dragInit); //Attaching the drag action initializer to all DOM elements with class="slider-handle"



/*** For drag-sort drag action ***/

//Declaration and definition of tweakable, independent variables
let arrElemGap = gap; //**IMPORTANT** $gap is declared in "script.js"
let arrElemWidth = width; //**IMPORTANT** $width is declared in "script.js"
let valsToSort = randNumArray //**IMPORTANT** $randNumArray is declared in "script.js"

//Declaration and definition of non-tweakable variables
let elems = [...document.querySelectorAll('.drag-sort-handle')]; //A bijection exists between $elems and $valsToSort, whereby indices of $valsToSort topologically maps to the relative position of each elements of $elems within the bounds of "div.main-array-box".
let elemsContainerDimen = document.querySelector('.main-array-box').getBoundingClientRect();
let oldIndex, target2;

//Utility function which adjusts the style of a given DOM element's !PARENT! based on a given position and updates that parent element's "data-currentindex" attribute
function elemStylePositioner(elem, pos) {
    elem.parentElement.style.left = `${pos * (arrElemWidth + arrElemGap)}px`;
    elem.parentElement.setAttribute('data-currentindex', pos + "");
};

//Utility function which updates the position of elements within $elems and $valsToSort arrays upon a drag-sort action
function arraysUpdateOnDrag(oldIndex, newIndex) {
    elems.splice(newIndex, 0, ...elems.splice(oldIndex, 1));
    valsToSort.splice(newIndex, 0, ...valsToSort.splice(oldIndex,1));
};

//Drag-sort action initialization event handler
function dragSortInit(e) {
    e.preventDefault();

    oldIndex = Math.floor((e.pageX - elemsContainerDimen.left) / (arrElemWidth + arrElemGap));
    target2 = this; //Registers the active DOM element being dragged 

    //Sets special CSS style for the active DOM element being dragged !AND ITS PARENT!
    target2.parentElement.style.zIndex = 100; //Applying CSS property on the parent instead
    target2.parentElement.style.transition = 'none'; //Applying CSS property on the parent instead
    target2.style.boxShadow = '0px 0px 5px 5px var(--main-green)';

    //Attaches subcomponent event handlers
    document.onmouseup = dragSortFini;
    document.onmousemove = dragSortOn;
};

//Drag-sort action core event handler
function dragSortOn(e) {
    e.preventDefault();
    
    if (e.clientX <= elemsContainerDimen.left || e.clientX >= elemsContainerDimen.right) return; //This bounds the drag-sort motion of the active DOM element to within its DOM container.

    //Below is for the proper positioning of all affected DOM elements upon drag over
    let newIndex = Math.floor((e.pageX - elemsContainerDimen.left) / (arrElemWidth + arrElemGap));
    elemStylePositioner(target2, newIndex); //Updates the position of the active DOM element.
    //Update the position of the non-active DOM elements !ONLY! if the value of $newIndex has changed in order to save some compute.
    if (oldIndex !== newIndex) {
        if (newIndex <= oldIndex) {
            for (let i = newIndex; i < oldIndex; i++) {
                elemStylePositioner(elems[i], i + 1);
            };
        } else {
            for (let i = newIndex; i > oldIndex; i--) {
                elemStylePositioner(elems[i], i - 1);
            };
        }
        arraysUpdateOnDrag(oldIndex, newIndex);
        oldIndex = newIndex;
    }
};

//Drag-sort action termination event handler
function dragSortFini(e) {
    //Detach subcomponent event handlers
    document.onmouseup = null;
    document.onmousemove = null;
    //Restore initial CSS styles
    target2.parentElement.style.zIndex = "auto"; //Applying CSS property on the !PARENT! instead
    target2.parentElement.style.transition = "0.5s ease-out"; //Applying CSS property on the !PARENT! instead
    target2.style.boxShadow = "none";
};


//Actually executing previously defined code
elems.forEach(elemStylePositioner); //Initially places the unsorted DOM elements within their DOM container
elems.forEach(elem => { elem.onmousedown = dragSortInit; }); //Attaching the drag-sort action initialization event handler to each array element of $elems