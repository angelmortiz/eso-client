import { Fragment, useEffect, useState } from "react";
import addClasses from '../../General/CSS/AddInfo.module.css';
import SelectInput from "./SelectInput";

const IncrementalSelect = props => {
    const info = props.info;
    const [counter, setCounter] = useState(1);
    // const [selectList, setSelectList] = useState([<SelectInput select={info.select} counter={counter} key={`select_${counter}`}/>]); //adds the first select
    const [selectList, setSelectList] = useState([]); //adds the first select
    
    useEffect(() => {
        console.log("useEffect counter: ", counter);
        console.log("info.select.name: ", info.select.name);
        setSelectList( s => s.concat(<SelectInput select={info.select} counter={counter} key={`select_${info.select.name}_${counter}`}/>));
    }, [info, counter]);
    
    const addSelect = event => {
        event.preventDefault();
        setCounter(counter => counter + 1);
        console.log("addSelect counter: ", counter);
        // console.log("counter: ", counter);
        //setSelectList(selectList.concat(<SelectInput select={info.select} counter={counter} key={`select_${counter}`}/>))
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