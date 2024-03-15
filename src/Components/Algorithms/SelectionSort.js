import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../Store/store';

const SelectionSort = async (array, arrayCount, swapsNumber, colorKey, delay, defaultColor, sort, dispatch, isPaused, isInterrupted, interruption, setInterruption, swapArray, barSwapArray, mainArray) => {
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
  for (let i = 0; i < count; i++) {

    if (sort.current === false) {
      return;
    }
    if (isInterrupted.current === true) {
      break;
    }

    if (!isPaused.current) {
      let min = arr[i];
      let minIndex = i;

      let redColorIndex = mainArr[i];
      color[redColorIndex] = 'red';
      dispatch(actions.changeColorKey([...color]));
      await new Promise((resolve) => setTimeout(() => resolve(), delay));

      for (let j = i + 1; j < count; j++) {
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


          if (arr[j] < min) {
            min = arr[j];
            if (i !== minIndex) {
              let whiteColorIndex = mainArr[minIndex];
              color[whiteColorIndex] = 'white';
              dispatch(actions.changeColorKey([...color]));
              await new Promise((resolve) => setTimeout(() => resolve(), delay));
            }
            minIndex = j;

            if (i !== minIndex) {
              let aquaColorIndex = mainArr[j];
              color[aquaColorIndex] = 'aqua';
              dispatch(actions.changeColorKey([...color]));
              await new Promise((resolve) => setTimeout(() => resolve(), delay));
            }
          }
          else {
            let colorIndex = mainArr[j];
            color[colorIndex] = 'white';
            dispatch(actions.changeColorKey([...color]));
            await new Promise((resolve) => setTimeout(() => resolve(), delay));
          }
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

      if (i !== minIndex) {
        let swapIndex1 = mainArr[i];
        let swapIndex2 = mainArr[minIndex];

        arr[minIndex] = arr[i];
        arr[i] = min;

        let temp = mainArr[i];
        mainArr[i] = mainArr[minIndex];
        mainArr[minIndex] = temp;



        //new code to swap
        swapArr[swapIndex1] = swapArr[swapIndex1] + (minIndex - i) * 50.5;
        swapArr[swapIndex2] = swapArr[swapIndex2] + (i - minIndex) * 50.5;
        barSwapArr[swapIndex1] = barSwapArr[swapIndex1] + (minIndex - i) * 10;
        barSwapArr[swapIndex2] = barSwapArr[swapIndex2] + (i - minIndex) * 10;
        dispatch(actions.changeBarSwapArray([...barSwapArr]));
        dispatch(actions.changeSwapArray([...swapArr]));
        await new Promise((resolve) => setTimeout(() => resolve(), delay));

        swapsNumber.current++;
        // dispatch(actions.changeMainArray([...mainArr]));

        await new Promise((resolve) => setTimeout(() => resolve(), delay));
      }

      let greenColorIndex = mainArr[i];
      color[greenColorIndex] = 'lightgreen';
      dispatch(actions.changeColorKey([...color]));
      await new Promise((resolve) => setTimeout(() => resolve(), 10));

      if (i !== minIndex) {
        let defaultColorIndex = mainArr[minIndex];
        color[defaultColorIndex] = 'white';
        dispatch(actions.changeColorKey([...color]));
        await new Promise((resolve) => setTimeout(() => resolve(), 10));
      }
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
  }
  if (isInterrupted.current === true) {
    isInterrupted.current = false;
    setInterruption(!interruption);
    swapsNumber.current = 0;

  }
  sort.current = false;
  swapsNumber.current = 0;

  // dispatch(actions.changeIsSorting(false));
}

export default SelectionSort;


