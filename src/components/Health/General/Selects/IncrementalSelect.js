import { Fragment, useState} from "react";
import addClasses from '../../General/CSS/AddInfo.module.css';
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

    function newSelectInput(newCount) {
        return <SelectInput select={info.select} count={newCount} key={`select_${info.select.name}_${newCount}`}/>
    }

    return <Fragment>
        {/* Displays all the selects, including the selects being added through btn clicked. */}
        {selectList}
        
        {/* ADD BUTTON */}
        <button type="button" id={info.button.id} className={addClasses['add-btn']} onClick={addSelect}>
            {info.button.label}</button>
    </Fragment>
};

export default IncrementalSelect;