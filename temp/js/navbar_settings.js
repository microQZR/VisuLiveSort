/** Global declarations and inital definitions **/
let animationOngoing = false;
let activeSortHandle = document.getElementById('selection-sort');
const inplaceStatus = document.getElementById('inplace-status');
const stableStatus = document.getElementById('stable-status');
document.getElementById('start-sort-btn').onclick = selectionSort;


/** Utility functions **/
function setGreenCheck(statusDiv) {
    statusDiv.style.height = "30px";
    statusDiv.style.background = "url(./css/greencheck.svg) no-repeat center / contain"
}

function setRedCross(statusDiv) {
    statusDiv.style.height = "25px";
    statusDiv.style.background = "url(./css/redcross.svg) no-repeat center / contain"
}


/** Navbar Section **/
document.getElementById('selection-sort').addEventListener('click', () => {
    if (activeSortHandle.id == 'selection-sort') return;
    if (animationOngoing) reshuffle();
    document.getElementById('start-sort-btn').onclick = selectionSort;

    activeSortHandle.classList.remove('active');
    activeSortHandle.querySelector('.nav-collapsable').classList.remove('active');
    activeSortHandle = document.getElementById('selection-sort');
    activeSortHandle.classList.add('active');
    activeSortHandle.querySelector('.nav-collapsable').classList.add('active');

    setGreenCheck(inplaceStatus);
    setRedCross(stableStatus);
    document.getElementById('best-time').innerHTML = "Best: O(<i>n</i>²)";
    document.getElementById('avg-time').innerHTML = "AVG: O(<i>n</i>²)";
    document.getElementById('worst-time').innerHTML = "Worst: O(<i>n</i>²)";
});

document.getElementById('insertion-sort').addEventListener('click', () => {
    if (activeSortHandle.id == 'insertion-sort') return;
    if (animationOngoing) reshuffle();
    document.getElementById('start-sort-btn').onclick = insertionSort;

    activeSortHandle.classList.remove('active');
    activeSortHandle.querySelector('.nav-collapsable').classList.remove('active');
    activeSortHandle = document.getElementById('insertion-sort');
    activeSortHandle.classList.add('active');
    activeSortHandle.querySelector('.nav-collapsable').classList.add('active');

    setGreenCheck(inplaceStatus);
    setGreenCheck(stableStatus);
    document.getElementById('best-time').innerHTML = "Best: O(<i>n</i>)";
    document.getElementById('avg-time').innerHTML = "AVG: O(<i>n</i>²)";
    document.getElementById('worst-time').innerHTML = "Worst: O(<i>n</i>²)";
})

document.getElementById('bubble-sort').addEventListener('click', () => {
    if (activeSortHandle.id == 'bubble-sort') return;
    if (animationOngoing) reshuffle();
    document.getElementById('start-sort-btn').onclick = bubbleSort;

    activeSortHandle.classList.remove('active');
    activeSortHandle.querySelector('.nav-collapsable').classList.remove('active');
    activeSortHandle = document.getElementById('bubble-sort');
    activeSortHandle.classList.add('active');
    activeSortHandle.querySelector('.nav-collapsable').classList.add('active');

    setGreenCheck(inplaceStatus);
    setGreenCheck(stableStatus);
    document.getElementById('best-time').innerHTML = "Best: O(<i>n</i>)";
    document.getElementById('avg-time').innerHTML = "AVG: O(<i>n</i>²)";
    document.getElementById('worst-time').innerHTML = "Worst: O(<i>n</i>²)";
})

document.getElementById('merge-sort').addEventListener('click', () => {
    if (activeSortHandle.id == 'merge-sort') return;
    if (animationOngoing) reshuffle();
    document.getElementById('start-sort-btn').onclick = mergeSortRecur;

    activeSortHandle.classList.remove('active');
    activeSortHandle.querySelector('.nav-collapsable').classList.remove('active');
    activeSortHandle = document.getElementById('merge-sort');
    activeSortHandle.classList.add('active');
    activeSortHandle.querySelector('.nav-collapsable').classList.add('active');

    setRedCross(inplaceStatus);
    setGreenCheck(stableStatus);
    document.getElementById('best-time').innerHTML = "Best: O(<i>n</i>⋅log<i>n</i>)";
    document.getElementById('avg-time').innerHTML = "AVG: O(<i>n</i>⋅log<i>n</i>)";
    document.getElementById('worst-time').innerHTML = "Worst: O(<i>n</i>⋅log<i>n</i>)";
})

document.getElementById('quick-sort').addEventListener('click', () => {
    if (activeSortHandle.id == 'quick-sort') return;
    if (animationOngoing) reshuffle();
    document.getElementById('start-sort-btn').onclick = quicksort;

    activeSortHandle.classList.remove('active');
    activeSortHandle.querySelector('.nav-collapsable').classList.remove('active');
    activeSortHandle = document.getElementById('quick-sort');
    activeSortHandle.classList.add('active');
    activeSortHandle.querySelector('.nav-collapsable').classList.add('active');

    setGreenCheck(inplaceStatus);
    setRedCross(stableStatus);
    document.getElementById('best-time').innerHTML = "Best: O(<i>n</i>⋅log<i>n</i>))";
    document.getElementById('avg-time').innerHTML = "AVG: O(<i>n</i>⋅log<i>n</i>)";
    document.getElementById('worst-time').innerHTML = "Worst: O(<i>n</i>²)";
})

