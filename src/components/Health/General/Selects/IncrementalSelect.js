import { Fragment, useState } from "react";
import addClasses from '../../General/CSS/AddInfo.module.css';
import SelectInput from "./SelectInput";

const IncrementalSelect = props => {
    const info = props.info;
    const [counter, setCounter] = useState(1);
    const [selectList, setSelectList] = useState([<SelectInput select={info.select} counter={counter} key={`item_${counter}`}/>]); //adds the first select
    
    const addSelect = event => {
        event.preventDefault();
        setCounter(counter => counter + 1);
        setSelectList(selectList.concat(<SelectInput select={info.select} counter={counter} key={`item_${counter}`}/>));
    }

    return <Fragment>
        {/* Displays all the selects, including the selects being added through btn clicked. */}
        {selectList}
        
        {/* ADD BUTTON */}
        <button id={info.button.id} className={addClasses['add-btn']} onClick={addSelect}>
            {info.button.label}</button>
    </Fragment>
};

export default IncrementalSelect;