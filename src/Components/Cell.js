import { useSelector } from 'react-redux';
import './Cell.css'
import { useEffect, useState } from 'react';

const Cell = ({ index, swap, swapp, transitionValue }) => {
    const array = useSelector((state) => state.array);
    const colorKey = useSelector((state) => state.colorKey);
    const swapArray = useSelector((state) => state.swapArray);


    const cellStyle = {
        backgroundColor: colorKey[index],
        transition: `transform ${transitionValue}s ease-in-out`,
        transform: `translate(${swap}px, ${swapp}px)`,
    };


    return (
        <div className="cell" style={cellStyle} >
            {array[index]}
        </div>
    )
}

export default Cell;