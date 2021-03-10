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
}
let clearTrial3 = e => {
    document.getElementById('test6').style.right = '0px';
    document.getElementById('test6').style.backgroundColor = 'var(--main-purple)';
}



/*** For slider drag action ***
*!Functional, but noticeable CPU usage under continuous drag @ ~5% CPU load. May be enhanced.
*/

//All variables declared below are defined/redefined by dragInit() and would hold values to be used by the slider drag action mechanism. (i.e. dragInit() and dragOn() )
let offset = 0, prevPos = 0;
let target, sliderBar;
let targetTrack, trackInfo;
let highestPos, lowestPos;
let smFinalOffset, lgFinalOffset;
let sliderVal = 0; //Declares a globally accessible variable to hold the slider value

//Drag action initialization event handler
function dragInit(e) {
    e.preventDefault();

    //Redefining all values used and manipulated by the slider drag action mechanism based on the selected slider handle
    target = this; //This is the currently selected slider handle
    targetTrack = this.parentElement; //This is the slider track on which the handle slides
    trackInfo = targetTrack.getBoundingClientRect(); //This value holds the dimensions of the slider track
    highestPos = trackInfo.top + window.scrollY; //$trackInfo.top is viewport coordinate; adding $window.scrollY converts it to document-page coordinate
    lowestPos = trackInfo.bottom + window.scrollY; //$trackInfo.bottom is viewport coordinate; adding $window.scrollY converts it to document-page coordinate
    sliderBar = this.previousElementSibling; //This is the "slider bar" component controlled by the current slider handle

    //Assumes target's center shall be positioned at highestPos when it is at the highest position and be positioned at lowestPos when it is at the lowest position.
    smFinalOffset = 0 - target.getBoundingClientRect().height / 2;
    lgFinalOffset = smFinalOffset + trackInfo.height;


    //(1) Set initial $prevPos value. (2) Eliminates positional inconsistencies between mousedown on/clicking $target on top of area within $targetTrack and mousedown on/clicking $target on top area outside of $targetTrack.
    if (e.pageY > lowestPos) prevPos = lowestPos;
    else if (e.pageY > highestPos) prevPos = e.pageY;
    else prevPos = highestPos;

    document.onmouseup = dragFini;
    document.onmousemove = dragOn;
};

//Drag action core event handler
function dragOn(e) {
    e.preventDefault();

    //(1) Calculates $offset value and sets $prevPos for the next "mousemove" event. (2) Prevents out-of-sync cursor-target relationship after cursor goes beyond targetTrack. (3) Calculates $sliderVal value, which ranges from 0 to 1.
    if (e.pageY > lowestPos) {
        offset = lowestPos - prevPos;
        prevPos = lowestPos;
        sliderVal = 0;
    } else if (e.pageY >= highestPos) {
        offset = e.pageY - prevPos;
        prevPos = e.pageY;
        sliderVal = (lowestPos - e.pageY) / trackInfo.height;
    } else {
        offset = highestPos - prevPos;
        prevPos = highestPos;
        sliderVal = 1;
    }

    let finalOffset = target.offsetTop + offset; //Calculates the finalOffset value to be applied to CSS style

    //Clips any finalOffset values that place target beyond the bounds of targetTrack
    if (finalOffset < smFinalOffset) finalOffset = smFinalOffset;
    if (finalOffset > lgFinalOffset) finalOffset = lgFinalOffset;

    target.style.top = finalOffset + 'px'; //Applies CSS style
    sliderBar.style.height = trackInfo.height * sliderVal + 'px';
};

//Drag action termination event handler
function dragFini(e) {
    document.onmouseup = null;
    document.onmousemove = null;
};

//Attaching initialization event handlers
let sliderHandles = document.querySelectorAll('.slider-handle'); //Getting all DOM elements with class="slider-handle"
sliderHandles.forEach((element) => element.onmousedown = dragInit); //Attaching the drag action initializer to all DOM elements with class="slider-handle"



/*** For drag-sort drag action ***/

let arrElemGap = gap; //**IMPORTANT** $gap is declared in "script.js"
let arrElemWidth = width; //**IMPORTANT** $width is declared in "script.js"
let valsToSort = [23, 1, 72, 95, 4, 36, 59, 41, 55, 32];
let elems = [...document.querySelectorAll('.drag-sort-handle')]; //A bijection exists between $elems and $valsToSort, whereby indices of $valsToSort topologically maps to the relative position of each elements of $elems within the bounds of "div.main-array-box".
elems.forEach(elemStylePositioner); //Initially places the unsorted DOM elements within their DOM container

/* CORE components below until end of section */
let elemsContainerDimen = document.querySelector('.main-array-box').getBoundingClientRect();
let oldIndex = 0;
let offset2 = 0;
let prevPos2 = 0;
let target2 = null;

//Utility function which adjusts the style of a given DOM element's !PARENT! based on a given position
function elemStylePositioner(elem, pos) { elem.parentElement.style.left = `${pos * (arrElemWidth + arrElemGap)}px`; }; //Applying CSS style on the parent element

//Utility function which updates the position of elements within $elems and $valsToSort arrays upon a drag-sort action
function arraysUpdateOnDrag(oldIndex, newIndex) {
    elems.splice(newIndex, 0, ...elems.splice(oldIndex, 1));
    valsToSort.splice(newIndex, 0, ...valsToSort.splice(oldIndex,1));
};

//Drag-sort action initialization event handler
let dragSortInit = function(e) {
    e.preventDefault();

    prevPos2 = e.pageX;
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

    //***DEPRECATED. The following segment is not needed
    // //Below is for the <<motion>> of the selected DOM element
    // offset2 = e.pageX - prevPos2; //Calculates the delta offset2
    // prevPos2 = e.pageX; //Sets the $prevPos2 value for use for the next event

    // let finalOffset = target2.offsetLeft + offset2;
    // target2.style.left = finalOffset + 'px'; //Applies CSS style
    //***

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
let dragSortFini = function(e) {
    //Detach subcomponent event handlers
    document.onmouseup = null;
    document.onmousemove = null;
    //Restore initial CSS styles
    target2.parentElement.style.zIndex = "auto"; //Applying CSS property on the !PARENT! instead
    target2.parentElement.style.transition = "0.5s ease-out"; //Applying CSS property on the !PARENT! instead
    target2.style.boxShadow = "none";
};

elems.forEach(elem => { elem.onmousedown = dragSortInit; }); //Attaching the drag-sort action initialization event handler to each array element of $elems
