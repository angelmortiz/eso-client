import addClasses from '../../General/CSS/AddInfo.module.css';

const SelectInput = props => {
    const info = props.select;
    const count = props.count ? `_${props.count}` : ''; //not all SelectInput callers provide a count prop
    const value = info.value || "value"; //handles cases where select's value and label have different names
    const label = info.label || "label";
    const selectId = `select_${info.name}${count}`;

    return <select id={selectId} key={selectId} name={info.name} className={addClasses['text-input']}>
        {info.options.map((option) => {
            return <option key={`${option[value]}${count}`} value={option[value]}>{option[label]}</option>
        })}
    </select>
};

export default SelectInput;