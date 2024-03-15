import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../Store/store';

const MergeSort = async (array, arrayCount, colorKey, delay, defaultColor, sort, dispatch, isPaused, isInterrupted, interruption, setInterruption, swapArray, swappArray, mainArray) => {
    // Change the color to white

    dispatch(actions.changeIsSorting(true));
    sort.current = true;
    isPaused.current = false;

    let swapArr = [...swapArray];
    let swappArr = [...swappArray];
    let arr = [...array];
    // mainArr tracks the order of Cells based on their keys.
    let mainArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // colorKey is the array with colors for corresponding indices in the 'array'
    let color = [...colorKey];
    let count = arrayCount;


    // Function to stop the execution.
    // Checking for the stop at a number of different locations so that 
    // switching algortihms gets smoother.
    const shouldStop = () => {
        return isInterrupted.current;
    }

    const merge = async (l, m, r) => {

        if (shouldStop()) return;
        // After each merge step, the order of the cells change so tempMainArr
        // keeps track of the change and applies it to the mainArr at the end.
        let tempMainArr = [...mainArr];
        let n1 = m - l + 1;
        let n2 = r - m;

        let L = [];
        let R = [];

        for (let i = 0; i < n1; i++) {
            L[i] = arr[l + i];
        }
        for (let j = 0; j < n2; j++) {
            R[j] = arr[m + 1 + j];
        }

        let i = 0, j = 0;

        // To Keep track of i and j for the main Array i.e. to track the 
        // position L[i] and R[j]
        // p is the starting position of left subarray in the main array
        // and q is the starting position of right subarray in main array. 
        // p and q are the elements being compared.

        let p = l, q = m + 1;

        let k = l;

        while (i < n1 && j < n2) {
            if (shouldStop()) return;
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                tempMainArr[k] = mainArr[p];
                let swapIndex = mainArr[p];
                swapArr[swapIndex] = swapArr[swapIndex] + (k - p) * 50.5;
                swappArr[swapIndex] = swappArr[swapIndex] - 50.5;
                dispatch(actions.changeSwapArray([...swapArr]));
                dispatch(actions.changeSwappArray([...swappArr]));
                await new Promise((resolve) => setTimeout(() => resolve(), delay));
                i++;
                p++;
            }
            else {
                arr[k] = R[j];
                tempMainArr[k] = mainArr[q];
                let swapIndex = mainArr[q];
                swapArr[swapIndex] = swapArr[swapIndex] + (k - q) * 50.5;
                swappArr[swapIndex] = swappArr[swapIndex] - 50.5;
                dispatch(actions.changeSwapArray([...swapArr]));
                dispatch(actions.changeSwappArray([...swappArr]));
                await new Promise((resolve) => setTimeout(() => resolve(), delay));
                j++;
                q++;
            }
            k++;


        }


        while (i < n1) {
            if (shouldStop()) return;
            arr[k] = L[i];
            tempMainArr[k] = mainArr[p];
            let swapIndex = mainArr[p];
            swapArr[swapIndex] = swapArr[swapIndex] + (k - p) * 50.5;
            swappArr[swapIndex] = swappArr[swapIndex] - 50.5;
            dispatch(actions.changeSwapArray([...swapArr]));
            dispatch(actions.changeSwappArray([...swappArr]));
            await new Promise((resolve) => setTimeout(() => resolve(), delay));
            i++;
            k++;
            p++;


        }



        while (j < n2) {
            if (shouldStop()) return;
            arr[k] = R[j];
            tempMainArr[k] = mainArr[q];
            let swapIndex = mainArr[q];
            swapArr[swapIndex] = swapArr[swapIndex] + (k - q) * 50.5;
            swappArr[swapIndex] = swappArr[swapIndex] - 50.5;
            dispatch(actions.changeSwapArray([...swapArr]));
            dispatch(actions.changeSwappArray([...swappArr]));
            await new Promise((resolve) => setTimeout(() => resolve(), delay));
            j++;
            k++;
            q++;


        }
        if (shouldStop()) return;
        mainArr = [...tempMainArr];

    }

    const sortAlgo = async (l, r) => {
        if (shouldStop()) return;
        if (l < r) {
            if (shouldStop()) return;

            let m = Math.floor(l + (r - l) / 2);
            // Move this part down with animation.
            for (let u = l; u <= m; u++) {
                let swapIndex1 = mainArr[u];
                swappArr[swapIndex1] = swappArr[swapIndex1] + (50.5);
            }
            if (shouldStop()) return;

            dispatch(actions.changeSwappArray([...swappArr]));
            await new Promise((resolve) => setTimeout(() => resolve(), delay));


            await sortAlgo(l, m);

            // Move this part down with animation.
            for (let u = m + 1; u <= r; u++) {
                let swapIndex1 = mainArr[u];
                swappArr[swapIndex1] = swappArr[swapIndex1] + (50.5);
            }
            if (shouldStop()) return;

            dispatch(actions.changeSwappArray([...swappArr]));
            await new Promise((resolve) => setTimeout(() => resolve(), delay));


            if (shouldStop()) return;
            await sortAlgo(m + 1, r);

            if (shouldStop()) return;
            await merge(l, m, r);


            // If the final merge is completed, change the color to green to 
            // indicate completion of sorting.
            if (l == 0 && r == count - 1) {
                for (let u = l; u <= r; u++) {
                    let swapIndex1 = mainArr[u];
                    color[swapIndex1] = 'lightgreen';
                }
                if (shouldStop()) return;

                dispatch(actions.changeColorKey([...color]));
                await new Promise((resolve) => setTimeout(() => resolve(), 10));

            }
        }


    }

    await sortAlgo(0, count - 1);
    if (isInterrupted.current === true) {
        isInterrupted.current = false;
        setInterruption(!interruption);
    }

    sort.current = false;



}

export default MergeSort;