import { configureStore, createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        array: [6, 8, 9, 2, 4, 5, 0, 3, 1, 7, 10],
        mainArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        steps: [],
        colorKey: ['white', 'white', 'white', 'white', 'white', 'white',
            'white', 'white', 'white', 'white', 'white'],
        colors: [],
        isSorting: false,
        currentStop: [],
        count: 11,
        delay: 300,
        algorithm: '',
        isSwapping: false,
        swapArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        barSwapArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        swappArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        keyArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    reducers: {
        changeArr(state, action) {
            state.array = action.payload;
        },
        changeSteps(state, action) {
            state.steps = action.payload;
        },
        changeDelay(state, action) {
            state.delay = action.payload;
        },
        changeCount(state, action) {
            state.count = action.payload;
        },
        changeCurrentStep(state, action) {
            state.currentStep = action.payload;
        },
        changeColorKey(state, action) {
            state.colorKey = action.payload;
        },
        changeIsSorting(state, action) {
            state.isSorting = action.payload;
        },
        changeIsSwapping(state, action) {
            state.isSwapping = action.payload;
        },
        changeSwapArray(state, action) {
            state.swapArray = action.payload;
        },
        changeBarSwapArray(state, action) {
            state.barSwapArray = action.payload;
        },
        changeSwappArray(state, action) {
            state.swappArray = action.payload;
        },
        changeMainArray(state, action) {
            state.mainArray = action.payload;
        },
        changeKeyArray(state, action) {
            state.keyArray = action.payload;
        }
    }
})

export const actions = counterSlice.actions;

export const store = configureStore({
    reducer: counterSlice.reducer
})

