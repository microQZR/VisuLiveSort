let speed = 1;

document.getElementById('start-sort-btn').addEventListener('click', bubbleSort);

//Selection sort algorithm
function selectionSort() {
    let tick = 0;
    for (let i = 0; i < valsToSort.length; i++) {
        let swapIndex = i;
        setTimeout((e_i) => e_i.style.backgroundColor = "var(--main-magenta)", 300 * tick++, elems[i]);
        for (let j = i + 1; j < valsToSort.length; j++) {
            setTimeout(e_j => e_j.style.backgroundColor = "var(--main-yellow)", 300 * tick++, elems[j]);
            if (valsToSort[j] < valsToSort[swapIndex]) {
                setTimeout((bool, e_swapIndex, e_j) => {
                    if (bool) e_swapIndex.style.backgroundColor = "var(--main-blue)";
                    e_j.style.backgroundColor = "var(--main-magenta)";
                }, 300 * tick++, (swapIndex !== i), elems[swapIndex], elems[j]);
                swapIndex = j;
            } else setTimeout(e_j => e_j.style.backgroundColor = "var(--main-blue)", 300 * tick++, elems[j]);
        }
        if (i !== swapIndex) {
            setTimeout((e_i, e_swapIndex) => {
                elemStylePositioner(e_i, swapIndex);
                elemStylePositioner(e_swapIndex, i);
                e_i.style.backgroundColor = "var(--main-blue)";
            }, 300 * tick++, elems[i], elems[swapIndex]);
            [valsToSort[i], valsToSort[swapIndex]] = [valsToSort[swapIndex], valsToSort[i]];
            [elems[i], elems[swapIndex]] = [elems[swapIndex], elems[i]];
        }
        setTimeout(e_i => e_i.style.backgroundColor = "var(--main-green)", 300 * tick++, elems[i]);
    }
    console.log(valsToSort); //This shall be removed for production.
}

//Insertion sort algorithm
function insertionSort() {
    let tick = 0;
    for (let i = 1; i < valsToSort.length; i++) {
        let j, testVal = valsToSort[i], focusedElement = elems[i];
        setTimeout(() => focusedElement.style.backgroundColor = "var(--main-magenta)", 300 * tick++);
        for (j = i - 1; j >= 0; j--) {
            setTimeout(e_j => e_j.style.backgroundColor = "var(--main-yellow)", 300 * tick++, elems[j]);
            if (testVal < valsToSort[j]) {
                elems[j+1] = elems[j];
                valsToSort[j+1] = valsToSort[j];
                setTimeout((local_j, e_j) => {
                    elemStylePositioner(focusedElement, local_j);
                    elemStylePositioner(e_j, local_j + 1);
                    e_j.style.backgroundColor = "var(--main-green)";
                    if (local_j === 0) focusedElement.style.backgroundColor = "var(--main-green)";
                }, 300 * tick++, j, elems[j]);
            }
            else {
                setTimeout(e_j => {
                    e_j.style.backgroundColor = "var(--main-green)";
                    focusedElement.style.backgroundColor = "var(--main-green)";
                }, 300 * tick++, elems[j]);
                break;
            }
        }
        elems[j + 1] = focusedElement;
        valsToSort[j + 1] = testVal;
    }
    console.log(valsToSort); //This shall be removed for production.
}

//Bubble sort algorithm
function bubbleSort() {
    let tick = 0;
    for (let i = 0; i < valsToSort.length - 1; i++) {
        let swap = false;
        for (let j = 0; j < valsToSort.length - 1 - i; j++) {
            if (j) setTimeout((e_j, e_j_plus, e_j_minus) => { //This if-else prevents an error to be thrown in case that $e_j_minus and by association $elems[j-1] is undefined
                e_j_minus.style.backgroundColor = "var(--main-blue)";
                e_j.style.backgroundColor = "var(--main-magenta)";
                e_j_plus.style.backgroundColor = "var(--main-yellow)";
            }, 300 * tick++, elems[j], elems[j+1], elems[j-1]);
            else setTimeout((e_j, e_j_plus) => {
                e_j.style.backgroundColor = "var(--main-magenta)";
                e_j_plus.style.backgroundColor = "var(--main-yellow)";
            }, 300 * tick++, elems[j], elems[j+1], elems[j-1]);

            if (valsToSort[j] > valsToSort[j+1]) {
                setTimeout((e_j, e_j_plus, local_j) => {
                    e_j_plus.style.backgroundColor = "var(--main-blue)";
                    elemStylePositioner(e_j, local_j + 1);
                    elemStylePositioner(e_j_plus, local_j);
                }, 300 * tick++, elems[j], elems[j+1], j);
                [elems[j], elems[j+1]] = [elems[j+1], elems[j]];
                [valsToSort[j], valsToSort[j+1]] = [valsToSort[j+1], valsToSort[j]];
                swap = true;
            } 
        }

        setTimeout((e_tail, e_tail_minus) => { //Sets the sorted tail color
            e_tail.style.backgroundColor = "var(--main-green)";
            e_tail_minus.style.backgroundColor = "var(--main-blue)";
        }, 300 * tick++, elems[elems.length - 1 - i], elems[elems.length - 2 - i])
        if (!swap) { //Final color sweep when all is sorted due to no swapped being performed in this iteration
            let nextTickTime = tick * 300;
            for (let j = 0; j < valsToSort.length - i; j++) {
                setTimeout(e_j => e_j.style.backgroundColor = "var(--main-green)", nextTickTime, elems[j]);
                nextTickTime += 15; 
            }
            break;
        }
    }
    console.log(valsToSort); //This shall be removed for production.
}

//Merge sort algorithm
function mergeSortRecur(arr, compareFct) {
    let buffer = [];
    function mergeSort(start_i, end_i) { //$start_i and $end_i are inclusive smallest and largest indices of the sub-array to merge sort.
        if (start_i == end_i) return; //If $start_i == $end_i, then the sub-array to sort is the singleton base case, so just return.

        let mid = Math.floor((start_i + end_i) / 2); //This becomes the inclusive last index of the first sub-array.
        mergeSort(start_i, mid);
        mergeSort(mid + 1, end_i);

        merge(start_i, mid, end_i);
    }

    function merge(p, q, r) {
        let length_pq = q - p + 1;
        for (let i = 0; i < length_pq; i++) buffer[i] = arr[p + i]; //Copy only the first sub-array to merge into the buffer

        let i = 0, j = q + 1, k = p;
        while (i < length_pq && j < r + 1) {
            if (compareFct(buffer[i], arr[j])) arr[k] = buffer[i++]; //If lowest element in buffer is smaller than the lowest element in the 2nd sub-array, copy the lowest element from the buffer into the next available slot of the merged array segment.
            else arr[k] = arr[j++]; //If the above is not true, copy the lowest element from the 2nd sub-array directly into the next available slot of the merged array segment.
            k++;
        }
        while (i < length_pq) arr[k++] = buffer[i++]; //Copies the remaining elements of the buffer if the elements of the 2nd sub-array is spent. If the elements in the buffer would be spent, no need to copy over the remaining elements of the 2nd sub-array as they would be already in right place.
    }

    mergeSort(0, arr.length - 1);
    return arr;
}