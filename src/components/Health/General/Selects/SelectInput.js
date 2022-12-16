import { useEffect, useState } from 'react';
import addClasses from '../../General/CSS/Form.module.css';

const SelectInput = props => {
    const [selectValue, setSelectValue] = useState("");

    const info = props.select;
    const optionValue = info.value || "value"; //handles cases where the select's value has a different name (Ex. _id).
    const optionLabel = info.label || "label"; //handles cases where the select's label has a different name (Ex. name).
    const count = props.count ? `_${props.count}` : ''; //not all SelectInput callers provide a count prop
    const selectId = `select_${info.name}${count}`; //creating an unique id and key select value

    //updates the pre-selected value when it changes on the prop from the parent
    useEffect(() => {
        setSelectValue(props.selectedValue);
    }, [props.selectedValue])

    return <div className={addClasses['select-content']}>
        <select id={selectId} key={selectId} name={info.name} className={addClasses['select-input']} value={selectValue} onChange={event => setSelectValue(event.target.value)}>
            {info.options.map((option) => {
                return <option key={`${option[optionValue]}${count}`} value={option[optionValue]}>{option[optionLabel]}</option>
            })}
        </select>
        <svg xmlns="http://www.w3.org/2000/svg" className={addClasses['select-arrow']} viewBox="0 0 512 512"><title>Chevron Down</title><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="30" d="M112 184l144 144 144-144"/></svg>
    </div>
};

export default SelectInput;