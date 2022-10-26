import addClasses from '../../General/CSS/AddInfo.module.css';

const SelectInput = props => {
    const info = props.select;
    const valueName = info.valueName || "value";
    const labelName = info.labelName || "label";

    console.log("valueName: ", valueName);
    console.log("labelName: ", labelName);
    console.log("value: ", info.value);
    console.log("label: ", info.label);
    const count = props.count ? `_${props.count}` : '';    
    return <select key={`select_${info.name}${count}`} name={info.name} className={addClasses['text-input']}>
        {info.options.map(({value, label}) => {
            return <option key={`${value}${count}`} value={value}>{label}</option>
        })}
    </select>
};

export default SelectInput;