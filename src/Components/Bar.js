import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Bar = ({ index, swap, swapp, transitionValue }) => {
    const array = useSelector((state) => state.array);
    const colorKey = useSelector((state) => state.colorKey);
    const barSwapArray = useSelector((state) => state.barSwapArray);

    const height = array[index] / 6;
    // The bars appear inverted so, adjust the initial vertical position to 
    // straighten i.e. height is measured from the bottom.
    const initialVertical = 60 - height;


    const barStyle = {
        height: `${height}px`,
        width: '6px',
        margin: '2px',
        backgroundColor: colorKey[index],
        transition: `transform ${transitionValue}s ease-in-out`,
        transform: `translate(${swap}px, ${initialVertical}px)`,
    };


    return (
        <div className="bar" style={barStyle} >
        </div>
    )
}

export default Bar;