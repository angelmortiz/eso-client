import { Fragment, useEffect, useState} from "react";
import addClasses from '../General/CSS/Form.module.css';
import SelectInput from "./SelectInput";

const IncrementalSelect = props => {
    const info = props.info;
    const [count, setCount] = useState(1);
    const [selectList, setSelectList] = useState([newSelectInput(count)]);

    const addSelect = event => {
        event.preventDefault();
        //increases the count and adds a new dropdown to the DOM
        setCount(previousCount => {
            const newCount = previousCount + 1;
            setSelectList(s => s.concat(newSelectInput(newCount)));
            return newCount;
        });
    }

    function newSelectInput(newCount, value = undefined) {
        return <SelectInput select={info.select} count={newCount} key={`select_${info.select.name}_${newCount}`} selectedValue={value}/>;
    }

    //This hook is used to add selects automatically on the update page.
    useEffect(() => {
        const selectedValues = props.selectedValues;
        //skips if no selectedValues has been passed from the parent
        if (!selectedValues || selectedValues.length ===0) { return; }

        const selectedInputs = [];
        let newCount = 0;
        //creates an array with the pre-selected elements from db (used for updates)
        selectedValues.forEach((value, index) => {
            newCount = index + 1;
            selectedInputs.push(<SelectInput select={info.select} count={newCount} key={`select_${info.select.name}_${newCount}`} selectedValue={value}/>);
        });

        setSelectList(selectedInputs);
        setCount(newCount);

    }, [props.selectedValues, info]);

    return <Fragment>
        {/* Displays all the selects, including the selects being added through btn clicked. */}
        {selectList}
        
        {/* ADD BUTTON */}
        <button type="button" id={info.button.id} className={addClasses['add-btn']} onClick={addSelect}>
            {info.button.label}</button>
    </Fragment>
};

export default IncrementalSelect;