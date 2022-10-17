import { Fragment, useState } from "react";
import healthClasses from '../HealthContent.module.css';
import SelectInput from "./SelectInput";

const IncrementalSelect = props => {
    const info = props.info;
    const [selectList, setSelectList] = useState([<SelectInput select={info.select}/>]); //adds the first select
    
    
    const addSelect = event => {
        event.preventDefault();
        setSelectList(selectList.concat(<SelectInput select={info.select}/>))
    }

    return <Fragment>
        {/* Displays all the selects, including the selects being added through btn clicked. */}
        {selectList}
        
        {/* ADD BUTTON */}
        <button id={info.button.id} className={healthClasses['add-btn']} onClick={addSelect}>
            {info.button.label}</button>
    </Fragment>
};

export default IncrementalSelect;