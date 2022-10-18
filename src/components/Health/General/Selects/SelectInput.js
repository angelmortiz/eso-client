import addClasses from '../../General/CSS/AddInfo.module.css';

const SelectInput = props => {
    const info = props.select;
    console.log('info: ', info);
    return <select id={info.id} name={info.name} className={addClasses['text-input']}>
        {info.options.map(({value, label}) => <option value={value}>{label}</option>)}
    </select>
};

export default SelectInput;