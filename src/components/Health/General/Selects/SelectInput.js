import healthClasses from '../../HealthContent.module.css';

const SelectInput = props => {
    const info = props.select;
    console.log('info: ', info);
    return <select id={info.id} name={info.name} className={healthClasses['text-input']}>
        {info.options.map(({value, label}) => <option value={value}>{label}</option>)}
    </select>
};

export default SelectInput;