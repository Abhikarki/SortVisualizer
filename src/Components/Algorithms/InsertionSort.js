import { actions } from '../../Store/store';

const InsertionSort = async (array, arrayCount, swapsNumber, colorKey, delay, defaultColor, sort, dispatch, isPaused, isInterrupted, interruption, setInterruption, swapArray, barSwapArray, mainArray) => {
  // Change the color to white

  dispatch(actions.changeIsSorting(true));
  sort.current = true;
  isPaused.current = false;

  let barSwapArr = [...barSwapArray];
  let swapArr = [...swapArray];
  let arr = [...array];
  // mainArr tracks the order of Cells based on their keys.
  let mainArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // colorKey is the array with colors for corresponding indices in the 'array'
  let color = [...colorKey];
  let count = arrayCount;

  // Insertion Sort algorithm.
  for (let i = 1; i < count; i++) {

    if (sort.current === false) {
      return;
    }
    // Handle the interruption.
    if (isInterrupted.current === true) {
      break;
    }

    // If not paused.
    if (!isPaused.current) {
      let temp = arr[i];
      let j = i - 1;

      let currentColorIndex = mainArr[i];
      color[currentColorIndex] = 'yellow';
      dispatch(actions.changeColorKey([...color]));
      await new Promise((resolve) => setTimeout(() => resolve(), delay));


      if (arr[j] < temp) {
        let tempColorIndex = mainArr[j];
        color[tempColorIndex] = 'lightgreen';
        dispatch(actions.changeColorKey([...color]));
        await new Promise((resolve) => setTimeout(() => resolve(), delay));
      }

      while (j >= 0 && arr[j] > temp) {

        if (sort.current === false) {
          return;
        }
        if (isInterrupted.current === true) {
          break;
        }
        if (!isPaused.current) {
          arr[j + 1] = arr[j];
          arr[j] = temp;

          let tempColorIndex1 = mainArr[j];
          color[tempColorIndex1] = 'lightgreen';
          dispatch(actions.changeColorKey([...color]));
          await new Promise((resolve) => setTimeout(() => resolve(), delay));

          let swapIndex1 = mainArr[j];
          let swapIndex2 = mainArr[j + 1];

          let temp1 = mainArr[j];
          mainArr[j] = mainArr[j + 1];
          mainArr[j + 1] = temp1;

          swapArr[swapIndex1] = swapArr[swapIndex1] + (50.5);
          swapArr[swapIndex2] = swapArr[swapIndex2] - (50.5);
          barSwapArr[swapIndex1] = barSwapArr[swapIndex1] + (10);
          barSwapArr[swapIndex2] = barSwapArr[swapIndex2] - (10);
          dispatch(actions.changeBarSwapArray([...barSwapArr]));
          dispatch(actions.changeSwapArray([...swapArr]));
          await new Promise((resolve) => setTimeout(() => resolve(), delay));

          swapsNumber.current++;
          j--;
        }
        else {                                  // if paused, wait until resumed.
          while (isPaused.current) {
            if (isInterrupted.current === true) {
              break;
            }
            await new Promise((resolve) => setTimeout(() => resolve(), 1));
          }
          if (isInterrupted.current === true) {
            break;
          }
          j++;                                  // Go back one iteration, since the current iteration was paused.
        }
      }
      color[currentColorIndex] = 'lightgreen';
      dispatch(actions.changeColorKey([...color]));
      await new Promise((resolve) => setTimeout(() => resolve(), delay));

    }

    else {                                      // if paused, wait until resumed.
      while (isPaused.current) {
        if (isInterrupted.current === true) {
          break;
        }
        await new Promise((resolve) => setTimeout(() => resolve(), 1));
      }
      if (isInterrupted.current === true) {
        break;
      }
      i--;                                     // Go back one iteration, since the current iteration was paused.
    }


  }
  if (isInterrupted.current === true) {        // Handle interruption.
    isInterrupted.current = false;
    console.log(interruption);
    setInterruption(!interruption);
    console.log(interruption);
    swapsNumber.current = 0;

  }
  sort.current = false;                        // Sorting completed (or stopped).
  swapsNumber.current = 0;

}

export default InsertionSort;
