import { Fragment, useState, useEffect } from "react";
import addClasses from '../../General/CSS/AddInfo.module.css';
import SelectInput from "./SelectInput";

const IncrementalSelect = props => {
    const info = props.info;
    const [count, setCount] = useState(1);
    const [selectList, setSelectList] = useState([]);

    useEffect(() => {
        console.log("useEffect count: ", count);
        setSelectList(s => s.concat(<SelectInput select={info.select} count={count} key={`select_${info.select.name}_${count}`}/>));
    }, [info.select, count]);
    
    const addSelect = event => {
        event.preventDefault();
        setCount(count + 1);
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