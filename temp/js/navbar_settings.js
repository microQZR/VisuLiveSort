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
    document.getElementById('start-sort-btn').onclick = countingSort;
    activeSortHandle.classList.remove('active');
    activeSortHandle.querySelector('.nav-collapsable').classList.remove('active');

    activeSortHandle = document.getElementById('counting-sort');
    activeSortHandle.classList.add('active');
    activeSortHandle.querySelector('.nav-collapsable').classList.add('active');

    (function setupCountingSortArray() {
        let countingSortArray = newRandNumArray(count, 10);
        maxNumVal = 10;
        updateMainArrayContent(undefined, countingSortArray);
    })();
})



