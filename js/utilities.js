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



/*** For dragging elements ***
*!Functional, but noticeable CPU usage under continuous drag @ ~5% CPU load. May be enhanced.
*/

//Extra/non-core components
let elemBar = document.getElementById('elem-bar');
let elemBarDimen = elemBar.getBoundingClientRect();

//CORE components
let offset = 0, prevPos = 0;
let target = document.getElementById('target'); //ATM the slider thumb is an HTML element with id="target"
let targetTrack = document.getElementById('track'); //ATM the slider track is an HTML element with id="track"
let trackInfo = targetTrack.getBoundingClientRect();
let highestPos = trackInfo.top + window.scrollY; //$trackInfo.top is viewport coordinate; adding $window.scrollY converts it to document-page coordinate
let lowestPos = trackInfo.bottom + window.scrollY; //$trackInfo.bottom is viewport coordinate; adding $window.scrollY converts it to document-page coordinate

//Assumes target's center shall be positioned at highestPos when it is at the highest position and be positioned at lowestPos when it is at the lowest position.
let smFinalOffset = 0 - target.getBoundingClientRect().height / 2;
let lgFinalOffset = smFinalOffset + trackInfo.height;

//Define a globally accessible variable to hold the slider value
let sliderVal = 0;

//Drag action initialization event handler
function dragInit(e) {
    e.preventDefault();

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

    // console.log(sliderVal); //DEBUG LINE//OK PASSED TEST

    let finalOffset = target.offsetTop + offset; //Calculates the finalOffset value to be applied to CSS style

    //Clips any finalOffset values that place target beyond the bounds of targetTrack
    if (finalOffset < smFinalOffset) finalOffset = smFinalOffset;
    if (finalOffset > lgFinalOffset) finalOffset = lgFinalOffset;

    target.style.top = finalOffset + 'px'; //Applies CSS style
    elemBar.style.height = elemBarDimen.height * sliderVal + 'px';
};

//Drag action termination event handler
function dragFini(e) {
    document.onmouseup = null;
    document.onmousemove = null;
};

target.onmousedown = dragInit; //Attaching the drag action initializer to $target
