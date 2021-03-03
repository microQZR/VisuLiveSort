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
let offset = 0, prevPos = 0;
let target = document.getElementById('target');
let targetTrack = document.getElementById('track');
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
    if (e.clientY + window.scrollY > lowestPos) prevPos = lowestPos;
    else if (e.clientY + window.scrollY > highestPos) prevPos = e.clientY + window.scrollY;
    else prevPos = highestPos;

    document.onmouseup = dragFini;
    document.onmousemove = dragOn;
};

//Drag action core event handler
function dragOn(e) {
    e.preventDefault();

    //Prevents out-of-sync cursor-target relationship after cursor goes beyond targetTrack
    if (e.clientY + window.scrollY > lowestPos) {
        offset = lowestPos - prevPos;
        prevPos = lowestPos;
    } else if (e.clientY + window.scrollY > highestPos) {
        offset = e.clientY + window.scrollY - prevPos;
        prevPos = e.clientY + window.scrollY;
    } else {
        offset = highestPos - prevPos;
        prevPos = highestPos;
    }

    let finalOffset = target.offsetTop + offset; //Calculates the finalOffset value to be applied to CSS style

    //Clips any finalOffset values that place target beyond the bounds of targetTrack
    if (finalOffset < smFinalOffset) finalOffset = smFinalOffset;
    if (finalOffset > lgFinalOffset) finalOffset = lgFinalOffset;

    target.style.top = finalOffset + 'px'; //Applies CSS style
};

//Drag action termination event handler
function dragFini(e) {
    document.onmouseup = null;
    document.onmousemove = null;
};

target.onmousedown = dragInit; //Attaching the drag action initializer to $target
