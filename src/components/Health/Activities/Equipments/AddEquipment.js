import IncrementalSelect from '../../General/Selects/IncrementalSelect';
import addClasses from '../../General/CSS/AddInfo.module.css';
import { fetchAllExerciseNames } from '../../../../util/apis/exercises/exercisesApis';
import { postEquipment } from '../../../../util/apis/equipments/equipmentsApis';
import { useEffect, useState} from 'react';

const AddEquipment = props => {
    /** Fields Data */
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        fetchAllExerciseNames().then(data => { 
            console.log("Exercises data: ", data);
            setExercises(data);
        });
    }, []);

    // const exercises = [
    //     // TODO: Pull values from backend
    //     {value: "", label:"-- Choose an exercise --"},
    //     {value: "Squats", label:"Squats"},
    //     {value: "Deadlifts", label:"Deadlifts"},
    // ];

    const exercisesInfo = {
        select: {
            id: "equipment-exercises",
            name: "exercises",
            valueName: "_id",
            labelName: "name",
            options: exercises
        },
        button: {
            id: "add-exercise-btn",
            label: "Add exercise"
        }
    };

    /** Functions */
    const addEquipment = (event) => {
        event.preventDefault();
        const formVals = getValuesFromForm(event.target.elements);
        console.log("value: ", formVals);
        // postEquipment(formVals).then(data => { 
        //     console.log("Response data: ", data);
        // });
    };

    const getValuesFromForm = (elements) => {
        const values = {};
        values.name = elements.name.value;
        values.alternativeName = elements.alternativeName.value;
        values.description = elements.description.value;
        values.linkToImage = elements.linkToImage.value;

        //multi-select options
        values.exercises = extractMultiOptionValues(elements.exercises);
        return values;
    };

    const extractMultiOptionValues = (elements) => {
        //if there is only one select dropdown, it adds the HTMLSelectElement to an array before extracting the value.
        //if there are multiple select dropdowns, converts the RadioNodeList into an array (to later use .map()).
        elements = Object.prototype.toString.call(elements).includes('HTMLSelectElement') ?
            [elements] : [...elements];
        
        let values = elements.map(element => { return element.value; });
        values = values.filter(v => v); //removes empty selections
        values = [...new Set(values)]; //removes duplicate values
        return values;
    };

    /** Render */
    return <section className={addClasses['main-section']}>
        <form id="add-equipment-form"  onSubmit={addEquipment} className={addClasses['main-form']}>
            <h1 className={addClasses['form-title']}>Add Equipment</h1>
            
            {/* NAME */}
            <label htmlFor="equipment-name" className={addClasses['text-label']}>Name:</label>
            <input type="text" id="equipment-name" name="name"
                placeholder='Enter the equipment name...' className={addClasses['text-input']}/>
            
            {/* ALTERNATIVE NAME */}
            <label htmlFor="equipment-alternativeName" className={addClasses['text-label']}>Alternative name:</label>
            <input type="text" id="equipment-alternativeName" name="alternativeName"
                placeholder='Enter an alternative name...'className={addClasses['text-input']} />
            
            {/* DESCRIPTION */}
            <label htmlFor="equipment-description" className={addClasses['text-label']}>Description:</label>
            <input type="text" id="equipment-description" name="description"
                placeholder='Enter the equipment description...'className={addClasses['text-input']} />

            {/* EXERCISES */}
            <label htmlFor="equipment-exercises" className={addClasses['text-label']}>Exercises:</label>
            <IncrementalSelect info={exercisesInfo}/>
        
            {/* IMAGE */}
            <label htmlFor="equipment-image" className={addClasses['text-label']}>Image:</label>
            <input type="text" id="equipment-image" name="linkToImage"
                placeholder='Enter the link for the image...' className={addClasses['text-input']}/>

            {/* SUBMIT BUTTON */}
            <button type="submit" id="add-exercse-btn" className={addClasses['submit-btn']}>Add equipment</button>
        </form>
    </section>
};

export default AddEquipment;