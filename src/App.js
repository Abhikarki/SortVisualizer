import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from './Store/store'
import { useEffect, useRef, useState } from 'react';
import Cell from './Components/Cell';
import Bar from './Components/Bar';
import selectionSort from './Components/Algorithms/SelectionSort';
import BubbleSort from './Components/Algorithms/BubbleSort';
import InsertionSort from './Components/Algorithms/InsertionSort';
import MergeSort from './Components/Algorithms/MergeSort';

function App() {

  const isSorting = useSelector((state) => state.isSorting);
  const array = useSelector((state) => state.array);
  const arrayCount = useSelector((state) => state.count);
  const colorKey = useSelector((state) => state.colorKey);
  const delay = useSelector((state) => state.delay);
  const [currArray, setCurrArray] = useState([6, 8, 9, 2, 4, 5, 0, 3, 1, 7, 10]);
  const defaultColor = ['white', 'white', 'white', 'white', 'white', 'white',
    'white', 'white', 'white', 'white', 'white'];
  // 'sort' helps to stop the execution of the sorting.
  // this can be useful when user selects a different algorithm. Stop the current algorithm. Note: the array is stopped at current state.
  const sort = useRef(false);
  const isInterrupted = useRef(false);
  const [interruption, setInterruption] = useState(false);
  const mainArray = useSelector((state) => state.mainArray);
  const swapArray = useSelector((state) => state.swapArray);
  const barSwapArray = useSelector((state) => state.barSwapArray);
  const swappArray = useSelector((state) => state.swappArray);
  const transitionValue = useRef(2);
  const [currentAlgo, setCurrentAlgo] = useState(0);

  const isPaused = useRef(false);

  const swapsNumber = useRef(0);

  const dispatch = useDispatch();

  const generateRandomElements = () => {
    // If a sorting is in progress, stop it
    sort.current = false;
    dispatch(actions.changeIsSorting(false));
    swapsNumber.current = 0;
    transitionValue.current = 0;
    dispatch(actions.changeSwapArray([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
    dispatch(actions.changeSwappArray([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
    dispatch(actions.changeBarSwapArray([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
    let count = arrayCount;
    let arr = [];

    for (let i = 0; i < count; i++) {
      arr.push(Math.floor(Math.random() * (300 - 50) + 50));
    }
    setCurrArray(arr);
    dispatch(actions.changeArr([...arr]));
    dispatch(actions.changeCount(count));
    dispatch(actions.changeColorKey([...defaultColor]));
    isPaused.current = false;

  }

  const handleGenerate = () => {
    if (sort.current === true) {
      isInterrupted.current = true;
    }
    else {
      generateRandomElements();
    }
  }

  useEffect(() => {
    generateRandomElements();
  }, [interruption])



  const handleSort = async () => {
    transitionValue.current = 0.4;
    if (currentAlgo == 0) {
      await BubbleSort(array, arrayCount, swapsNumber, colorKey, delay, defaultColor, sort, dispatch, isPaused, isInterrupted, interruption, setInterruption, swapArray, barSwapArray, mainArray);
    }

    if (currentAlgo == 1) {
      await InsertionSort(array, arrayCount, swapsNumber, colorKey, delay, defaultColor, sort, dispatch, isPaused, isInterrupted, interruption, setInterruption, swapArray, barSwapArray, mainArray);
    }

    if (currentAlgo == 2) {
      await selectionSort(array, arrayCount, swapsNumber, colorKey, delay, defaultColor, sort, dispatch, isPaused, isInterrupted, interruption, setInterruption, swapArray, barSwapArray, mainArray);
    }

    if (currentAlgo == 3) {
      await MergeSort(array, arrayCount, colorKey, delay, defaultColor, sort, dispatch, isPaused, isInterrupted, interruption, setInterruption, swapArray, swappArray, mainArray);
    }
  }

  const handlePause = () => {
    isPaused.current = true;
  }

  const handleResume = () => {
    isPaused.current = false;
  }


  // supposed to be a reset function
  const changeAlgo = () => {
    sort.current = false;
    dispatch(actions.changeIsSorting(false));
    isPaused.current = false;
    dispatch(actions.changeArr([...currArray]));
    dispatch(actions.changeCount(arrayCount));
    dispatch(actions.changeColorKey([...defaultColor]));
  }

  const handleAlgoClick = (ind) => {
    if (sort.current === true) {
      isInterrupted.current = true;
    }
    else {
      generateRandomElements();
    }
    setCurrentAlgo(ind);
  }

  const handleSpeedChange = (event) => {
    const newSpeed = parseInt(event.target.value);
    const newDelay = 1000 - newSpeed;
    dispatch(actions.changeDelay(newDelay));
  }



  return (
    <div className='app'>
      <div className='menu'>
        <div className={currentAlgo === 0 ? 'selected' : 'menuItem'} onClick={() => handleAlgoClick(0)}>Bubble Sort</div>
        <div className={currentAlgo === 1 ? 'selected' : 'menuItem'} onClick={() => handleAlgoClick(1)}>Insertion Sort</div>
        <div className={currentAlgo === 2 ? 'selected' : 'menuItem'} onClick={() => handleAlgoClick(2)}>Selection Sort</div>
        <div className={currentAlgo === 3 ? 'selected' : 'menuItem'} onClick={() => handleAlgoClick(3)}>Merge Sort</div>
      </div>
      <div className='mainComponent'>
        <div className={`visualizer ${currentAlgo === 3 ? 'merge-sort' : ''}`}>
          {array.map((value, index) => (
            <Cell key={index} index={index} swap={swapArray[index]} swapp={swappArray[index]} transitionValue={transitionValue.current} />
          ))}
        </div>


        <div className='player'>
          <button className='playerButton' style={{ backgroundColor: '#2e6b26' }} disabled={isSorting} onClick={handleSort}>Start</button>
          {currentAlgo !== 3 && (
            <>
              <button className='playerButton' style={{ backgroundColor: '#c1421be7' }} onClick={handlePause}>Pause</button>
              <button className='playerButton' style={{ backgroundColor: '#39aee9e7' }} onClick={handleResume}>Resume</button>
            </>
          )}
          <div className='speed'> speed : <input type="range" min="100" max="900" step="100" value={(1000 - delay)} onChange={handleSpeedChange} /> </div>
        </div>

        <button className='playerButton' style={{ width: 'fit-content', backgroundColor: '#335CFF' }} onClick={handleGenerate}>Random numbers</button>
        <div className='array'>
          {currArray.map((number, index) => (
            <span key={index}>
              <span className='arrElements'>{number}</span>
              {index !== currArray.length - 1 && <span>,</span>}
            </span>
          ))}
        </div>
      </div>
      {currentAlgo !== 3 && (
        <>
          <div className='bars'>
            {array.map((value, index) => (
              <Bar key={index} index={index} swap={barSwapArray[index]} swapp={swappArray[index]} transitionValue={transitionValue.current} />
            ))}
          </div>
          <div className='swapsNumber'>
            <h2>Swaps : {swapsNumber.current}</h2>
          </div>
        </>
      )}

    </div>
  );
}

export default App;