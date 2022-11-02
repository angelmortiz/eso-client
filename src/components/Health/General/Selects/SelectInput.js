import { useEffect, useState } from 'react';
import addClasses from '../../General/CSS/AddInfo.module.css';

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

    return <select id={selectId} key={selectId} name={info.name} className={addClasses['text-input']} value={selectValue} onChange={event => setSelectValue(event.target.value)}>
        {info.options.map((option) => {
            return <option key={`${option[optionValue]}${count}`} value={option[optionValue]}>{option[optionLabel]}</option>
        })}
    </select>
};

export default SelectInput;