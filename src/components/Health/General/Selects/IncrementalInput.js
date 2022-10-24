import { Fragment, useState, useEffect } from "react";
import addClasses from '../../General/CSS/AddInfo.module.css';

const IncrementalInput = props => {
    const info = props.input;
    const [count, setCount] = useState(1);
    const [inputList, setInputList] = useState([]);
    
    useEffect(() => {
        setInputList(s => s.concat(
            <input type="text" name={info.input.name} id={`${info.input.id}_${count}`}
             key={`input_${info.input.name}_${count}`} placeholder={info.input.placeholder} 
             className={addClasses['text-input']}/>
        ));
    }, [info, count]);
    
    const addInput = event => {
        event.preventDefault();
        setCount(count + 1);
    }

    return <Fragment>
        {/* Displays all the inputs, including the inputs being added through btn clicked. */}
        {inputList}
        
        {/* ADD BUTTON */}
        <button type="button" id={info.button.id} className={addClasses['add-btn']} onClick={addInput}>
            {info.button.label}</button>
    </Fragment>
};

export default IncrementalInput;