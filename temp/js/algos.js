let speed = 1;

document.getElementById('start-sort-btn').addEventListener('click', insertionSort);

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
