import { actions } from '../../Store/store';

const BubbleSort = async (array, arrayCount, swapsNumber, colorKey, delay, defaultColor, sort, dispatch, isPaused, isInterrupted, interruption, setInterruption, swapArray, barSwapArray, mainArray) => {

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

  for (let i = 0; i < count - 1; i++) {
    if (sort.current === false) {
      return;
    }
    if (isInterrupted.current === true) {
      break;
    }

    if (!isPaused.current) {
      for (let j = 0; j < count - i - 1; j++) {
        if (sort.current === false) {
          return;
        }
        if (isInterrupted.current === true) {
          break;
        }
        if (!isPaused.current) {
          let yellowColorIndex = mainArr[j];
          color[yellowColorIndex] = 'yellow';
          dispatch(actions.changeColorKey([...color]));
          await new Promise((resolve) => setTimeout(() => resolve(), delay));


          let secondYellowColorIndex = mainArr[j + 1];
          color[secondYellowColorIndex] = 'yellow';
          dispatch(actions.changeColorKey([...color]));
          await new Promise((resolve) => setTimeout(() => resolve(), delay));

          if (arr[j] > arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;

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
          }

          color[yellowColorIndex] = 'white';
          color[secondYellowColorIndex] = 'white';
          dispatch(actions.changeColorKey([...color]));
          await new Promise((resolve) => setTimeout(() => resolve(), 10));
        }
        else {
          while (isPaused.current) {
            if (isInterrupted.current === true) {
              break;
            }
            await new Promise((resolve) => setTimeout(() => resolve(), 1));
          }
          if (isInterrupted.current === true) {
            break;
          }
          j--;
        }

      }

      let greenColorIndex = mainArr[count - 1 - i];
      color[greenColorIndex] = 'lightgreen';
      dispatch(actions.changeColorKey([...color]));
      await new Promise((resolve) => setTimeout(() => resolve(), 1));


    }
    else {
      while (isPaused.current) {
        if (isInterrupted.current === true) {
          break;
        }
        await new Promise((resolve) => setTimeout(() => resolve(), 1));
      }
      if (isInterrupted.current === true) {
        break;
      }
      i--;
    }

    if (i == count - 2) {
      let finalColorIndex = mainArr[0];
      color[finalColorIndex] = 'lightgreen';
      dispatch(actions.changeColorKey([...color]));
      await new Promise((resolve) => setTimeout(() => resolve(), delay));
    }

  }



  if (isInterrupted.current === true) {
    isInterrupted.current = false;
    console.log(interruption);
    setInterruption(!interruption);
    console.log(interruption);
    swapsNumber.current = 0;

  }
  sort.current = false;

  swapsNumber.current = 0;

}


export default BubbleSort;
