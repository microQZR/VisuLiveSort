let animationOngoing = false;
let activeSortHandle = document.getElementById('selection-sort');
document.getElementById('start-sort-btn').onclick = selectionSort;

/** Navbar Section **/
document.getElementById('selection-sort').addEventListener('click', () => {
    document.getElementById('start-sort-btn').onclick = selectionSort;
    activeSortHandle.classList.remove('active');
    activeSortHandle.querySelector('.nav-collapsable').classList.remove('active');

    activeSortHandle = document.getElementById('selection-sort');
    activeSortHandle.classList.add('active');
    activeSortHandle.querySelector('.nav-collapsable').classList.add('active');
});

document.getElementById('insertion-sort').addEventListener('click', () => {
    document.getElementById('start-sort-btn').onclick = insertionSort;
    activeSortHandle.classList.remove('active');
    activeSortHandle.querySelector('.nav-collapsable').classList.remove('active');

    activeSortHandle = document.getElementById('insertion-sort');
    activeSortHandle.classList.add('active');
    activeSortHandle.querySelector('.nav-collapsable').classList.add('active');
})

document.getElementById('bubble-sort').addEventListener('click', () => {
    document.getElementById('start-sort-btn').onclick = bubbleSort;
    activeSortHandle.classList.remove('active');
    activeSortHandle.querySelector('.nav-collapsable').classList.remove('active');

    activeSortHandle = document.getElementById('bubble-sort');
    activeSortHandle.classList.add('active');
    activeSortHandle.querySelector('.nav-collapsable').classList.add('active');
})

document.getElementById('merge-sort').addEventListener('click', () => {
    document.getElementById('start-sort-btn').onclick = mergeSortRecur;
    activeSortHandle.classList.remove('active');
    activeSortHandle.querySelector('.nav-collapsable').classList.remove('active');

    activeSortHandle = document.getElementById('merge-sort');
    activeSortHandle.classList.add('active');
    activeSortHandle.querySelector('.nav-collapsable').classList.add('active');
})

document.getElementById('quick-sort').addEventListener('click', () => {
    document.getElementById('start-sort-btn').onclick = quicksort;
    activeSortHandle.classList.remove('active');
    activeSortHandle.querySelector('.nav-collapsable').classList.remove('active');

    activeSortHandle = document.getElementById('quick-sort');
    activeSortHandle.classList.add('active');
    activeSortHandle.querySelector('.nav-collapsable').classList.add('active');
})

document.getElementById('counting-sort').addEventListener('click', () => {
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
})


/** Settings Section **/
document.getElementById('settings-toggle').onclick = settingsToggle;

function settingsToggle(){
    let settingsBox = document.getElementById('settings-box');
    let settingsContainer = document.getElementById('settings-container');
    
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
        }, 200)

        this.style.background = "url(./css/whitecross.svg) var(--main-blue) no-repeat 6.5px";
    }
}