document.getElementById('counting-sort').addEventListener('click', () => {
    if (activeSortHandle.id == 'counting-sort') return;
    let previousSortHandleID = activeSortHandle.id;
    document.getElementById('start-sort-btn').onclick = countingSort;

    activeSortHandle.classList.remove('active');
    activeSortHandle.querySelector('.nav-collapsable').classList.remove('active');
    activeSortHandle = document.getElementById('counting-sort');
    activeSortHandle.classList.add('active');
    activeSortHandle.querySelector('.nav-collapsable').classList.add('active');

    if (animationOngoing && previousSortHandleID == 'merge-sort') {
        document.getElementById("buffer-array").parentElement.removeChild(document.getElementById("buffer-array"));
        
        let mainArray = document.querySelector('.main-array');
        let newMainArray = mainArray.cloneNode(false);
        newMainArray.style.height = "90%";
        mainArray.parentElement.style.justifyContent = "center";
        mainArray.parentElement.replaceChild(newMainArray, mainArray);
    }
    animationOngoing = false;
    updateMainArrayContent(1); //Pretend to be handling an event by passing an argument to the first parameter.

    setRedCross(inplaceStatus);
    setGreenCheck(stableStatus);
    document.getElementById('best-time').innerHTML = "Best: O(<i>n</i>)";
    document.getElementById('avg-time').innerHTML = "AVG: O(<i>n</i>)";
    document.getElementById('worst-time').innerHTML = "Worst: O(<i>n</i>)";
})


/** Settings Section **/
document.getElementById('settings-toggle').onclick = settingsToggle;

function settingsToggle(){
    let settingsBox = document.getElementById('settings-box');
    let settingsContainer = document.getElementById('settings-container');
    let firstClick = true;
    
    if (settingsBox.classList.contains('open')) {
        settingsBox.classList.remove('open');

        settingsContainer.style.display = "none";
        settingsBox.style.height = 0;
        settingsBox.style.width = 0;
        settingsBox.style.minHeight = 0;
        settingsBox.style.minWidth = 0;

        this.style.background = "url(./css/cog.svg) var(--main-blue) no-repeat -16px";
    } else {
        settingsBox.classList.add('open');

        settingsBox.style.height = "100%";
        settingsBox.style.width = "35%";
        settingsBox.style.minHeight = "300px";
        settingsBox.style.minWidth = "300px";
        
        setTimeout(() => {
            settingsContainer.style.display = "grid";
            if (firstClick) setTimeout(() => h_sliderHandleInitialPos(), 275); //275 is an empirical finding which is the minimum delay required so that the two div.h-slider-handle can be placed at their actual correct position (i.e. not less).
        }, 200)

        this.style.background = "url(./css/whitecross.svg) var(--main-blue) no-repeat 6.5px";
    }

    //The following function positions the two div.h-slider-handle at their initial position on the first click of div#settings-toggle
    function h_sliderHandleInitialPos() {
        firstClick = false;
        const sliderTrackWidth = document.querySelector('.h-slider-track').offsetWidth;
        const handleHalfWidth = document.getElementById('size-handle').offsetWidth / 2;
        document.getElementById('size-handle').style.left = arrSizeSliderVal * sliderTrackWidth - handleHalfWidth + "px";
        document.getElementById('speed-handle').style.left = speedSliderVal * sliderTrackWidth - handleHalfWidth + "px";
        setTimeout(() => {
            document.getElementById('size-handle').style.transition = "none";
            document.getElementById('speed-handle').style.transition = "none";
        }, 250) //250 is the initial transition duration set in "style.css"
    }
}


/** Document Responsivity Section **/
//Updates the "main section" content on window resize. This system uses a debounce mechanism.
let debounceID;
window.addEventListener('resize', () => {
    clearTimeout(debounceID);
    debounceID = setTimeout(() => {
        refreshMainSec(); //For adjusting the "main section" content
        carouselInit(); //For adjusting the carousel
    }, 100);
});
function refreshMainSec() {
    containerMaxWidth = document.querySelector('.main-sec-container').getBoundingClientRect().width;
    maxCount = containerMaxWidth / (minWidth + minGap);
    calculateWidthGapCount();
    updateMainArrayContent(1);
}

//Creates a mediaQueryList object and attaches an "onchange" event handler to update the navbar UI depending on viewport width.
const mediaQueryList = window.matchMedia("(max-width: 985px)");
const openRespNav = document.getElementById('open-responsive-nav');
const responsiveNav = document.getElementById('responsive-nav');
mediaQueryList.addListener(e => {
    if (e.matches) {
        responsiveNav.appendChild(document.querySelector('nav'));
        openRespNav.style.display = "block";
    } else {
        openRespNav.style.display = "none";
        openRespNav.insertAdjacentElement('beforebegin', document.querySelector('nav'));
        responsiveNav.style.right = "-300px";
    }
});
//Immediately updates the navbar UI on page load if media query is satisfied.
if (mediaQueryList.matches) {
    responsiveNav.appendChild(document.querySelector('nav'));
    openRespNav.style.display = "block";
}

//Attaching event handler for opening the responsive navbar
openRespNav.onclick = () => responsiveNav.style.right = "0px";

//Attaching event handler for closing the responsive navbar
document.getElementById('close-responsive-nav').onclick = () => responsiveNav.style.right = "-300px";
