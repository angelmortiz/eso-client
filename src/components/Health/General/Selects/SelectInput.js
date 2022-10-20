import addClasses from '../../General/CSS/AddInfo.module.css';

const SelectInput = props => {
    const info = props.select;
    const count = props.count ? `_${props.count}` : '';
    
    return <select key={`${info.id}${count}`} id={`${info.id}${count}`}
                name={info.name} className={addClasses['text-input']}>
        {info.options.map(({value, label}) => {
            return <option key={value} value={value}>{label}</option>
        })}
    </select>
};

export default SelectInput;