import { useState } from "react";
import addClasses from '../General/CSS/Form.module.css';

const IncrementalInput = props => {
    const info = props.input;
    const [count, setCount] = useState(1);
    const [inputList, setInputList] = useState([newInputElement(count)]);
    
    const addInput = event => {
        event.preventDefault();
        setCount( prevCount => {
            const newCount = prevCount + 1;
            setInputList(s => s.concat(newInputElement(newCount)));
            return newCount;
        });
    }

    function newInputElement(newCount) {
        return <input type="text" name={info.input.name} id={`${info.input.id}_${newCount}`}
        key={`input_${info.input.name}_${newCount}`} placeholder={info.input.placeholder} 
        className={addClasses['select-input']}/>
    };

    return <>
        {/* Displays all the inputs, including the inputs being added through btn clicked. */}
        {inputList}
        
        {/* ADD BUTTON */}
        <button type="button" id={info.button.id} className={addClasses['add-btn']} onClick={addInput}>
            {info.button.label}</button>
    </>
};

export default IncrementalInput;